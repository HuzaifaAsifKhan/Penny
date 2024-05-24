import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { IProduct } from '../store/product.state';
import { ApiService } from 'src/app/core/services';

@Injectable()
export class ProductService {
  constructor(private apiService: ApiService) {}

  getPosts = (): Observable<IProduct[]> => {
    return this.apiService.get(`${environment.api_url}/product`);
    // .pipe(
    //   map((data) => {
    //     const posts: IProduct[] = [];
    //     for (let key in data) {
    //       posts.push({ ...data[key] });
    //     }
    //     return posts;
    //   })
    // );
  };

  addProduct = (product: IProduct): Observable<any> => {
    return this.apiService.post(`${environment.api_url}/product`, product);
  };

  deleteProduct = (id: string): Observable<any> => {
    return this.apiService.delete(`${environment.api_url}/product/${id}`);
  };
}
