'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/lib/validation';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const parsed = loginSchema.parse(form);

      const res = await signIn('credentials', {
        ...parsed,
        redirect: false,
      });

      if (res?.ok) router.push('/dashboard');
      else setError('Email atau password salah');
    } catch (err) {
      if (err.errors) {
        setError(err.errors[0].message);
      } else {
        setError('Terjadi kesalahan');
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

