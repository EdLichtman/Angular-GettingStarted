import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges, SimpleChange } from "@angular/core";
import { IProduct } from './product';
import { JsonPipe } from '@angular/common';
import { ProductService } from './product.service';
import { nameof } from 'src/common/nameof';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: `./product-list.component.html`,
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges, OnDestroy {
    pageTitle: string = `Product List`;
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;

    subscriptions: {[propertyName: string]: Subscription} = {};

    private _listFilter: string;
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value:string) {
      this._listFilter = value;
      this.filterProducts();
    }

    filteredProducts: IProduct[];
    products: IProduct[];

      constructor(private productService: ProductService) {
      }

      toggleImage(): void {
        this.showImage = !this.showImage;
      }
      ngOnInit(): void {
        var productsSubcriptionName = nameof<ProductListComponent>('products');
        this.subscriptions[productsSubcriptionName] = this.productService
          .getProducts().subscribe({
            next: products => {
              this.products = products;
              this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
          });
              
        this.listFilter = '';
      }
      ngOnChanges(changes: SimpleChanges): void {
        console.log("In OnChanges.")
        console.log(JSON.stringify(SimpleChange));
      }
      ngOnDestroy(): void {
        console.log("In OnDestroy.")
      }

      onRatingClicked(message: string): void {
        this.pageTitle = `Product List: ${message}`
      }
      private filterProducts(): void {
        this.filteredProducts = this.listFilter
          ? this.performFilter(this.listFilter) 
          : this.products;
      }
      private performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
      }
}