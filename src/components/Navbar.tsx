"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Aim', path: '/aim' },
  { name: 'Theory', path: '/theory' },
  { name: 'Procedure', path: '/procedure' },
  { name: 'Simulation', path: '/simulation' },
  { name: 'Result', path: '/result' },
  { name: 'References', path: '/references' }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-primary-dark text-white sticky top-0 z-[100] border-b-4 border-highlight shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-highlight tracking-wider">
          <Activity className="w-6 h-6" />
          CICLABS
        </Link>
        <ul className="hidden md:flex items-center gap-2">
          {pages.map((page) => (
            <li key={page.path}>
              <Link
                href={page.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/10 hover:text-highlight",
                  pathname === page.path ? "bg-highlight text-primary-dark hover:bg-highlight/90 hover:text-primary-dark" : "text-white/90"
                )}
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
