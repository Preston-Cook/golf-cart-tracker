'use client';

import { useToast } from '@/hooks/use-toast';
import { contactFormSchema } from '@/schemas/contactFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { OctagonAlert, Send, SquareCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Spinner } from '../Spinner';
import { Button } from '../ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form';
import { Input } from '../ui/Input';
import { PhoneInput } from '../ui/PhoneInput';
import { Textarea } from '../ui/Textarea';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(formData: z.infer<typeof contactFormSchema>) {
    setIsSubmitting(true);

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res.status === 201) {
      toast({
        action: (
          <div className="flex w-full items-center gap-4">
            <SquareCheck />
            <span className="first-letter:capitalize">
              Message sent successfully!
            </span>
          </div>
        ),
      });

      form.reset();
    } else {
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
    }

    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-8">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{'First Name'}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={'Aaron'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{'Last Name'}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={'Swartz'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{'Email'}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder={'Email'}
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{'Phone'}</FormLabel>
                <FormControl>
                  <PhoneInput
                    disabled={isSubmitting}
                    type="phone"
                    defaultCountry="US"
                    placeholder={'(123)-456-7890'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{'Message'}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder={'Enter your message here...'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={!form.formState.isValid || isSubmitting}
          className="flex w-full items-center justify-center gap-4"
          type="submit"
        >
          {isSubmitting ? (
            <Spinner />
          ) : (
            <>
              <Send /> Send Message
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
