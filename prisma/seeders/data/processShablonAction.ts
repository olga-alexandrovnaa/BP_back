import { ProcessShablonAction } from '@prisma/client';

export const ProcessShablonActions: ProcessShablonAction[] = [
  {
    id: 1,
    processShablonId: 1,
    name: 'начало',
    type: 'START',
  },
  {
    id: 2,
    processShablonId: 1,
    name: 'чертеж, заполнение параметров',
    type: 'ACTION',
  },
  {
    id: 3,
    processShablonId: 1,
    name: 'заполнение тех. процесса',
    type: 'ACTION',
  },
  {
    id: 4,
    processShablonId: 1,
    name: 'есть ли замечания по чертежу или параметрам?',
    type: 'CHOICE',
  },
  {
    id: 5,
    processShablonId: 1,
    name: 'начало согласований администрацией',
    type: 'PROPOGATION',
  },
  {
    id: 8,
    processShablonId: 1,
    name: 'согласование представит. адм. 1',
    type: 'ACTION',
  },
  {
    id: 9,
    processShablonId: 1,
    name: 'согласование представит. адм. 2',
    type: 'ACTION',
  },
  {
    id: 10,
    processShablonId: 1,
    name: 'согласование представит. адм. 3',
    type: 'ACTION',
  },
  {
    id: 11,
    processShablonId: 1,
    name: 'конец согласований администрацией',
    type: 'WAITING_ALL',
  },
  {
    id: 6,
    processShablonId: 1,
    name: 'согласование рук. ТО',
    type: 'ACTION',
  },
  {
    id: 7,
    processShablonId: 1,
    name: 'согласование рук. КО',
    type: 'ACTION',
  },
  {
    id: 12,
    processShablonId: 1,
    name: 'согласовано рук. ТО?',
    type: 'CHOICE',
  },
  {
    id: 13,
    processShablonId: 1,
    name: 'согласовано рук. КО?',
    type: 'CHOICE',
  },
  {
    id: 14,
    processShablonId: 1,
    name: 'согласовано администрацией',
    type: 'CHOICE',
  },
  {
    id: 15,
    processShablonId: 1,
    name: 'конец',
    type: 'END',
  },
  {
    id: 16,
    processShablonId: 1,
    name: 'согласование зам. рук. ТО',
    type: 'ACTION',
  },
  {
    id: 18,
    processShablonId: 1,
    name: 'начало согласований TO',
    type: 'PROPOGATION',
  },
  {
    id: 19,
    processShablonId: 1,
    name: 'конец согласований TO',
    type: 'WAITING_ONE',
  },
  {
    id: 20,
    processShablonId: 1,
    name: 'начало согласований КO',
    type: 'PROPOGATION',
  },
  {
    id: 21,
    processShablonId: 1,
    name: 'конец согласований КO',
    type: 'WAITING_ONE',
  },
  {
    id: 17,
    processShablonId: 1,
    name: 'согласование зам. рук. КО',
    type: 'ACTION',
  },
];