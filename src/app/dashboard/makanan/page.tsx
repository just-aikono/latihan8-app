'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import MakananForm from '@/components/MakananForm';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

interface Makanan {
  id: string;
  nama: string;
  porsi: string;
  jumlahKalori: number;
}

export default function MakananPage() {
  const { data: session, status } = useSession();

  const [data, setData] = useState<Makanan[]>([]);
  const [editingData, setEditingData] = useState<Makanan | null>(null);

  const loadData = async () => {
    const res = await fetch('/api/makanan');
    const json = await res.json();
    setData(json);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/makanan/${id}`, { method: 'DELETE' });
    loadData();
  };

  useEffect(() => {
    if (status === 'authenticated') loadData();
  }, [status]);

  // Pindahkan kondisi setelah semua hooks
  if (status === 'loading') return <div className="p-6">Loading...</div>;
  if (!session) return <div className="p-6 text-red-600">Unauthorized</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">List Makanan</h2>
      <MakananForm
        userId={session.user.id}
        initialData={editingData}
        onSukses={() => {
          loadData();
          setEditingData(null);
        }}
      />
      <div className="mt-6 bg-white shadow rounded">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Nama</th>
              <th className="p-2">Porsi</th>
              <th className="p-2">Kalori</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((makanan) => (
              <tr key={makanan.id} className="border-t">
                <td className="p-2">{makanan.nama}</td>
                <td className="p-2">{makanan.porsi}</td>
                <td className="p-2">{makanan.jumlahKalori}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => setEditingData(makanan)}
                    className="text-blue-600 hover:underline"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(makanan.id)}
                    className="text-red-600 hover:underline"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Belum ada data makanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
