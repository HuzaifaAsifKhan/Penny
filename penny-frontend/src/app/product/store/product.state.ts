import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface IProduct {
  id: string;
  title: string;
  description: string;
}

export interface IProductEntity extends EntityState<IProduct> {
  count: number;
}

export const productAdapter = createEntityAdapter<IProduct>({
  sortComparer: sortByName,
});
export const IProductState: IProductEntity = productAdapter.getInitialState({
  count: 0,
});

export function sortByName(a: IProduct, b: IProduct): number {
  return a.title.localeCompare(b.title);
}
