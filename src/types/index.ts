export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
  notes?: string;
  isPromotion?: boolean;
  originalPrice?: number;
  discountPercentage?: number;
};

export type TimeRange = 'day' | 'week' | 'month';
