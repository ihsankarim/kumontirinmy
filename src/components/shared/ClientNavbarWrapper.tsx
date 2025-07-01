'use client';

import Navbar from './Navbar';
import { SessionProvider } from 'next-auth/react';

export default function ClientNavbarWrapper() {
  return (
    <SessionProvider>
      <Navbar />
    </SessionProvider>
  );
}
