import {Injectable} from "@angular/core";
import {JwtService} from "./jwt.service";
import {ApiService} from "./api.service";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";

@Injectable()
export class UserService {

    private signoutEdnpoint = "/signout";
    private loginEndPoint = "/login";
    private registerEndpoint = "/register";
    
    private hrEndpoint = "/hr";
    private userEndpoint = "/";
    private currentUserSubject = new BehaviorSubject<User>(new User());
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!this.jwtService.getToken());
    private isAuthenticatedHr = new BehaviorSubject<boolean>(!!localStorage.getItem("hremail"));
     
    constructor(private apiService: ApiService,
                private jwtService: JwtService) {
    }

    // Verify JWT in local storage with server & load user's info.
    // This runs once on application startup.
    populate() {
        // If JWT detected, attempt to get & store user's info
        if (this.jwtService.getToken()) {
            if(!!localStorage.getItem('email')){
                this.apiService.get(this.userEndpoint)
                .subscribe(
                    res => {
                    this.setAuth(res.data)},
                    err => {
                        this.purgeAuth();});
            }       
            else if(!!localStorage.getItem('hremail')){
                this.apiService.get(this.hrEndpoint)
                .subscribe(
                    res => {
                    this.setAuth(res.data)},
                    err => {
                        this.purgeAuth();});
            }
            else{
                this.purgeAuth();
            }   
        } else {
            this.purgeAuth();
        }
    }

    login(credentials: User) {
        return this.apiService.post(this.loginEndPoint, credentials)
            .map(res => {
                this.setAuth(res);
                console.log(res);
                return res;
            });
    }

    public setAuth(user: User) {
        //save token into local storage
        console.log(user);
        this.jwtService.saveToken(user.token);

        //set current user into observable
        this.currentUserSubject.next(user);
        if(user.isHr){
            this.isAuthenticatedHr.next(true);
            localStorage.setItem('hremail',user.email);
        
        }
        else{
            localStorage.setItem('email', user.email);
            this.isAuthenticatedSubject.next(true);
        }
        
        //localStorage.setItem('user', JSON.stringify(user));
        

    }

    public register(user: User) {
        return this.apiService.post(this.registerEndpoint, user)
            .map(data => {
                return data.data;
            },err=>console.log("Error"));
    }

    public purgeAuth() {
        console.log('purging auth');
        //delete token from into local storage
  /**      this.apiService.post(this.signoutEdnpoint, {email: this.currentUserSubject.getValue().email})
            .map(data => data.json());*/
        this.jwtService.destroyToken();

        //set current user into empty object
        this.currentUserSubject.next(new User());
        localStorage.clear();
        this.isAuthenticatedSubject.next(false);
        this.isAuthenticatedHr.next(false);
    }


    public isLoggedIn(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }

     public isHrLoggedIn(): Observable<boolean> {
         return this.isAuthenticatedHr.asObservable();
    }
    
    getCurrentUser(): Observable<User> {
        return this.currentUserSubject.asObservable();
    }

    public update(user): Observable<User> {
        console.log(user);
        if(!user.isHr){
            return this.apiService
            .put('/', user)
            .map(data => {
            // Update the currentUser observable
            this.currentUserSubject.next(data.data);
            return data.data;
            });
        }
        else{
            return this.apiService
            .put('/hr', user)
            .map(data => {
            // Update the currentUser observable
            this.currentUserSubject.next(data.data);
            return data.data;
            });
        }
  }
}
