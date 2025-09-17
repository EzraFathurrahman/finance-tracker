'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/contexts/language-provider';
import type { Expense } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Check, ChevronsUpDown, CirclePlus } from 'lucide-react';
import * as React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  expenses: Expense[];
}

export function ExpenseForm({ onAddExpense, expenses }: ExpenseFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const existingDescriptions = React.useMemo(() => {
    const descriptions = expenses.map(e => e.description);
    return [...new Set(descriptions)].map(d => ({ label: d, value: d }));
  }, [expenses]);

  const formSchema = z.object({
    description: z.string().min(1, { message: t('fieldRequired') }),
    amount: z.coerce.number().positive({ message: 'Amount must be positive' }),
    notes: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      amount: undefined,
      notes: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddExpense(values);
    toast({
      title: t('expenseAdded'),
      description: `${values.description} - ${values.amount}`,
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('addExpenseManually')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('description')}</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? existingDescriptions.find(
                                framework => framework.value === field.value
                              )?.label
                            : t('descriptionPlaceholder')}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                      <Command
                        filter={(value, search) => {
                          if (value.toLowerCase().includes(search.toLowerCase())) return 1;
                          return 0;
                        }}
                      >
                        <CommandInput placeholder={t('descriptionPlaceholder')} />
                        <CommandList>
                          <CommandEmpty>{t('noResults')}</CommandEmpty>
                          <CommandGroup>
                            {existingDescriptions.map(framework => (
                              <CommandItem
                                value={framework.value}
                                key={framework.value}
                                onSelect={() => {
                                  form.setValue('description', framework.value);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    framework.value === field.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                {framework.label}
                              </CommandItem>
                            ))}
                             <CommandItem
                                onSelect={(currentValue) => {
                                  form.setValue("description", currentValue);
                                  setOpen(false)
                                }}
                              >
                                {t('addCategory')}
                              </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('amount')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t('amountPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('notes')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('notesPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <CirclePlus className="mr-2 h-4 w-4" />
              {t('submitExpense')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}