export const generateWhatsAppMessage = (
  budget: {
    client: string;
    salesperson: string;
    amount: number;
    time: string;
    description: string;
  },
  formattedDate: string
): string => {
  return encodeURIComponent(
    `Olá, ${budget.client}! Seguem os detalhes do seu orçamento:\n\n` +
      `💰 *Valor*: R$ ${budget.amount}\n` +
      `📅 *Data*: ${formattedDate}\n` +
      `🕒 *Hora*: ${budget.time}\n` +
      `👨‍💼 *Vendedor*: ${budget.salesperson}\n\n` +
      `📌 *Descrição*: ${budget.description}\n\n` +
      'Caso tenha dúvidas, estou à disposição!'
  );
};
