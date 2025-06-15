'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../Navbar';

import './style.scss';

export default function index({ children }: {children: React.ReactNode}) {
  const pathname = usePathname();
  const hideNavbar = pathname === '/login' || pathname === '/register';

  return (
    <>
      <div id="modal-root" className='rootModal'></div>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  )
}
