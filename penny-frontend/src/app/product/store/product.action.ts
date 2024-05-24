import { createAction, props } from '@ngrx/store';
import { IProduct } from './product.state';

// Add
export const addProduct = createAction(
  'addProduct',
  props<{ product: IProduct }>()
);
export const addProductSuccess = createAction(
  'addProductSuccess',
  props<{ product: IProduct }>()
);
// Delete
export const deleteProduct = createAction(
  'deleteProduct',
  props<{ id: string }>()
);
export const deleteProductSuccess = createAction(
  'deleteProductSuccess',
  props<{ id: string }>()
);
// Load
export const loadProductStart = createAction('loadProductStart');
export const loadProductSuccess = createAction(
  'loadProductSuccess',
  props<{ products: IProduct[] }>()
);
