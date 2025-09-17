export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
  notes?: string;
};

export type TimeRange = 'day' | 'week' | 'month';
