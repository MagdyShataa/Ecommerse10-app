import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Productface } from "./productface";
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private productsUrl = "https://dummyjson.com/products";
  constructor(private http: HttpClient) {}
  // Fetch products from the API
  getProducts(): Observable<Productface[]> {
    return this.http
      .get<Productface[]>(this.productsUrl)
      .pipe(catchError(this.handleError<Productface[]>("getProducts", [])));
  }

  // Generic Error Handling (Improved)
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure (e.g., Sentry)
      console.error(`${operation} failed: ${error.message}`, error); // Log to console

      // You might want to handle errors differently based on the operation
      if (error.status === 404) {
        // Handle 404 Not Found errors
        return throwError(() => new Error(`${operation} not found`));
      } else {
        // Default error handling
        return throwError(
          () => new Error(`${operation} failed: ${error.message}`)
        );
      }
    };
  }

  getProduct(id: number): Observable<Productface> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Productface>(url).pipe(
      tap((product) => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Productface>(`getProduct id=${id}`))
    );
  }

  public productList$ = new BehaviorSubject<any>(0);
  items: Productface[] = [];

  addToCart(product: Productface) {
    this.items.push(product);
    this.productList$.next(this.items);
  }
  products() {
    return this.productList$.asObservable();
  }
  getItems() {
    return this.items;
  }

  removeFromCart(product: Productface) {
    const index = this.items.indexOf(product);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  //total
  totalPrice(): number {
    let total = 0;
    this.items.forEach((item) => {
      total += item.price;
    });
    return total;
  }

 

  getShippingPrices() {
    return this.http.get<{ type: string; price: number }[]>(
      "/assets/shipping.json"
    );
  }
}
