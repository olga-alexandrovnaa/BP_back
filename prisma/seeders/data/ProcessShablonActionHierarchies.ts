import { ProcessShablonActionHierarchy } from '@prisma/client';

export const ProcessShablonActionHierarchies: ProcessShablonActionHierarchy[] = [
  {
    id: 1,
    parentId: 1,
    childId: 2,
  },
  {
    id: 2,
    parentId: 2,
    childId: 20,
  },
  {
    id: 3,
    parentId: 20,
    childId: 7,
  },
  {
    id: 4,
    parentId: 20,
    childId: 17,
  },
  {
    id: 5,
    parentId: 7,
    childId: 21,
  },
  {
    id: 6,
    parentId: 17,
    childId: 21,
  },
  {
    id: 7,
    parentId: 21,
    childId: 13,
  },
  {
    id: 8,
    parentId: 13,
    childId: 2,
  },
  {
    id: 9,
    parentId: 13,
    childId: 3,
  },
  {
    id: 10,
    parentId: 3,
    childId: 4,
  },
  {
    id: 11,
    parentId: 4,
    childId: 2,
  },
  {
    id: 12,
    parentId: 4,
    childId: 18,
  },
  {
    id: 13,
    parentId: 18,
    childId: 6,
  },
  {
    id: 14,
    parentId: 18,
    childId: 16,
  },
  {
    id: 15,
    parentId: 6,
    childId: 19,
  },
  {
    id: 16,
    parentId: 16,
    childId: 19,
  },
  {
    id: 17,
    parentId: 19,
    childId: 12,
  },
  {
    id: 18,
    parentId: 12,
    childId: 3,
  },
  {
    id: 19,
    parentId: 12,
    childId: 5,
  },
  {
    id: 20,
    parentId: 5,
    childId: 8,
  },
  {
    id: 21,
    parentId: 5,
    childId: 9,
  },
  {
    id: 22,
    parentId: 5,
    childId: 10,
  },
  {
    id: 23,
    parentId: 8,
    childId: 11,
  },
  {
    id: 24,
    parentId: 9,
    childId: 11,
  },
  {
    id: 25,
    parentId: 10,
    childId: 11,
  },
  {
    id: 26,
    parentId: 11,
    childId: 14,
  },
  {
    id: 27,
    parentId: 14,
    childId: 3,
  },
  {
    id: 28,
    parentId: 14,
    childId: 15,
  },
];
