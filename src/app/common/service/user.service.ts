import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';
import {CognitoAccessToken, CognitoIdToken, CognitoRefreshToken, CognitoUserSession} from 'amazon-cognito-identity-js';
import {FoodieUser} from '../../model/foodie-user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // todo: Use environment variable instead
  readonly endpoint = 'http://localhost:1234/user/';
  // Session shared data
  private userSessionSource = new BehaviorSubject<string>(null);
  public userSession = this.userSessionSource.asObservable();
  private foodieUserLoaded: Boolean = true;
  // User shared data
  private userDataSource = new BehaviorSubject<FoodieUser>(new FoodieUser());
  public userData = this.userDataSource.asObservable();
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.userData.subscribe((user) => {
      this.foodieUserLoaded = !this.foodieUserLoaded;
    });
  }

  public initializeSession(): void {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !this.foodieUserLoaded) {
      this.updateSession(accessToken);
    }
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  public updateUserData(foodieUser: FoodieUser) {
    this.userDataSource.next(foodieUser);
  }

  public updateSession(accessToken: string) {
    this.userSessionSource.next(accessToken);
    localStorage.setItem('accessToken', accessToken);
    this.getUserDetailFromToken(accessToken).subscribe((authenticatedUser: FoodieUser) => {
      this.updateUserData(authenticatedUser);
    });
  }

  getUserDetailFromToken(accessToken: string): Observable<any> {
    console.log('getUserDetailFromToken method executed');
    return this.http.post<any>(this.endpoint + 'detail-by-token', {'accessToken': accessToken}, this.httpOptions);
  }

  // todo: secure this endpoint in the backend and add the accessToken to the request
  updateFoodieUser(user: FoodieUser) {
    console.log('updateFoodieUser method executed');
    return this.http.put<any>(this.endpoint + 'update?id=' + user._id, user, this.httpOptions);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
