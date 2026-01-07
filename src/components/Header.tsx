import { headerLinks } from '@/config/links';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { DarkModeToggle } from './DarkModeToggle';
import { HamburgerMenu } from './HamburgerMenu';
import { Button } from './ui/Button';

export async function Header() {
  return (
    <header className="flex border-b border-primary bg-secondary p-4">
      <div className="flex flex-1 gap-8">
        <Link href={'/'} className="flex items-center justify-start gap-x-2">
          <Image
            className="block"
            src="/images/lfc-logo.png"
            height={30}
            width={30}
            alt="Velago logo"
          />
          <h3 className="text-2xl text-primary">Golf Cart Tracker</h3>
        </Link>
      </div>
      <div className="hidden items-center gap-x-4 md:flex">
        <DarkModeToggle className="p-4" />
        {headerLinks.map(({ href, name, icon: Icon }) => (
          <Button
            key={uuid()}
            asChild
            className="w-25 flex items-center justify-center"
            variant={'outline'}
          >
            <Link href={href}>
              <Icon />
              {name}
            </Link>
          </Button>
        ))}
      </div>
      <HamburgerMenu className="md:hidden" />
    </header>
  );
}
