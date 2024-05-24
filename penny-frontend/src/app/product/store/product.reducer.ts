import { createReducer, on } from '@ngrx/store';
import { IProductState, productAdapter } from './product.state';
import {
  addProductSuccess,
  deleteProductSuccess,
  loadProductSuccess,
} from './product.action';

export const productReducer = createReducer(
  IProductState,
  on(addProductSuccess, (state, action) => {
    return productAdapter.addOne(action.product, {
      ...state,
      count: state.count + 1,
    });
  }),
  on(deleteProductSuccess, (state, action) => {
    return productAdapter.removeOne(action.id, {
      ...state,
      count: state.count - 1,
    });
  }),
  on(loadProductSuccess, (state, action) => {
    return productAdapter.setAll(action.products, {
      ...state,
      count: action.products.length,
    });
  })
);
