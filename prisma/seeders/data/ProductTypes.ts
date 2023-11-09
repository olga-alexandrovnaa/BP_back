import { ProductType } from '@prisma/client';

export const ProductTypes: ProductType[] = [
  {
    id: 1,
    name: 'стандартное',
    measureUnitId: 1,
    parentTypeId: null,
  },
];
