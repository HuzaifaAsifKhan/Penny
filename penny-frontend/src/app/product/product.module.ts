import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productReducer } from './store/product.reducer';
import { StoreModule } from '@ngrx/store';
import { PRODUCT_STATE } from './store/product.selector';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductService } from './services/product.service';
import { AddProductComponent } from './components/add-product/add-product.component';

import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product.effects';

@NgModule({
  declarations: [ProductComponent, AddProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ProductEffects]),
    StoreModule.forFeature(PRODUCT_STATE, productReducer),
  ],
  providers: [ProductService],
})
export class ProductModule {}
