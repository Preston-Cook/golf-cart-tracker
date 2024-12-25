'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { capitalizeWord } from '@/lib/capitalizeWord';
import { Log } from '@prisma/client';
import parsePhoneNumber from 'libphonenumber-js';
import { MoveLeft, MoveRight, OctagonAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Spinner } from './Spinner';

export function LogTable() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageNum, setPageNum] = useState(1);
  const { toast } = useToast();
  const numPages = Math.ceil(logs.length / 5);

  useEffect(
    function () {
      async function getLogs() {
        setIsLoading(true);

        const res = await fetch('/api/log');
        if (!res.ok) {
          toast({
            variant: 'destructive',
            action: (
              <div className="flex w-full items-center gap-4">
                <OctagonAlert />
                <span className="first-letter:capitalize">
                  Error: Something went wrong
                </span>
              </div>
            ),
          });
          return;
        }

        const data = await res.json();

        setLogs(data.data);
        setIsLoading(false);
      }

      getLogs();
    },
    [toast],
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[125px]">Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Golf Cart</TableHead>
          <TableHead className="text-right">Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-[260px]">
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={4}>
              <Spinner size={2} />
            </TableCell>
          </TableRow>
        ) : logs.length === 0 ? (
          <TableRow>
            <TableCell className="text-center" colSpan={4}>
              There are currently no golf cart logs.
            </TableCell>
          </TableRow>
        ) : (
          logs
            .slice((pageNum - 1) * 5, pageNum * 5)
            .map(({ id, firstName, lastName, phone, golfCart, createdAt }) => {
              const name = `${firstName} ${lastName}`;
              const formattedPhone = parsePhoneNumber(
                phone,
                'US',
              )?.formatNational();
              const cartNum = capitalizeWord(golfCart);
              const timestamp = new Date(createdAt).toLocaleString();

              return (
                <TableRow key={id}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{formattedPhone}</TableCell>
                  <TableCell>{cartNum}</TableCell>
                  <TableCell>{timestamp}</TableCell>
                </TableRow>
              );
            })
        )}
      </TableBody>
      <TableCaption>
        <div className="flex justify-around">
          <div>
            <div className="w-[25px]" />
            <MoveLeft
              onClick={() => setPageNum((prev) => prev - 1)}
              className={`trasition cursor-pointer hover:text-primary ${pageNum === 1 && 'hidden'}`}
            />
          </div>
          <div className="flex flex-col gap-4">
            <p>A list of golf cart logs.</p>
            <p className={`${numPages <= 1 && 'hidden'}`}>Page {pageNum}</p>
          </div>
          <div>
            <div className="w-[25px]" />
            <MoveRight
              onClick={() => setPageNum((prev) => prev + 1)}
              className={`trasition cursor-pointer hover:text-primary ${(logs.length === 0 || pageNum === numPages) && 'hidden'}`}
            />
          </div>
        </div>
      </TableCaption>
    </Table>
  );
}
