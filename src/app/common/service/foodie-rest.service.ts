import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodieRestService {
  //todo: Use environment variable instead
  readonly endpoint = 'http://localhost:1234/item/';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  getItems(): Observable<any> {
  return this.http.get(this.endpoint + 'get').pipe(
    map(this.extractData));
}

getItemDetail(id): Observable<any> {
  return this.http.get(this.endpoint + 'detail?id=' + id).pipe(
    map(this.extractData));
}

addItem (item): Observable<any> {
  console.log(item);
  return this.http.post<any>(this.endpoint + 'create', JSON.stringify(item), this.httpOptions).pipe(
    tap((item) => console.log(`added item w/ id=${item.id}`)),
    catchError(this.handleError<any>('addItem'))
  );
}

updateItem (id, item): Observable<any> {
  return this.http.put(this.endpoint + 'update?id=' + id, JSON.stringify(item), this.httpOptions).pipe(
    tap(_ => console.log(`updated item id=${id}`)),
    catchError(this.handleError<any>('updateItem'))
  );
}

deleteItem (id): Observable<any> {
  return this.http.delete<any>(this.endpoint + 'delete?id=' + id, this.httpOptions).pipe(
    tap(_ => console.log(`deleted item id=${id}`)),
    catchError(this.handleError<any>('deleteItem'))
  );
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
