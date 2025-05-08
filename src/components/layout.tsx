
import React, { ReactNode } from 'react';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 "><Outlet /></main>
    </div>
  );
};

export default Layout;
