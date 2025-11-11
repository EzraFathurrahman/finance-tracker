'use client';

import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/language-provider';
import type { Expense, TimeRange } from '@/types';
import { SummaryCards } from './summary-cards';
import { ExpenseList } from './expense-list';
import { ExpenseForm } from './expense-form';
import { ExpensePieChart } from './expense-pie-chart';
import { PromotionHunterSection } from './promotion-hunter-section';
import { isWithinInterval, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

const initialExpenses: Expense[] = [
  { id: '1', description: 'Makan Siang', amount: 50000, date: new Date() },
  { id: '2', description: 'Transportasi', amount: 25000, date: new Date() },
  { id: '3', description: 'Belanja Bulanan', amount: 750000, date: new Date(new Date().setDate(new Date().getDate() - 8)) },
  { id: '4', description: 'Kopi', amount: 22000, date: new Date() },
  { id: '5', description: 'Transportasi', amount: 30000, date: new Date(new Date().setDate(new Date().getDate() - 1)) },
  { id: '6', description: 'Nonton Bioskop', amount: 100000, date: new Date(new Date().setDate(new Date().getDate() - 15)) },
];

export function DashboardClient() {
  const { t } = useLanguage();
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [timeRange, setTimeRange] = useState<TimeRange>('month');

  const handleAddExpense = (newExpense: Omit<Expense, 'id' | 'date'>) => {
    setExpenses(prev => [{ ...newExpense, id: crypto.randomUUID(), date: new Date() }, ...prev]);
  };

  const handleUpload = (uploadedExpenses: Omit<Expense, 'id' | 'date'>[]) => {
    const newExpenses = uploadedExpenses.map(e => ({ ...e, id: crypto.randomUUID(), date: new Date() }));
    setExpenses(prev => [...newExpenses, ...prev]);
  };

  const filteredExpenses = useMemo(() => {
    const now = new Date();
    let interval;

    if (timeRange === 'day') {
      interval = { start: startOfDay(now), end: endOfDay(now) };
    } else if (timeRange === 'week') {
      interval = { start: startOfWeek(now), end: endOfWeek(now) };
    } else { // month
      interval = { start: startOfMonth(now), end: endOfMonth(now) };
    }

    return expenses.filter(expense => isWithinInterval(expense.date, interval));
  }, [expenses, timeRange]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline">{t('welcome')} 👋</h2>
        <p className="text-muted-foreground">{t('welcomeSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SummaryCards expenses={filteredExpenses} timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>
        <div className="lg:col-span-3">
          <ExpensePieChart expenses={filteredExpenses} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <ExpenseForm onAddExpense={handleAddExpense} expenses={expenses} onUpload={handleUpload} />
        </div>
        <div className="space-y-6">
          <ExpenseList expenses={filteredExpenses} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <PromotionHunterSection expenses={filteredExpenses} />
      </div>
    </div>
  );
}
