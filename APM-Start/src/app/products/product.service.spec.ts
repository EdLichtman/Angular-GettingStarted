import { TestBed, async, inject } from '@angular/core/testing';

import { ProductService } from './product.service';
import { IProduct } from './product';
import { Observable, Subject } from 'rxjs';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService]
    });
  });

  it('should filter products by id', inject([ProductService], (service: ProductService) => {
    service.getProduct(1).subscribe({
      next: product => expect(product.productName).toEqual('Leaf Rake')
    })
  }));

  it('should expect different products by id', inject([ProductService], (service: ProductService) => {
    let product1: Subject<IProduct>;
    let product2: Subject<IProduct>;
    service.getProduct(1).subscribe({
      next: product => product1.next(product)
    })
    service.getProduct(2).subscribe({
      next: product => product2.next(product)
    })

    /* Not sure how to combine 2 observables yet either. bet not to go down this rabbit hole until end of course.*/
  }));

  //I don't know how to mock yet, so instead of going down a rabbit hole I'm finishing the course with integration tests
});
