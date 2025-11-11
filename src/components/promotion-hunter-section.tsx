'use client';

import { useLanguage } from '@/contexts/language-provider';
import type { Expense } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag, TrendingDown, Percent } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PromotionHunterSectionProps {
  expenses: Expense[];
}

export function PromotionHunterSection({ expenses }: PromotionHunterSectionProps) {
  const { t, language } = useLanguage();

  const promotionalExpenses = expenses.filter(expense => expense.isPromotion);

  const totalSavings = promotionalExpenses.reduce((acc, expense) => {
    if (expense.originalPrice && expense.amount) {
      return acc + (expense.originalPrice - expense.amount);
    }
    return acc;
  }, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          {t('promotionHunter')}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {t('promotionHunterSubtitle')}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Savings Summary */}
          <div className="rounded-lg border bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('totalSaved')}</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(totalSavings)}
                </p>
              </div>
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                <TrendingDown className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {promotionalExpenses.length} {t('promotionExpenses')}
              </Badge>
            </div>
          </div>

          {/* Promotion List */}
          <div>
            <h3 className="mb-3 text-sm font-medium flex items-center gap-2">
              <Percent className="h-4 w-4" />
              {t('promotionList')}
            </h3>
            {promotionalExpenses.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <Tag className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {t('noPromotions')}
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[300px] rounded-md border">
                <div className="p-4 space-y-3">
                  {promotionalExpenses.map((expense) => {
                    const savings = expense.originalPrice && expense.amount
                      ? expense.originalPrice - expense.amount
                      : 0;

                    return (
                      <div
                        key={expense.id}
                        className="rounded-lg border bg-card p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium truncate">{expense.description}</p>
                              <Badge
                                variant="secondary"
                                className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              >
                                {t('promotionBadge')}
                              </Badge>
                            </div>
                            {expense.notes && (
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                                {expense.notes}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                              {expense.originalPrice && (
                                <div className="flex items-center gap-1">
                                  <span className="text-muted-foreground">{t('regularPrice')}:</span>
                                  <span className="line-through">{formatCurrency(expense.originalPrice)}</span>
                                </div>
                              )}
                              {expense.discountPercentage && (
                                <div className="flex items-center gap-1">
                                  <Percent className="h-3 w-3 text-green-600 dark:text-green-400" />
                                  <span className="font-medium text-green-600 dark:text-green-400">
                                    {expense.discountPercentage}% OFF
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600 dark:text-green-400">
                              {formatCurrency(expense.amount)}
                            </p>
                            {savings > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {t('savingsAmount')}: {formatCurrency(savings)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
