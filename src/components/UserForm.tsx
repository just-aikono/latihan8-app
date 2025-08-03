'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { PlusCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

const schema = z.object({
  name: z.string().min(1, 'Wajib diisi'),
  email: z.string().email('Email tidak valid'),
  role: z.string().min(1, 'Wajib diisi'),
});

export default function UserForm({
  initialData,
  onSukses,
}: {
  initialData?: any;
  onSukses: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: '',
      email: '',
      role: '',
    },
  });

  useEffect(() => {
     console.log('initialData:', initialData);
    reset(initialData || { name: '', email: '', role: '' });
  }, [initialData, reset]);

  const onSubmit = async (data: any) => {
    const method = initialData ? 'PUT' : 'POST';
    const endpoint = initialData ? `/api/user/${initialData.id}` : '/api/user';
    try {
    const res = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text(); // untuk debug jika gagal
      console.error('Gagal simpan:', text);
      return;
    }

    onSukses();
    reset();    
  } catch (error) {
    console.error('Error:', error);
  }
};

  const isEdit = Boolean(initialData);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow space-y-4">
      <div>
        <label>Nama</label>
        <input {...register('name')} className="input" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input {...register('email')} className="input" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label>Role</label>
        <input {...register('role')} className="input" />
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
      </div>
      <button
        type="submit"
        className={`flex items-center px-4 py-2 rounded text-white ${
          isEdit ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isEdit ? (
          <>
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Simpan Perubahan
          </>
        ) : (
          <>
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Tambah User
          </>
        )}
      </button>
    </form>
  );
}
