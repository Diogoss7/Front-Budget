<template>
  <q-dialog class="modal-card" v-model="show">
    <q-card>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Detalhes do Orçamento</div>
        <q-btn flat icon="close" color="negative" v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="text-h6 text-primary">{{ budget.client }}</div>
        <p class="text-body1 text-grey-8">Vendedor: {{ budget.salesperson }}</p>
        <p class="text-body1 text-grey-8">Telefone: {{ budget.phone }}</p>
        <p class="text-body1 text-grey-8">Valor: <strong>R$ {{ budget.amount }}</strong></p>
        <p class="text-body1 text-grey-8">Data: {{ new Date(props.budget.date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }) }}</p>
        <p class="text-body1 text-grey-8">Hora: {{ budget.time }}</p>
        <q-separator class="q-my-md" />
        <strong>Descrição:</strong>
        <div class="content-description">
          <p class="text-body2 text-grey-7">{{ budget.description }}</p>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="edit-btn" label="Editar" color="primary" :to="`/edit/${budget.id}`" flat />
        <q-btn class="whatsapp-btn" label="Enviar WhatsApp" icon="send" color="green" @click="sendWhatsApp" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, computed } from 'vue';
import { generateWhatsAppMessage } from '../utils/whatsappMessage';

const props = defineProps<{
  budget: {
    client: string;
    salesperson: string;
    phone: string;
    amount: number;
    date: string;
    time: string;
    description: string;
    id: number;
  };
  modelValue: boolean;
}>();

const show = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);

watch(() => props.modelValue, (newVal) => {
  show.value = newVal;
});

watch(show, (newVal) => {
  if (!newVal) {
    emit('update:modelValue', false);
  }
});

const formattedDate = computed(() => {
  const date = new Date(props.budget.date);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
});

const sendWhatsApp = () => {
  const phone = props.budget.phone.replace(/\D/g, '');
  const message = generateWhatsAppMessage(props.budget, formattedDate.value);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=55${phone}&text=${message}`;
  window.open(whatsappUrl, '_blank');
};
</script>

<style scoped>
.modal-card {
  width: 100%;
  max-width: 90%;
  max-height: 80%;
}

.content-description {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
  overflow-y: auto;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}
</style>
