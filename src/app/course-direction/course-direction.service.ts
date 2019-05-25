import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {College} from '../entity/College';
import {Observable} from 'rxjs';
import {Result} from '../entity/Result';
import {CourseDirection} from '../entity/CourseDirection';

@Injectable({
  providedIn: 'root'
})
export class CourseDirectionService {

  constructor(private http: HttpClient) {
  }

  addCourseDirection(courseDirection: CourseDirection): Observable<Result> {
    return this.http.post<Result>('/courseDirect/insert', courseDirection);
  }

  getCollegeList(): Observable<Result> {
    return this.http.get<Result>('/college/all');
  }

  deleteOne(id: number): Observable<Result> {
    return this.http.delete<Result>('/college/delete/' + id);
  }

  modifyOne(college: College): Observable<Result> {
    return this.http.post<Result>('/college/insert', college);
  }

  getCourseDirectList(): Observable<Result> {
    return this.http.get<Result>('/courseDirect/all');
  }
}
