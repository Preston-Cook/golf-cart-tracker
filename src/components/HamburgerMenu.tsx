'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import { headerLinks } from '@/config/links';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DarkModeToggle } from './DarkModeToggle';
import { Button } from './ui/Button';

interface HamburgerMenuProps {
  className?: string;
}

export function HamburgerMenu({ className }: HamburgerMenuProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(function () {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  return (
    <Sheet>
      <SheetTrigger className={className}>
        <Button
          className={`${isMounted ? 'block' : 'hidden'}`}
          variant={'outline'}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex w-[60%] flex-col bg-secondary p-4"
        side={'right'}
      >
        <SheetHeader className="p-1">
          <div className="flex flex-1">
            <Link
              href={'/'}
              className="flex items-center justify-start gap-x-2"
            >
              <Image
                src="/images/lfc-logo.png"
                height={30}
                width={30}
                alt="Velago logo"
              />
              <SheetTitle className="text-2xl text-primary">
                Golf Cart Tracker
              </SheetTitle>
            </Link>
          </div>
        </SheetHeader>
        <div className="flex w-full flex-1 flex-col border border-t-primary">
          <div className="flex flex-1 flex-col py-4">
            <div className={`flex flex-1 flex-col gap-4`}>
              <SheetDescription className="text-lg">Menu</SheetDescription>
              <div className={'flex flex-col gap-4'}>
                {headerLinks.map(({ href, name }) => (
                  <Link key={uuid()} href={href} className="w-full">
                    <Button className="w-full">{name}</Button>
                  </Link>
                ))}
              </div>
            </div>
            <div className={`flex flex-col gap-4`}>
              <SheetDescription className="text-lg">
                Miscellaneous
              </SheetDescription>
              <div className={'flex flex-col gap-4'}>
                <DarkModeToggle className="w-full" />
              </div>
            </div>
          </div>
          <SheetFooter className="">
            <div className="w-full text-center">{`© ${new Date().getFullYear()} Longhorns for Christ`}</div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
