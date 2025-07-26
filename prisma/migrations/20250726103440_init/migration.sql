-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "image" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "makanan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "porsi" INTEGER NOT NULL,
    "jumlahKalori" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "makanan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "makanan" ADD CONSTRAINT "makanan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
