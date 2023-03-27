import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage!: boolean;

  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params['categoryid']
        ? this._getProducts([params['categoryid']])
        : this._getProducts();
      params['categoryid']
        ? (this.isCategoryPage = true)
        : (this.isCategoryPage = false);
    });
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.prodService.getProducts(categoriesFilter).subscribe((resProducts) => {
      console.log(resProducts);
      this.products = resProducts;
    });
  }

  private _getCategories() {
    this.catService.getCategories().subscribe((resCats) => {
      console.log(resCats);
      this.categories = resCats;
    });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category._id);
    console.log(selectedCategories);

    this._getProducts(selectedCategories as string[]);
  }
}
