import { PrismaClient } from "@/generated/prisma";
import Link from "next/link";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function LandingPage() {
  const makanan = await prisma.makanan.findMany();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white shadow-md p-8 md:p-12 text-center relative">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Selamat Datang di KaloriTrack!
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Temukan informasi nutrisi makanan favoritmu & catat konsumsi harian dengan mudah.
        </p>

        {/* Tombol Login & Register */}
        <div className="mt-6 flex justify-center space-x-4">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-medium"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 font-medium"
          >
            Register
          </Link>
        </div>

        {/* Ilustrasi */}
        <div className="mt-8">
          <Image
            src="/makanan-ilustrasi.svg"
            alt="Ilustrasi Makanan"
            width={500}
            height={300}
            className="mx-auto"
          />
        </div>
      </section>

      {/* List Makanan */}
      <section className="p-6 md:p-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Daftar Makanan Publik
        </h2>

        {makanan.length === 0 ? (
          <p className="text-gray-500">Belum ada data makanan.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {makanan.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">{m.nama}</h3>
                <p className="text-gray-600">Porsi: {m.porsi}</p>
                <p className="text-gray-800 font-medium">
                  {m.jumlahKalori} kalori
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
