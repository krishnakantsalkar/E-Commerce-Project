import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { productsData } from "../../../Shared/Services/productsServices";
import { Iproducts } from "../../../Shared/Model/products";
// import { IfileUploads } from "../../../Shared/Model/fileUploads";
import { WOW } from "wowjs/dist/wow.min"; //Enable WOW animations

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  public arrivedProducts: Iproducts[];
  public arrivedProducts1: Iproducts[];
  public arrivedProducts2: Iproducts[];
  public arrivedProducts3: Iproducts[];
  public searchText;
  public allProducts: Array<{}>;
  // public add: boolean = false;
  public cartStuff: any[] = [];
  public cartStuff1: any[] = [];
  public cartStuff2: any[] = [];
  public cartStuff3: any[] = [];

  public grid: boolean = false;
  // public arrivedFiles: IfileUploads;

  choice = 1;

  constructor(private products: productsData) {}

  ngOnInit() {
    new WOW({ live: false }).init(); //enable WOW animations

    this.products.listProducts().subscribe(data => {
      this.arrivedProducts = data;
      console.log(data);
    });
    this.products.listProducts1().subscribe(data => {
      this.arrivedProducts1 = data;
      console.log(data);
    });
    this.products.listProducts2().subscribe(data => {
      this.arrivedProducts2 = data;
      console.log(data);
    });
    this.products.listProducts3().subscribe(data => {
      this.arrivedProducts3 = data;
      console.log(data);
    });
    // this.products.getImage1().subscribe(data => {
    //   this.arrivedFiles = data;
    // });
  }
  setChoice(choice) {
    this.choice = choice;
  }

  getallProds() {
    this.allProducts = [
      this.arrivedProducts,
      this.arrivedProducts1,
      this.arrivedProducts2,
      this.arrivedProducts3
    ];
    console.log(this.allProducts);
  }
  addtoCart(id) {
    this.products.cartProduct(id).subscribe(item => {
      console.log(item);
      this.cartStuff.push(item);
      console.log(this.cartStuff);
      localStorage.setItem("product", JSON.stringify(this.cartStuff));
      if (this.cartStuff.length === 3) {
        alert("You can add only 3 products in cart at a time!");
        location.reload();
      }
    });
  }

  addtoCart1(id) {
    this.products.cartProduct1(id).subscribe(item => {
      console.log(item);
      this.cartStuff1.push(item);
      console.log(this.cartStuff1);
      localStorage.setItem("product1", JSON.stringify(this.cartStuff1));
      if (this.cartStuff1.length === 3) {
        alert("You can add only 3 products in cart at a time!");
        location.reload();
      }
    });
  }

  addtoCart2(id) {
    this.products.cartProduct2(id).subscribe(item => {
      console.log(item);
      this.cartStuff2.push(item);
      console.log(this.cartStuff2);
      localStorage.setItem("product2", JSON.stringify(this.cartStuff2));
      if (this.cartStuff2.length === 3) {
        alert("You can add only 3 products in cart at a time!");
        location.reload();
      }
    });
  }

  addtoCart3(id) {
    this.products.cartProduct3(id).subscribe(item => {
      console.log(item);
      this.cartStuff3.push(item);
      console.log(this.cartStuff3);
      localStorage.setItem("product3", JSON.stringify(this.cartStuff3));
      if (this.cartStuff3.length === 3) {
        alert("You can add only 3 products in cart at a time!");
        location.reload();
      }
    });
  }
  // added() {
  //   this.add = !this.add;
  // }

  list() {
    this.grid = !this.grid;
  }
}
