'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerSchema } from '@/lib/validation';
import { z } from 'zod';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const parsed = registerSchema.parse(form);

      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Terjadi kesalahan saat register');
      }

      router.push('/login');
    } catch (err: any) {
      console.error(err);

      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError(err.message || 'Terjadi kesalahan');
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold mb-2 text-center">Register</h1>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <label className="block text-sm mb-1">Nama</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Nama lengkap"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="email@contoh.com"
            type="email"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="******"
            type="password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Daftar
        </button>
      </form>
    </main>
  );
}
