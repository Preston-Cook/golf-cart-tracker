import { LogTable } from '@/components/LogTable';
import { RefreshButton } from '@/components/RefreshButton';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/separator';
import { ClipboardList, Github } from 'lucide-react';

export default async function Logs() {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <div className="flex w-full flex-col gap-4 rounded border border-primary bg-secondary p-4 md:w-fit">
        <div className="flex items-center justify-between">
          {/* spacer button */}
          <Button className="invisible">
            <Github />
          </Button>
          <h1 className="flex items-center justify-center gap-2 text-center text-2xl text-primary">
            <ClipboardList /> Logs
          </h1>
          <RefreshButton />
        </div>
        <Separator className="mx-auto w-[80%] bg-primary" />
        <div className="overflow-y-auto">
          <LogTable />
        </div>
      </div>
    </div>
  );
}
