import { Component } from '@angular/core';
import { IProduct } from './store/product.state';
import { Store } from '@ngrx/store';
import { getCount, getProducts } from './store/product.selector';
import { Observable } from 'rxjs';
import { IAppState } from '../store/app.state';
import { deleteProduct, loadProductStart } from './store/product.action';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  products$!: Observable<IProduct[]>;
  count$!: Observable<number>;
  constructor(private store: Store<IAppState>) {
    this.products$ = this.store.select(getProducts);
    this.count$ = this.store.select(getCount);
    this.store.dispatch(loadProductStart());
  }
  deleteProduct(id: string) {
    if (confirm('Are you sure!')) this.store.dispatch(deleteProduct({ id }));
  }
}
