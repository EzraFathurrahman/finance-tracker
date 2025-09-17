'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-provider';
import type { Expense } from '@/types';
import { SummaryCards } from './summary-cards';
import { ExpenseList } from './expense-list';
import { ExpenseForm } from './expense-form';
import { ExpensePieChart } from './expense-pie-chart';

const initialExpenses: Expense[] = [
  { id: '1', description: 'Groceries', amount: 75000 },
  { id: '2', description: 'Lunch with colleagues', amount: 125000 },
  { id: '3', description: 'Internet Bill', amount: 300000 },
  { id: '4', description: 'Groceries', amount: 150000 },
  { id: '5', description: 'Transport', amount: 50000 },
  { id: '6', description: 'Entertainment', amount: 200000 },
];

export function DashboardClient() {
  const { t } = useLanguage();
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [{ ...newExpense, id: crypto.randomUUID() }, ...prev]);
  };

  const handleUpload = (uploadedExpenses: Omit<Expense, 'id'>[]) => {
    const newExpenses = uploadedExpenses.map(e => ({ ...e, id: crypto.randomUUID() }));
    setExpenses(prev => [...newExpenses, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline">{t('welcome')}</h2>
        <p className="text-muted-foreground">{t('welcomeSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SummaryCards expenses={expenses} />
        </div>
        <div className="lg:col-span-3">
          <ExpensePieChart expenses={expenses} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <ExpenseForm onAddExpense={handleAddExpense} expenses={expenses} onUpload={handleUpload} />
        </div>
        <div className="space-y-6">
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
