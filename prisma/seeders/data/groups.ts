import { Group } from '@prisma/client';

export const Groups: Group[] = [
  {
    id: 2,
    name: 'КО',
    parentId: null,
  },
  {
    id: 5,
    name: 'ТО',
    parentId: null,
  },
  {
    id: 8,
    name: 'администрация',
    parentId: null,
  },
  {
    id: 3,
    name: 'рук. КО',
    parentId: 2,
  },
  {
    id: 4,
    name: 'сотр. КО',
    parentId: 2,
  },
  {
    id: 6,
    name: 'рук. ТО',
    parentId: 5,
  },
  {
    id: 7,
    name: 'сотр. ТО',
    parentId: 5,
  },
  {
    id: 9,
    name: 'зам. рук. КО',
    parentId: 2,
  },
  {
    id: 10,
    name: 'зам. рук. ТО',
    parentId: 5,
  },
];
