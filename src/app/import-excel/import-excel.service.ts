import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImportExcelService {

  constructor(private http: HttpClient) {
  }

  /**
   * excel批量导入
   */
  upload(formData: FormData): Observable<any> {
    const header = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzd' +
        'WIiOiIxNTE0MDEwMzExIiwidXNlcklkIjoxNTU2LCJpYXQiOjE1NDgzMzQ1MTMsImV4cCI6MTU0ODkzOTMxM30.NbdXQldaW5Nh2xoaqvNwNBEit6Y0p6t30V6hLYLbGGg'
    });

    const req = new HttpRequest('POST', '/upload/excel', formData, {

      headers: header
    });
    return this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse));
  }
}
