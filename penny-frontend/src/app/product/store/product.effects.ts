import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../services/product.service';
import {
  addProduct,
  addProductSuccess,
  deleteProduct,
  deleteProductSuccess,
  loadProductStart,
  loadProductSuccess,
} from './product.action';
import { map, mergeMap, of, withLatestFrom } from 'rxjs';
import { IProduct } from './product.state';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { getProducts } from './product.selector';

@Injectable()
export class ProductEffects {
  constructor(
    private store: Store<IAppState>,
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductStart),
      withLatestFrom(this.store.select(getProducts)),
      mergeMap(([action, products]) => {
        // Start Loader if you want to
        if (!products.length) {
          return this.productService.getPosts().pipe(
            map((products: IProduct[]) => {
              // stop your loader
              return loadProductSuccess({ products });
            })
          );
        } else {
          // no Length Message and stop loader
          return of();
        }
      })
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      mergeMap((action: any) => {
        console.log('Effect triggered');
        return this.productService.addProduct(action.product).pipe(
          map((resp) => {
            console.log(resp, 'Resp from Db to add in Array');
            const product = { ...action.product, id: resp.id };
            return addProductSuccess({ product });
          })
        );
      })
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      mergeMap((action) => {
        return this.productService.deleteProduct(action.id).pipe(
          map((resp) => {
            return deleteProductSuccess({ id: action.id });
          })
        );
      })
    )
  );
}
