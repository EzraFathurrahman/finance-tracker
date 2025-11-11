'use client';

import { Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import type { Expense } from '@/types';
import { useLanguage } from '@/contexts/language-provider';

interface ExpenseListProps {
  expenses: Expense[];
}

export function ExpenseList({ expenses }: ExpenseListProps) {
  const { t, language } = useLanguage();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('expenseDetails')}</CardTitle>
        <CardDescription>{t('expenseCount', expenses.length)}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('expenseDescription')}</TableHead>
                <TableHead className="text-right">{t('expenseAmount')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.length > 0 ? (
                expenses.map(expense => (
                  <TableRow key={expense.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-col flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{expense.description}</span>
                            {expense.isPromotion && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              >
                                {t('promotionBadge')}
                              </Badge>
                            )}
                          </div>
                          {expense.notes && (
                            <span className="text-xs text-muted-foreground">{expense.notes}</span>
                          )}
                          {expense.isPromotion && expense.discountPercentage && (
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              {expense.discountPercentage}% {t('discount')}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className={expense.isPromotion ? "font-bold text-green-600 dark:text-green-400" : ""}>
                          {formatCurrency(expense.amount)}
                        </span>
                        {expense.isPromotion && expense.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            {formatCurrency(expense.originalPrice)}
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground">
                    {t('noExpenses')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
