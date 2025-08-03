// /app/api/makanan/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await prisma.makanan.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json(
      { error: 'Data tidak ditemukan atau gagal dihapus.' },
      { status: 404 }
    );
  }
}
