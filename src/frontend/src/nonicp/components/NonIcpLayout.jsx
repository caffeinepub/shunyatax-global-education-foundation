import React from 'react';
import { Outlet } from '@tanstack/react-router';
import NonIcpHeader from './NonIcpHeader';
import NonIcpFooter from './NonIcpFooter';

export default function NonIcpLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <NonIcpHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <NonIcpFooter />
    </div>
  );
}
