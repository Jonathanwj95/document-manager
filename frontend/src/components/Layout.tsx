// src/components/Layout.tsx
import React, { useState, useEffect, ReactNode } from 'react';
import {
  SunIcon,
  MoonIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function Layout({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
        <div className="p-6 flex items-center space-x-2">
          <DocumentTextIcon className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-heading text-primary">DocManager</h1>
        </div>
        <nav className="px-4">
          <a
            className="block py-2 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            href="#"
          >
            Mis Documentos
          </a>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-end items-center p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {dark ? (
              <SunIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
