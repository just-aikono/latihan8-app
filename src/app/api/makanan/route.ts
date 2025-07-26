import { makananSchema } from '@/lib/validation';

export async function POST(req: Request) {
     try {
            const session = await getServerSession(authOptions);
            if (!session?.user) return new Response('Unauthorized', { status: 401 });

            const body = await req.json();

            // 🔒 Validasi Zod
            const parsed = makananSchema.parse(body);

            const makanan = await prisma.makanan.create({
                data: {
                ...parsed,
                userId: session.user.id,
                },
            });
    } catch (err) {
            return new Response(JSON.stringify({ error: 'Validasi gagal', detail: err }), { status: 400 });
    }
  return Response.json(makanan);
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
    
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Validasi gagal', detail: err }), { status: 400 });
    }

    return Response.json(makanan);
}
