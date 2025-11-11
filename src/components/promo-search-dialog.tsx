'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-provider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Search, ExternalLink, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PromoSearchDialogProps {
  category: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PromoSearchDialog({ category, open, onOpenChange }: PromoSearchDialogProps) {
  const { t } = useLanguage();

  const searchQuery = `Promo ${category} saat ini`;
  const encodedQuery = encodeURIComponent(searchQuery);

  const searchEngines = [
    {
      name: 'Google',
      url: `https://www.google.com/search?q=${encodedQuery}`,
      icon: '🔍',
    },
    {
      name: 'Gila Diskon',
      url: `https://www.tokopedia.com/search?q=${encodeURIComponent(category)}`,
      icon: '🛒',
    },
    {
      name: 'Gofood',
      url: `https://shopee.co.id/search?keyword=${encodeURIComponent(category)}`,
      icon: '🛍️',
    },
    {
      name: 'Katalogpromosi',
      url: `https://www.lazada.co.id/catalog/?q=${encodeURIComponent(category)}`,
      icon: '🏪',
    },
  ];

  const handleSearch = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            {t('searchPromos')}
          </DialogTitle>
          <DialogDescription>
            {t('searchPromosDesc')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{t('category')}:</span>
            <Badge variant="secondary" className="text-sm">
              {category}
            </Badge>
          </div>

          {/* Search Query */}
          <div className="rounded-lg border bg-muted/50 p-3">
            <div className="flex items-center gap-2 text-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <code className="font-mono">{searchQuery}</code>
            </div>
          </div>

          {/* Search Options */}
          <div>
            <h4 className="mb-3 text-sm font-medium">{t('searchOn')}:</h4>
            <div className="grid grid-cols-2 gap-3">
              {searchEngines.map((engine) => (
                <Button
                  key={engine.name}
                  variant="outline"
                  className="h-auto flex-col gap-2 p-4 hover:bg-accent"
                  onClick={() => handleSearch(engine.url)}
                >
                  <span className="text-2xl">{engine.icon}</span>
                  <span className="text-sm font-medium">{engine.name}</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </Button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-lg border bg-blue-50 dark:bg-blue-950 p-3">
            <p className="text-xs text-muted-foreground">
              💡 {t('promoSearchTip')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
