import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProductState, productAdapter } from './product.state';

export const PRODUCT_STATE = 'products';
const getProductState =
  createFeatureSelector<typeof IProductState>(PRODUCT_STATE);

const { selectAll } = productAdapter.getSelectors();

export const getCount = createSelector(getProductState, (state) => state.count);

export const getProducts = createSelector(getProductState, selectAll);
