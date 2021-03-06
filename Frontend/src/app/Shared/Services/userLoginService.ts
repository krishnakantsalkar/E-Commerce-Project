import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IuserLogin } from "../Model/userLogin";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { IuserReg } from "../Model/usersRegistration";

@Injectable({ providedIn: "root" })
export class userLoginData {
  public userLoginApi: string = "http://localhost:4500/api/login/Logon";  // login API
  public getUsersApi: string = "http://localhost:4500/api/users/userById/";  // get user by id API
  public header: HttpHeaders;
  public currentUsers: Observable<IuserLogin>;
  private loggedIn: BehaviorSubject<IuserLogin>;
  public getUser: any;

  constructor(private http: HttpClient, private router: Router) {
    this.header = new HttpHeaders({ "Content-Type": "application/json" });
    this.loggedIn = new BehaviorSubject<IuserLogin>(
      JSON.parse(localStorage.getItem("currentUser"))  // to show nav items on user login implementation
    );
    this.currentUsers = this.loggedIn.asObservable();
  }

  Login(data: IuserLogin): Observable<IuserLogin> {   // login API consumption
    return this.http
      .post<IuserLogin>(this.userLoginApi, JSON.stringify(data), {
        headers: this.header
      })
      .pipe(
        map(item => {
          if (item && item.token) {
            localStorage.setItem("currentUser", JSON.stringify(item));  // save user and token in storage
            localStorage.setItem("currentToken", JSON.stringify(item.token));
            this.loggedIn.next(item);
            return item;
          }
          return item;
        })
      );
  }
  Logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentToken");
    localStorage.removeItem("product");        // logout method , remove ll stored items 
    localStorage.removeItem("product1");       // this is to facilitate multiple users 
    localStorage.removeItem("product2");
    localStorage.removeItem("product3");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("wishlist1");
    localStorage.removeItem("wishlist2");
    localStorage.removeItem("wishlist3");
    this.loggedIn.next(null);
    this.router.navigateByUrl("/Home");
  }

  //Post Login services (My Profile)
  myProfile(): Observable<IuserReg> {
    this.getUser = JSON.parse(localStorage.getItem("currentUser"));
    let sendReq = this.getUser.id;
    console.log(sendReq);
    return this.http.get<IuserReg>(this.getUsersApi + sendReq);
  }
}
