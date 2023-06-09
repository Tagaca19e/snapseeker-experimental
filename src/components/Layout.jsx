import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />
      <main className="mx-auto w-full">{children}</main>
      <Footer />
    </div>
  );
}
