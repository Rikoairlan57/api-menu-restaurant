-- CreateTable
CREATE TABLE "Menus" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "qty" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Menus_pkey" PRIMARY KEY ("id")
);
