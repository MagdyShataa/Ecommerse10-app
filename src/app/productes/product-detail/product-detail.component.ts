import { Component, inject } from "@angular/core";
import { Productface } from "../productface";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ProductsService } from "../products.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrl: "./product-detail.component.css",
})
export class ProductDetailComponent {
  // Initial product number
  productNumber: number | any = 0;
  private productNumberSource = new BehaviorSubject<number>(0); // Start with 0 items

  productDetail$!: Observable<Productface>; // Better type annotation
  private snackBar = inject(MatSnackBar);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}
  ngOnInit() {
    this.productDetail$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = Number(params.get("id"));
        return this.productsService.getProduct(id);
      })
    );
  }

  goBack(): void {
    this.router.navigate(["/procuts"]);
  }

  addToCart(product: Productface) {
    this.productsService.addToCart(product);
    this.productsService.products().subscribe((res) => {
      this.productNumber = res.length;
      console.log(res.length);
    }),
      // window.alert("Your product has been added to the cart! ");t
      this.snackBar.open("Product added to cart", "Close", {
        duration: 6000,
      });
  }

  removeFromCart(product: Productface) {
    this.productsService.clearCart(); // Remove from cart via the service
    alert("Product removed from cart.");
    this.productNumber--;
    // Consider using a more user-friendly notification
  }
}
