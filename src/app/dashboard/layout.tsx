// /app/dashboard/layout.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';
import Link from 'next/link';
import React from 'react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/login');

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Selamat datang, {session.user?.name} ({session.user?.email})
        </p>
      </div>

      {/* Navigasi shared */}
      <div className="flex gap-4 mb-6">
        <Link
          href="/dashboard/makanan"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          List Makanan
        </Link>
        <Link
          href="/dashboard/users"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          List User
        </Link>
        <LogoutButton />
      </div>

      {/* Semua konten halaman dashboard akan dirender di sini */}
      <div className="bg-white p-4 rounded shadow">{children}</div>
    </div>
  );
}
