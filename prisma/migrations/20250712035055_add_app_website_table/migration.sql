-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "developerSlug" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apps" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "developerSlug" TEXT NOT NULL,
    "releaseNotes" TEXT,
    "downloadLink" TEXT,
    "screenshots" TEXT[],

    CONSTRAINT "Apps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Websites" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "featuredImage" TEXT NOT NULL,
    "developerSlug" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Websites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_developerSlug_key" ON "Users"("developerSlug");

-- AddForeignKey
ALTER TABLE "Apps" ADD CONSTRAINT "Apps_developerSlug_fkey" FOREIGN KEY ("developerSlug") REFERENCES "Users"("developerSlug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Websites" ADD CONSTRAINT "Websites_developerSlug_fkey" FOREIGN KEY ("developerSlug") REFERENCES "Users"("developerSlug") ON DELETE CASCADE ON UPDATE CASCADE;
