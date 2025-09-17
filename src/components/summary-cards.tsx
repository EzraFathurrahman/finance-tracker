'use client';

import { CircleDollarSign, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Expense, TimeRange } from '@/types';
import { useLanguage } from '@/contexts/language-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';

interface SummaryCardsProps {
  expenses: Expense[];
  timeRange: TimeRange;
  setTimeRange: (timeRange: TimeRange) => void;
}

export function SummaryCards({ expenses, timeRange, setTimeRange }: SummaryCardsProps) {
  const { t, language } = useLanguage();

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  const timeRangeTranslations: Record<TimeRange, string> = {
    day: t('thisDay'),
    week: t('thisWeek'),
    month: t('thisMonth'),
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{t('totalExpenses')}</CardTitle>
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 -mr-2 text-sm text-foreground">
              {timeRangeTranslations[timeRange]}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTimeRange('day')}>{t('thisDay')}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange('week')}>{t('thisWeek')}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange('month')}>{t('thisMonth')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{formatCurrency(totalExpenses)}</div>
        <p className="text-xs text-muted-foreground">{t('expenseCount', expenses.length)}</p>
      </CardContent>
    </Card>
  );
}
