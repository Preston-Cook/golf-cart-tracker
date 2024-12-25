'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { logFormSchema } from '@/schemas/logFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarPlus, OctagonAlert, SquareCheck } from 'lucide-react';
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

export function LogForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof logFormSchema>>({
    resolver: zodResolver(logFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      cartNum: '',
      phone: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(formData: z.infer<typeof logFormSchema>) {
    setIsSubmitting(true);

    const res = await fetch('/api/log', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res.status === 201) {
      toast({
        action: (
          <div className="flex w-full items-center gap-4">
            <SquareCheck />
            <span className="first-letter:capitalize">
              Golf cart booked successfully!
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
            name="cartNum"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{'Golf Cart Number'}</FormLabel>
                <FormControl>
                  <Select
                    disabled={isSubmitting}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      className={`${!field.value && 'text-muted-foreground'}`}
                    >
                      <SelectValue placeholder="Select a Golf Cart Number" />
                    </SelectTrigger>
                    <SelectContent className="cursor-pointer">
                      <SelectItem className="cursor-pointer" value="ONE">
                        One
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="TWO">
                        Two
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="THREE">
                        Three
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="FOUR">
                        Four
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
              <CalendarPlus /> Book Cart
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
