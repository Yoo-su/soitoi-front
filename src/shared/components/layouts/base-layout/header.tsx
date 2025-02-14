import Link from 'next/link';
import { useEffect, useState } from 'react';

import { cn } from '@/shared/utils';

import { Button } from '../../shadcn';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navItems = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Chat',
      href: '/chat',
    },
    {
      title: 'WorkBoard',
      href: '/work-board',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 flex w-full items-center justify-between bg-white shadow-md transition-all duration-500',
        scrolled ? 'bg-opacity-50' : 'bg-opacity-100',
        scrolled ? 'p-2' : 'p-3'
      )}
    >
      <div className="flex items-center gap-4">
        <Button className="size-6">☰</Button>
      </div>

      <nav className={cn('hidden items-center gap-6 lg:flex')}>
        {navItems.map((item) => (
          <Link href={item.href} key={item.href} className="text-sm font-medium text-gray-800 hover:text-green-600">
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="rounded-full border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
