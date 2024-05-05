import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'PropertyPulse',
  description: 'Find The Perfect Rental Property',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
