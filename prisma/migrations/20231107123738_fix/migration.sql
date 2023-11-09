/*
  Warnings:

  - Added the required column `setCompleteUserId` to the `ActionCompleting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActionCompleting" ADD COLUMN     "setCompleteUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ActionCompleting" ADD CONSTRAINT "ActionCompleting_setCompleteUserId_fkey" FOREIGN KEY ("setCompleteUserId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
