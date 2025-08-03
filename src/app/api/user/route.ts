import { NextResponse } from 'next/server';
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  const user = await prisma.user.create({ data: body });
  return NextResponse.json(user);
}
