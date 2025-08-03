import { z } from 'zod';

export const makananSchema = z.object({
  id: z.string().optional(),
  nama: z.string().min(1, 'Nama makanan tidak boleh kosong'),
  porsi: z.string().min(1, 'Porsi harus lebih dari 0'),
  jumlahKalori: z.coerce.number().min(1, 'Kalori harus lebih dari 0'),
});

export const registerSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});