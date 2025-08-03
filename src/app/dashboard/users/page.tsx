'use client';

import { useEffect, useState } from 'react';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import UserForm from '@/components/UserForm';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const [data, setData] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const loadData = async () => {
    const res = await fetch('/api/user');
    const json = await res.json();
    setData(json);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/user/${id}`, { method: 'DELETE' });
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manajemen User</h2>
      <UserForm
        initialData={editingUser}
        onSukses={() => {
          loadData();
          setEditingUser(null);
        }}
      />
      <div className="mt-6 bg-white shadow rounded">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Nama</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => setEditingUser(user)} className="text-blue-600 hover:underline">
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Belum ada user.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
