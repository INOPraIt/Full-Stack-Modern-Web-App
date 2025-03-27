'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../Navbar';

export default function index({ children }: {children: React.ReactNode}) {
  const pathname = usePathname();
  const hideNavbar = pathname === '/login' || pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  )
}
