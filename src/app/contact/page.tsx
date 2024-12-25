import { ContactForm } from '@/components/forms/ContactForm';
import { Separator } from '@/components/ui/separator';
import { Contact as ContactIcon } from 'lucide-react';

export default async function Contact() {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <div className="flex w-full flex-col gap-4 rounded border border-primary bg-secondary p-4 md:w-fit">
        <h1 className="flex items-center justify-center gap-2 text-center text-2xl text-primary">
          <ContactIcon />
          Contact Me
        </h1>
        <Separator className="mx-auto w-[80%] bg-primary" />
        <ContactForm />
      </div>
    </div>
  );
}
