import { Component, inject } from "@angular/core";
import { Productface } from "../productface";
import { ProductsService } from "../products.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Route, Router } from "@angular/router";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.css",
})
export class ProductListComponent {
  constructor(private configService: ProductsService) {}
  isLoading = false; // Add a loading state
  productsList: Productface | any;

  // private productsService = inject(ProductsService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router); // Inject the router

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList(): void {
    this.isLoading = true; // Set loading state
    this.configService.getProducts().subscribe({
      next: (res) => {
        this.productsList = res;
        this.isLoading = false; // Clear loading state
        console.log(this.productsList);
      },
      error: (err) => {
        console.error("Error fetching products:", err);
        this.showErrorMessage(
          "Failed to load products. Please try again later."
        );
        this.isLoading = false; // Clear loading state
      },
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 5000, // Duration in milliseconds
    });
  }
}
