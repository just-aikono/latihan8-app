import { PrismaClient } from "@/generated/prisma";
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/lib/validation';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const parsed = registerSchema.parse(body);
    const hashed = await bcrypt.hash(parsed.password, 10);

    await prisma.user.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        password: hashed,
      },
    });

    return Response.json({ message: 'User created' });
  } catch (err) {
    return Response.json({ error: 'Validasi gagal', detail: err }, { status: 400 });
  }
}
