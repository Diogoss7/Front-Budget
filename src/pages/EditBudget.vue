<template>
  <q-page class="q-pa-md flex flex-center">
    <div class="container">
      <h2 class="form-title">Cadastro de Orçamento</h2>
      <q-form @submit.prevent="handleSubmit" @keydown.enter.prevent class="google-style-form">
        <div class="form-columns">
          <q-input class="google-input" filled v-model="formData.client" label="Cliente" required />
          <q-input class="google-input" filled v-model="formData.salesperson" label="Vendedor" required />
          <q-input class="google-input" filled v-model="formData.phone" label="Telefone" type="tel" required />
        </div>
        <div class="form-columns">
          <q-input class="google-input" filled v-model="formData.date" label="Data" type="date" required />
          <q-input class="google-input" filled v-model="formData.time" label="Horário" type="time" required />
        </div>
        <q-input class="google-input" filled v-model="formData.description" label="Descrição" type="textarea" autogrow
          required />
        <q-input class="google-input" filled v-model="formData.amount" label="Valor" type="number" step="0.01"
          required />
        <div class="button-group">
          <q-btn class="google-submit-btn" type="submit" @keydown.enter.prevent label="Salvar" />
          <q-btn class="google-cancel-btn" label="Cancelar" to="/" flat />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from 'src/services/api';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const route = useRoute();
const router = useRouter();

const formData = ref({
  client: '',
  date: '',
  time: '',
  salesperson: '',
  phone: '',
  description: '',
  amount: 0,
});

const fetchBudget = async () => {
  try {
    const { id } = route.params;
    if (!id) return;

    console.log('Fetching budget with ID:', id);

    const response = await api.get(`/client/${id}`);
    console.log('API Response:', response.data);

    if (response.data && response.data.user) {
      const { client, date, time, salesperson, phone, description, amount } = response.data.user;
      formData.value = {
        client: client || '',
        date: date || '',
        time: time || '',
        salesperson: salesperson || '',
        phone: phone || '',
        description: description || '',
        amount: amount || 0,
      };
    } else {
      throw new Error('Erro ao carregar os dados do orçamento');
    }
  } catch (error) {
    console.error('Erro ao buscar orçamento:', error);
    toast.error('Erro ao carregar os dados do orçamento.', {
      autoClose: 3000,
      position: 'top-right',
      icon: '❌',
    });
  }
};

const handleSubmit = async () => {
  try {
    const { id } = route.params;
    if (!id) return;

    // Formatar o campo time para H:I
    const [hours, minutes] = formData.value.time.split(':');
    formData.value.time = `${hours}:${minutes}`;

    const payload = { ...formData.value, amount: parseFloat(String(formData.value.amount)) || 0 };

    const response = await api.put(`/update/${id}`, payload);

    if (response.data) {
      toast.success('Orçamento atualizado com sucesso!', {
        autoClose: 2000,
        position: 'top-right',
        icon: '✔️',
      });
      setTimeout(() => {
        router.push('/budgets');
      }, 1500);
    } else {
      throw new Error('Erro ao atualizar o orçamento');
    }
  } catch (error) {
    toast.error('Erro ao atualizar o orçamento. Por favor, revise os dados!', {
      autoClose: 3000,
      position: 'top-right',
      icon: '❌',
    });
  }
};

onMounted(() => {
  fetchBudget();
});
</script>

<style scoped>
.container {
  background: linear-gradient(135deg, #f9f9f9, #ffffff);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 48px;
  max-width: 800px;
  width: 100%;
}

.form-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
  color: #333;
}

.google-style-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-columns {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.google-input {
  flex: 1;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.google-submit-btn {
  background-color: #34a853;
  color: white;
  font-size: 1rem;
  border-radius: 8px;
  padding: 12px 24px;
  transition: background 0.3s ease;
}

.google-submit-btn:hover {
  background-color: #2c8c47;
}

.google-cancel-btn {
  background-color: white;
  transition: background 0.3s ease;
}

.google-cancel-btn:hover {
  background-color: #fce8e6;
}

@media (max-width: 768px) {
  .form-columns {
    flex-direction: column;
    gap: 16px;
  }

  .container {
    padding: 24px;
  }
}
</style>
