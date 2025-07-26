'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerSchema } from '@/lib/validation';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const parsed = registerSchema.parse(form);

      await fetch('/api/user/register', {
        method: 'POST',
        body: JSON.stringify(parsed),
      });

      router.push('/login');
    } catch (err) {
      if (err.errors) {
        setError(err.errors[0].message); // Zod error message
      } else {
        setError('Terjadi kesalahan');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nama" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
}
