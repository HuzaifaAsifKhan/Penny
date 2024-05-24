import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addProduct } from 'src/app/product/store/product.action';
import { IAppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  productForm!: FormGroup;

  constructor(private store: Store<IAppState>) {
    this.productForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onAddProduct() {
    console.log('triggered');
    this.store.dispatch(addProduct({ product: this.productForm.value }));
    this.productForm.reset();
  }

  showErrors(formProperty: string): string {
    const controler: any = this.productForm.controls[formProperty];
    if ((controler.touched || controler.dirty) && controler.errors) {
      if (controler.errors['required']) {
        return `${formProperty} must required`;
      } else if (controler.errors['minlength']) {
        return `${formProperty} have Insufficient Length`;
      }
      return '';
    }
    return '';
  }
}
