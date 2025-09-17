'use client';
import { TrendingUp } from 'lucide-react';
import { Pie, PieChart, Cell } from 'recharts';
import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { useLanguage } from '@/contexts/language-provider';
import type { Expense } from '@/types';

interface ExpensePieChartProps {
  expenses: Expense[];
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function ExpensePieChart({ expenses }: ExpensePieChartProps) {
  const { t, language } = useLanguage();

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const chartData = React.useMemo(() => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.description] = (acc[expense.description] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({
        name,
        value,
        percentage: totalExpenses > 0 ? (value / totalExpenses) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);
  }, [expenses, totalExpenses]);

  const chartConfig = React.useMemo(() => {
    return chartData.reduce((acc, data, index) => {
      acc[data.name] = {
        label: `${data.name}`,
        color: COLORS[index % COLORS.length],
      };
      return acc;
    }, {} as any);
  }, [chartData]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{t('expenseByCategory')} 📊</CardTitle>
        <CardDescription>{t('topCategoriesSubtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="name"
                  formatter={(value, name, props) => `${formatCurrency(value as number)} (${(props.payload.percentage as number).toFixed(1)}%)`}
                />
              }
            />
             <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent formatter={(value, entry) => `${value} (${entry.payload?.percentage.toFixed(1)}%)`} nameKey="name" />}
              className="[&_.recharts-legend-item]:w-1/2 [&_.recharts-legend-item]:justify-start"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pt-4">
        <div className="leading-none text-muted-foreground">{t('topCategoriesSubtitle')}</div>
      </CardFooter>
    </Card>
  );
}
