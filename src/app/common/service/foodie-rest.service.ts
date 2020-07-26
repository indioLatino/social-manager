import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodieRestService {
  // todo: Use environment variable instead
  // todo: split this service in several services by functionality
  readonly endpoint = 'http://localhost:1234/item/';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    console.log('foodie service running');
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  // todo: implement the limit and the offset
  getItems(creatorId: string): Observable<any> {
    return this.http.get(this.endpoint + 'get?creatorId=' + creatorId).pipe(
      map(this.extractData));
  }

  getItemDetail(id): Observable<any> {
    return this.http.get(this.endpoint + 'detail?id=' + id).pipe(
      map(this.extractData));
  }

  addItem(item): Observable<any> {
    console.log(item);
    return this.http.post<any>(this.endpoint + 'create', JSON.stringify(item), this.httpOptions).pipe(
      tap((item) => console.log(`added item w/ id=${item.id}`)),
      catchError(this.handleError<any>('addItem'))
    );
  }

  updateItem(id, item): Observable<any> {
    // todo: When the item is sent print it
    return this.http.put(this.endpoint + 'update?id=' + id, JSON.stringify(item), this.httpOptions).pipe(
      tap(_ => console.log(`updated item id=${id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  deleteItem(id): Observable<any> {
    return this.http.delete<any>(this.endpoint + 'delete?id=' + id, this.httpOptions).pipe(
      tap(_ => console.log(`deleted item id=${id}`)),
      catchError(this.handleError<any>('deleteItem'))
    );
  }

  getProducts(): Observable<any> {
    // Todo: use variable for the url
    return this.http.get('http://localhost:1234/product/products', this.httpOptions).pipe(
      map(this.extractData)
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // todo: bring from the db
  getMeasurements() {
    return [
      {
        'code': '001',
        'translations': {
          'en-GB': 'Litre',
          'es-ES': 'Leche',
          'fr-FR': 'Litre'
        }
      },
      {
        'code': '002',
        'translations': {
          'en-GB': 'Kilogram',
          'es-ES': 'Kilogramo',
          'fr-FR': 'Kilogramme'
        }
      },
      {
        'code': '003',
        'translations': {
          'en-GB': 'Pound',
          'es-ES': 'Libra',
          'fr-FR': 'Livre'
        }
      },
      {
        'code': '004',
        'translations': {
          'en-GB': 'Cup',
          'es-ES': 'Taza',
          'fr-FR': 'Coupe'
        }
      },
      {
        'code': '005',
        'translations': {
          'en-GB': 'Ounce',
          'es-ES': 'Onza',
          'fr-FR': 'Once'
        }
      },
      {
        'code': '006',
        'translations': {
          'en-GB': 'Gram',
          'es-ES': 'Gramo',
          'fr-FR': 'Gramme'
        }
      },
      {
        'code': '007',
        'translations': {
          'en-GB': 'Milk',
          'es-ES': 'Cucharilla',
          'fr-FR': 'cuillère à café'
        }
      },
      {
        'code': '008',
        'translations': {
          'en-GB': 'Unit',
          'es-ES': 'Unidad',
          'fr-FR': 'Unité'
        }
      },
      {
        'code': '009',
        'translations': {
          'en-GB': 'Mililitres',
          'es-ES': 'Mililitros',
          'fr-FR': 'millilitre'
        }
      }
    ];
  }
}
