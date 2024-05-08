export interface EfExpense {
    efExpenseId: number;
    modelId: number;
    jobId: number;
    date: Date;
    text?: string;
    amount: number;
  }