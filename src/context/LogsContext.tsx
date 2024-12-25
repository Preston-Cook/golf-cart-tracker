'use client';

import { Log } from '@prisma/client';
import { createContext, useContext, useState } from 'react';

interface LogsContextProps {
  logs: Log[];
  refreshLogs: () => void;
  isLoading: boolean;
}

const LogsContext = createContext<LogsContextProps | undefined>(undefined);

export function LogsProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchLogs() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/log');
      if (!res.ok) throw new Error('Failed to fetch logs');
      const data = await res.json();
      setLogs(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <LogsContext.Provider value={{ logs, refreshLogs: fetchLogs, isLoading }}>
      {children}
    </LogsContext.Provider>
  );
}

export function useLogs() {
  const context = useContext(LogsContext);
  if (!context) {
    throw new Error('useLogs must be used within a LogsProvider');
  }
  return context;
}
