import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export default async function LandingPage() {
  const makanan = await prisma.makanan.findMany();

  return (
    <main>
      <h1>Daftar Makanan Publik</h1>
      <ul>
        {makanan.map((m) => (
          <li key={m.id}>{m.nama} - {m.jumlahKalori} kalori</li>
        ))}
      </ul>
    </main>
  );
}
