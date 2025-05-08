import { ChevronRight } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  name: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Stores', path: '/stores' },
  { name: 'Products', path: '/products' },
  { name: 'Catalogue', path: '/catalogue' },
  { name: 'Promotions', path: '/promotions' },
  { name: 'Reports', path: '/reports' },
  { name: 'Docs', path: '/docs' },
  { name: 'Settings', path: '/settings' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-1/6 p-6 flex flex-col border-r" style={{ borderColor: '#00000014' }} >
        <div className="mb-10">
        <img src="/images/logo.png" alt="Logo" className="h-16 object-cover" />
      </div>
      <ul className="space-y-4 pt-8 border-t" style={{ borderColor: '#00000014' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-worksans ${
                  isActive
                    ? 'bg-sky-light text-brand-blue'
                    : ' black'
                }`}
              >
               
                <div className="w-5 h-5 bg-gray-100 rounded-md border border-gray-300" />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto flex items-center  px-3 py-4 border-t" style={{ borderColor: '#00000014' }}>
        <div className="flex items-center gap-3">
          <img
            src="/images/image.png"
            alt="User"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-normal text-black font-worksans">Andy Samberg</p>
            <p className="text-sm text-gray-500 font-worksans">andy.samberg@gmail.com</p>
          </div>
        </div>
        <ChevronRight className="text-brand-blue" size={24} />
      </div>
    </div>
  );
};

export default Sidebar;
