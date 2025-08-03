'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
type FormData = z.infer<typeof schema>;
const schema = z.object({
  nama: z.string().min(1, 'Wajib diisi'),
  porsi: z.string().min(1, 'Wajib diisi'),
  jumlahKalori: z.coerce.number().positive('Harus lebih dari 0'),
});

interface Makanan {
  id: string;
  nama: string;
  porsi: string;
  jumlahKalori: number;
}

export default function MakananForm({
  userId,
  onSukses,
  initialData,
}: {
  userId: string;
  onSukses: () => void;
  initialData?: Makanan | null;
}) {
  const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: initialData || {
        nama: '',
        porsi: '',
        jumlahKalori: 0,
      },
    });

  useEffect(() => {
    reset(initialData || {
      nama: '',
      porsi: '',
      jumlahKalori: 0,
    });
  }, [initialData, reset]);

  const onSubmit = async (data: FormData) => {
    const method = initialData ? 'PUT' : 'POST';
    const body = initialData
      ? JSON.stringify({ ...data, id: initialData.id })
      : JSON.stringify({ ...data, userId });

    await fetch('/api/makanan', {
      method,
      body,
    });

    reset();
    onSukses();
  };

  const isEdit = Boolean(initialData);

  return (
      <form
        key={initialData?.id || 'new'}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded shadow space-y-4"
      >
      <div>
        <label>Nama</label>
        <input {...register('nama')} className="input" />
        {errors.nama && <p className="text-red-500">{errors.nama.message}</p>}
      </div>
      <div>
        <label>Porsi</label>
        <input {...register('porsi')} className="input" />
        {errors.porsi && <p className="text-red-500">{errors.porsi.message}</p>}
      </div>
      <div>
        <label>Jumlah Kalori</label>
        <input type="number" {...register('jumlahKalori')} className="input" />
        {errors.jumlahKalori && <p className="text-red-500">{errors.jumlahKalori.message}</p>}
      </div>
      <button
        type="submit"
        className={`flex items-center px-4 py-2 rounded text-white ${isEdit ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isEdit ? (
          <>
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Simpan Perubahan
          </>
        ) : (
          <>
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Tambah Makanan
          </>
        )}
      </button>
    </form>
  );
}
