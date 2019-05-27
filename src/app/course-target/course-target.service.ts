import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CollegeTarget} from '../entity/CollegeTarget';
import {Observable} from 'rxjs';
import {Result} from '../entity/Result';
import {CourseTarget} from '../entity/CourseTarget';

@Injectable({
  providedIn: 'root'
})
export class CourseTargetService {


  constructor(private http: HttpClient) {
  }

  addCollegeTarget(collegeTargetList: Array<CourseTarget>): Observable<Result> {
    return this.http.post<Result>('/courseTarget/insert', collegeTargetList);
  }

  getTargetList(): Observable<Result> {
    return this.http.get<Result>('/courseTarget/all');
  }

  getCollegeList(): Observable<Result> {
    return this.http.get<Result>('/college/all');
  }

  getCourseList(collegeId: number): Observable<Result> {
    return this.http.get<Result>('/course/findAllByCollegeId?collegeId=' + collegeId);
  }

  getRAbilityList(): Observable<Result> {
    return this.http.get<Result>('/rability/all');
  }

}
