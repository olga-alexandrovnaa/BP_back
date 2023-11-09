import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeders/Seeder';
import { UserGroups } from './seeders/data/UserGroups';
import { MeasureUnits } from './seeders/data/measureUnit';
import { ProductTypes } from './seeders/data/ProductTypes';
import { Products } from './seeders/data/Products';
import { ProcessShablons } from './seeders/data/processShablon';
import { ProcessShablonActions } from './seeders/data/processShablonAction';
import { ProcessShablonActionUserGroups_s } from './seeders/data/ProcessShablonActionUserGroups_s';
import { Requests } from './seeders/data/Requests';
import { ProcessShablonActionInputFields } from './seeders/data/ProcessShablonActionInputFields';
import { ProcessShablonActionHierarchies } from './seeders/data/ProcessShablonActionHierarchies';
import { TransitionConditionFuncs } from './seeders/data/TransitionConditionFuncs';
import { TransitionConditions } from './seeders/data/TransitionConditions';
import { Users } from './seeders/data/Users';
import { Groups } from './seeders/data/groups';

export class AllSeeders extends Seeder {
  static async seed(prisma: PrismaClient) {
    for (const iterator of Groups) {
      await prisma.group.upsert({
        where: { id: iterator.id },
        update: {},
        create: {
          ...iterator,
        },
      });
    }
    for (const iterator of Users) {
      await prisma.user.upsert({
        where: { id: iterator.id },
        update: {},
        create: {
          ...iterator,
        },
      });
    }
    for (const iterator of UserGroups) {
      await prisma.userGroup.upsert({
        where: {
          userId_groupId: {
            userId: iterator.userId,
            groupId: iterator.groupId,
          },
        },
        update: {},
        create: {
          ...iterator,
        },
      });
    }
    for (const iterator of MeasureUnits) {
      await prisma.measureUnit.upsert({
        where: { id: iterator.id },
        update: {},
        create: {
          ...iterator,
        },
      });
    }

    for (const iterator of ProductTypes) {
      await prisma.productType.upsert({
        where: { id: iterator.id },
        update: {},
        create: {
          ...iterator,
        },
      });
    }

    for (const iterator of Products) {
      await prisma.product.upsert({
        where: { id: iterator.id },
        update: {},
        create: {
          ...iterator,
        },
      });
    }

    for (const iterator of ProcessShablons) {
      await prisma.processShablon.upsert({
        where: { id: iterator.id },
        update: {},
        create: {
          ...iterator,
        },
      });
    }

    for (const iterator of ProcessShablonActions) {
      await prisma.processShablonAction.upsert({
        where: { id: iterator.id },
        update: {},
        create: {
          ...iterator,
        },
      });
    }

    for (const iterator of ProcessShablonActionUserGroups_s) {
      await prisma.processShablonActionUserGroups.upsert({
        where: {
          actionId_groupId: {
            actionId: iterator.actionId,
            groupId: iterator.groupId,
          },
        },
        update: {},
        create: {
          ...iterator,
        },
      });
    }

    for (const iterator of Requests) {
      await prisma.request.upsert({
        where: { id: iterator.id },
        update: {},
        create: {
          ...iterator,
        },
      });
    }

    for (const iterator of ProcessShablonActionInputFields) {
      await prisma.processShablonActionInputField.upsert({
        where: { id: iterator.id },
        update: {},
        create: {
          ...iterator,
        },
      });
    }

    for (const iterator of ProcessShablonActionHierarchies) {
      await prisma.processShablonActionHierarchy.upsert({
        where: { id: iterator.id },
        update: {},
        create: {
          ...iterator,
        },
      });
    }

    for (const iterator of TransitionConditionFuncs) {
      await prisma.transitionConditionFunc.upsert({
        where: { id: iterator.id },
        update: {},
        create: {
          ...iterator,
        },
      });
    }

    for (const iterator of TransitionConditions) {
      await prisma.transitionCondition.upsert({
        where: { id: iterator.id },
        update: {},
        create: {
          ...iterator,
        },
      });
    }
  }
}
