'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/saved', label: 'Saved' },
    { href: '/digest', label: 'Digest' },
    { href: '/settings', label: 'Settings' },
    { href: '/proof', label: 'Proof' },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0DDD9' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-serif font-bold" style={{ color: '#8B0000' }}>
              JNT
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                  isActive(item.href)
                    ? 'font-semibold'
                    : ''
                }`}
                style={{
                  color: isActive(item.href) ? '#8B0000' : '#666666',
                }}
              >
                {item.label}
                {isActive(item.href) && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ backgroundColor: '#8B0000' }}
                  ></div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md transition-colors"
            style={{ color: '#666666' }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'border-l-4 pl-3'
                    : ''
                }`}
                style={{
                  backgroundColor: isActive(item.href) ? '#F9F8F6' : 'transparent',
                  color: isActive(item.href) ? '#8B0000' : '#666666',
                  borderColor: isActive(item.href) ? '#8B0000' : 'transparent',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
