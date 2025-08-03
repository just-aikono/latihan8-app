import { makananSchema } from '@/lib/validation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextRequest } from 'next/server';
import { prisma } from '../../../lib/prisma';


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new Response('Unauthorized', { status: 401 });

    const body = await req.json();
    const parsed = makananSchema.parse(body);

    const makanan = await prisma.makanan.create({
    data: {
        ...parsed,
        userId: session.user.id, 
    },
    });

    return Response.json(makanan); // ← pindah ke dalam try
  } catch (err) {
    console.error(err); // tambahkan log
     return new Response(JSON.stringify({ message: 'Validasi gagal', error: String(err) }), { status: 400 });
    // return new Response(
    //   JSON.stringify({ error: 'Validasi gagal', detail: err }),
    //   { status: 400 }
    // );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new Response('Unauthorized', { status: 401 });

    const body = await req.json();
    const parsed = makananSchema.parse(body);

    const makanan = await prisma.makanan.update({
      where: { id: parsed.id },
      data: parsed,
    });

    return Response.json(makanan); // ← pindah ke dalam try
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Validasi gagal', detail: err }),
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const makanan = await prisma.makanan.findMany({
      where: { userId: session.user.id },
      //orderBy: { createdAt: 'desc' },
    });

    return Response.json(makanan);
  } catch (err) {
    console.error(err); // tambahkan log
    return new Response(JSON.stringify({ message: 'Terjadi kesalahan saat mengambil data', error: String(err) }), { status: 500 });
    // return new Response('Terjadi kesalahan saat mengambil data', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID wajib disertakan' }), { status: 400 });
    }

    const existing = await prisma.makanan.findUnique({ where: { id } });

    if (!existing || existing.userId !== session.user.id) {
      return new Response(JSON.stringify({ error: 'Data tidak ditemukan atau akses ditolak' }), { status: 404 });
    }

    await prisma.makanan.delete({ where: { id } });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Gagal menghapus data', detail: err }), { status: 500 });
  }
}