import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Result} from '../entity/Result';
import {College} from '../entity/College';
import {Observable} from 'rxjs';

@Injectable()
export class CollegeService {

  constructor(private http: HttpClient) {
  }

  addCollege(college: College): Observable<Result> {
    console.log('college');
    return this.http.post<Result>('/college/insert', college);
  }

  getList(): Observable<Result> {
    return this.http.get<Result>('/college/all');
  }

  deleteOne(id: number): Observable<Result> {
    return this.http.delete<Result>('/college/delete/' + id);
  }

  modifyOne(college: College): Observable<Result> {
    return this.http.post<Result>('/college/insert', college);
  }
}
