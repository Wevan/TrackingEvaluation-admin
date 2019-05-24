import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Result} from '../entity/Result';
import {Direction} from '../entity/Direction';
import {DirectionEntity} from '../entity/DirectionEntity';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  constructor(private http: HttpClient) {
  }

  addDirection(direction: DirectionEntity): Observable<Result> {
    return this.http.post<Result>('/direction/insert', direction);
  }

  getList(): Observable<Result> {
    return this.http.get<Result>('/direction/all');
  }

  deleteOne(id: number): Observable<Result> {
    return this.http.delete<Result>('/direction/delete/' + id);
  }

  modifyOne(direction: Direction): Observable<Result> {
    return this.http.post<Result>('/direction/insert', direction);
  }
  getCollegeList(): Observable<Result> {
    return this.http.get<Result>('/college/all');
  }
}
