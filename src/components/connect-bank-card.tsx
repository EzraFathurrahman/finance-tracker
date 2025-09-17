'use client';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Landmark, CircleDollarSign, Wallet } from 'lucide-react';
import { useLanguage } from '@/contexts/language-provider';
import { useToast } from '@/hooks/use-toast';

export function ConnectBankCard() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleComingSoon = () => {
    toast({
      title: t('comingSoon'),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('connectBank')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleComingSoon} variant="outline" className="w-full justify-start">
          <Landmark className="mr-2" />
          <span>{t('bca')}</span>
        </Button>
        <Button onClick={handleComingSoon} variant="outline" className="w-full justify-start">
          <CircleDollarSign className="mr-2" />
          <span>{t('jago')}</span>
        </Button>
        <Button onClick={handleComingSoon} variant="outline" className="w-full justify-start">
          <Wallet className="mr-2" />
          <span>{t('gopay')}</span>
        </Button>
      </CardContent>
    </Card>
  );
}
