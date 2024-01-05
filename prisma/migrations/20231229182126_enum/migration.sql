/*
  Warnings:

  - Added the required column `golfCart` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GolfCart" AS ENUM ('One', 'Two');

-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "golfCart" "GolfCart" NOT NULL;
