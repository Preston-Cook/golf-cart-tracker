'use client';

import { useLogs } from '@/context/LogsContext';
import { RefreshCcw } from 'lucide-react';
import { Spinner } from './Spinner';
import { Button } from './ui/Button';

export function RefreshButton() {
  const { isLoading, refreshLogs } = useLogs();

  return (
    <Button
      className="text-muted-foreground hover:text-primary"
      onClick={() => refreshLogs()}
      disabled={isLoading}
      variant={'link'}
    >
      {isLoading ? <Spinner /> : <RefreshCcw />}
    </Button>
  );
}
