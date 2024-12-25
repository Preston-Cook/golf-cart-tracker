import { LogForm } from '@/components/forms/LogForm';
import { Separator } from '@/components/ui/separator';
import { Calendar } from 'lucide-react';

export default async function Contact() {
  console.log(process.env.DATABASE_URL);

  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <div className="flex w-full flex-col gap-4 rounded border border-primary bg-secondary p-4 md:w-fit">
        <h1 className="flex items-center justify-center gap-2 text-center text-2xl text-primary">
          <Calendar />
          Book Golf Cart
        </h1>
        <Separator className="mx-auto w-[80%] bg-primary" />
        <LogForm />
      </div>
    </div>
  );
}
