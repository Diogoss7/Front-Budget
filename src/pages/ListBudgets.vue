<template>
  <q-page class="container">
    <q-toolbar class="q-mb-md toolbar">
      <div class="toolbar-title">
        <h2 class="text-h5 text-primary">Lista de Orçamentos</h2>
        <p class="text-subtitle2 text-grey-6">Visualize e gerencie todos os seus orçamentos</p>
      </div>
    </q-toolbar>

    <q-input outlined v-model="searchTerm" placeholder="Buscar orçamentos..." class="q-mb-md" dense clearable>
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <div v-if="isLoading" class="q-gutter-md row items-start">
      <q-skeleton v-for="i in 6" :key="i" type="rect" class="col-12 col-md-6 col-lg-4" />
    </div>

    <div v-else-if="filteredBudgets.length > 0" class="q-gutter-md row items-start justify-center">
      <q-card v-for="budget in filteredBudgets" :key="budget.id" class="col-12 col-md-4 col-lg-3 budget-card"
        @click="openBudgetModal(budget)">
        <q-card-section>
          <div class="card">
            <div class="card-header">
              <div class="text-h6 text-bold text-primary">{{ budget.client }}</div>
              <div class="text-body2 text-dark">R$ {{ budget.amount }}</div>
            </div>
            <div class="card-content">
              <q-item dense>
                <q-item-section avatar class="small-icon">
                  <q-icon name="person" color="primary" size="1rem" />
                </q-item-section>
                <q-item-section class="text-content no-padding">
                  {{ budget.salesperson }}
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar class="small-icon">
                  <q-icon name="event" color="primary" size="1rem" />
                </q-item-section>
                <q-item-section class="text-content">{{ budget.date }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar class="small-icon">
                  <q-icon name="schedule" color="primary" size="1rem" />
                </q-item-section>
                <q-item-section class="text-content">{{ budget.time }}</q-item-section>
              </q-item>
            </div>
            <q-separator class="q-my-md" />
            <div class="card-footer">
              <div class="description-box">
                {{ budget.description }}
              </div>
              <div class="button-group">
                <q-btn class="delete-btn" label="Deletar" color="negative" flat
                  @click.stop="confirmDelete(budget.id)" />
                <q-btn class="edit-btn" label="Editar" color="primary" :to="`/edit/${budget.id}`" flat />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div v-else class="text-center q-pa-md">
      <div v-if="searchTerm">
        <p class="text-grey-7 q-mb-md">Nenhum orçamento encontrado para "{{ searchTerm }}"</p>
        <q-btn outline label="Limpar busca" @click="searchTerm = ''" />
      </div>
      <div v-else>
        <p class="text-grey-7 q-mb-md">Não há orçamentos cadastrados</p>
        <q-btn color="primary" icon="add_circle" label="Cadastrar Orçamento" @click="goToNewBudget"
          class="hover-scale" />
      </div>
    </div>

    <q-dialog v-model="isDeleteModalOpen">
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" color="negative" size="2rem" class="q-mr-sm" />
          <span class="text-h6">Confirmar exclusão</span>
        </q-card-section>
        <q-card-section>
          Tem certeza que deseja excluir este orçamento? Essa ação não pode ser desfeita.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" v-close-popup />
          <q-btn flat label="Deletar" outline color="negative" @click="handleDeleteBudget" class="button-delete" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <BudgetModal v-if="selectedBudget" :budget="selectedBudget" v-model="isBudgetModalOpen" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import api from 'src/services/api';
import BudgetModal from 'src/components/BudgetModal.vue';

interface Budget {
  id: number;
  client: string;
  date: string;
  salesperson: string;
  phone: string;
  amount: number;
  time: string;
  description: string;
}

const budgets = ref<Budget[]>([]);
const filteredBudgets = ref<Budget[]>([]);
const isLoading = ref(true);
const searchTerm = ref('');
const router = useRouter();

const isDeleteModalOpen = ref(false);
const selectedBudgetId = ref<number | null>(null);

const isBudgetModalOpen = ref(false);
const selectedBudget = ref<Budget | null>(null);


const fetchBudgets = async () => {
  try {
    const response = await api.get('/users');
    budgets.value = Array.isArray(response.data.users) ? response.data.users : [];
    filteredBudgets.value = budgets.value;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  } finally {
    isLoading.value = false;
  }
};

const confirmDelete = (id: number) => {
  selectedBudgetId.value = id;
  isDeleteModalOpen.value = true;
};

const handleDeleteBudget = async () => {
  if (selectedBudgetId.value !== null) {
    try {
      await api.put(`/user/${selectedBudgetId.value}`);
      budgets.value = budgets.value.filter((budget) => budget.id !== selectedBudgetId.value);
      filteredBudgets.value = filteredBudgets.value.filter((budget) => budget.id !== selectedBudgetId.value);
      console.log('Orçamento deletado com sucesso');
    } catch (error) {
      console.error('Erro ao deletar orçamento:', error);
    } finally {
      isDeleteModalOpen.value = false;
      selectedBudgetId.value = null;
    }
  }
};



const goToNewBudget = () => {
  router.push('/budgets/new');
};

const openBudgetModal = (budget: Budget) => {
  selectedBudget.value = budget;
  isBudgetModalOpen.value = true;
};

watch(searchTerm, (term) => {
  if (term.trim() === '') {
    filteredBudgets.value = budgets.value;
    return;
  }

  const lowerTerm = term.toLowerCase().trim();
  filteredBudgets.value = budgets.value.filter(
    (budget) =>
      budget.client.toLowerCase().includes(lowerTerm) ||
      budget.salesperson.toLowerCase().includes(lowerTerm) ||
      budget.amount.toString().includes(lowerTerm)
  );
});

onMounted(() => {
  fetchBudgets();
});
</script>

<style scoped>
.container {
  padding: 5%;
}

.toolbar {
  justify-content: center;
  background-color: var(--q-color-primary);
  color: white;
  padding: 16px;
  border-radius: 8px;
}

.toolbar-title {
  text-align: center;
}

.budget-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 8px;
  margin: 2%;
}

.budget-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
}

.card {
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.card-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.button-group {
  display: flex;
  gap: 8px;
}

.delete-btn:hover {
  transform: scale(1.1);
}

.description-box {
  background-color: var(--q-color-grey-2);
  border: 1px solid var(--q-color-grey-3);
  padding: 10px;
  border-radius: 8px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.small-icon {
  min-width: 24px !important;
}

.no-padding {
  padding-left: 0 !important;
}

.button-delete {
  font-size: 5px;
  padding: 12px 24px;
  border-radius: 8px;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}
</style>
