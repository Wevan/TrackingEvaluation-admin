import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../entity/Result';
import { Observable } from 'rxjs';

@Injectable()
export class ClassManagerService {
  constructor(private http: HttpClient) {}

  /**
   * 获取所有的班级
   */
  getAllClass(): Observable<Result> {
    return this.http.get<Result>(`/class/all`);
  }

  addClass(className: string): Observable<Result> {
    return this.http.post<Result>(`/class/add`, className);
  }

  search(name: String): Observable<Result> {
    return this.http.get<Result>(`/class/search/${name}`);
  }
}
