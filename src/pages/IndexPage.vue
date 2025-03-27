<template>
  <q-page class="q-pa-md custom-page">
    <div class="container-register">
      <div class="icon-container">
        <q-icon name="book" size="40px" class="icon-calculator" />
      </div>
      <div class="title">
        <p class="title-one">Sistema de Cadastro</p>
        <p class="title-two">de Orçamentos</p>
      </div>
      <div class="text">
        <p>Gerencie seus orçamentos de forma simples e eficiente.</p>
        <p>Cadastre novos orçamentos e visualise todos os registros em um só lugar</p>
      </div>
      <div class="buttons-links">
        <q-btn label="Cadastrar Orçamento" color="primary" to="/register" class="botao-cadastro"
          icon-right="arrow_forward" />
        <q-btn label="Ver Todos os Orçamentos" outline color="primary" to="/budgets" class="botao-listagem" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">

</script>

<style scoped>
.q-page.custom-page {
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  padding: 40px;
}

.container-register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  text-align: center;
  padding: 20px;
  width: fit-content;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: var(--q-primary);
  border-radius: 50%;
  margin-bottom: 20px;
}

.icon-calculator {
  color: white;
}

.title {
  margin-bottom: 20px;
}

.title-one {
  color: #333;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}

.title-two {
  color: var(--q-primary);
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}

.text {
  margin-bottom: 30px;
  font-size: 1.1rem;
  color: #555;
}

.buttons-links {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.botao-cadastro,
.botao-listagem {
  font-size: 5px;
  padding: 12px 24px;
  border-radius: 8px;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.botao-cadastro .q-icon {
  margin-left: 8px;
}

@media (max-width: 768px) {
  .titulo-principal {
    font-size: 2rem;
  }

  .text {
    font-size: 1rem;
  }

  .botao-cadastro,
  .botao-listagem {
    font-size: 1rem;
    padding: 10px 20px;
  }

  .buttons-links {
    gap: 10px;
  }

  .buttons-links {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .titulo-principal {
    font-size: 1.8rem;
  }

  .text {
    font-size: 0.9rem;
  }

  .botao-cadastro,
  .botao-listagem {
    font-size: 0.9rem;
    padding: 8px 16px;
  }

  .buttons-links {
    gap: 8px;
  }
}
</style>
