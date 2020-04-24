import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges, SimpleChange } from "@angular/core";
import { IProduct } from './product';
import { JsonPipe } from '@angular/common';
import { ProductService } from './product.service';

@Component({
    selector: `pm-products`,
    templateUrl: `./product-list.component.html`,
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges, OnDestroy {
    pageTitle: string = `Product List`;
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
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
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
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