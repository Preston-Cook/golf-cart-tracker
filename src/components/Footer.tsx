import { footerLinks } from '@/config/links';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { Button } from './ui/Button';

export async function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 border-t border-primary bg-secondary p-4 text-center">
      <Link href={'/'} className="flex items-center justify-center gap-x-2">
        <Image
          className="block"
          src="/images/lfc-logo.png"
          height={30}
          width={30}
          alt="Velago logo"
        />

        <h3 className="w-fit text-2xl text-primary">Golf Cart Tracker</h3>
      </Link>
      <div className="md:max-w-[60%] lg:max-w-[40%]">
        {
          'Golf Cart Tracker helps monitor and manage golf cart usage during Port-A-Getaway with ease.'
        }
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-x-5">
        {footerLinks.map(({ name, href }) => (
          <Button
            key={uuid()}
            asChild
            className="p-0 font-semibold"
            variant={'link'}
          >
            <Link href={href}>{name}</Link>
          </Button>
        ))}
      </div>
      <div className="flex w-full items-center justify-center">
        <div>{`© ${new Date().getFullYear()} Longhorns for Christ`}</div>
      </div>
    </footer>
  );
}
