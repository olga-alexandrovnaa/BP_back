-- CreateTable
CREATE TABLE "ActionCompletingHierarchy" (
    "id" SERIAL NOT NULL,
    "parentId" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,

    CONSTRAINT "ActionCompletingHierarchy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActionCompletingHierarchy" ADD CONSTRAINT "ActionCompletingHierarchy_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ActionCompleting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ActionCompletingHierarchy" ADD CONSTRAINT "ActionCompletingHierarchy_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ActionCompleting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
