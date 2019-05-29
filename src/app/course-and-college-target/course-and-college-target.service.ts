import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CollegeTarget} from '../entity/CollegeTarget';
import {Observable} from 'rxjs';
import {Result} from '../entity/Result';

@Injectable({
  providedIn: 'root'
})
export class CourseAndCollegeTargetService {

  constructor(private http: HttpClient) {
  }

  addCollegeTarget(collegeTargetList: Array<CollegeTarget>): Observable<Result> {
    return this.http.post<Result>('/collegeTarget/insert', collegeTargetList);
  }

  getTargetList(): Observable<Result> {
    return this.http.get<Result>('/collegeTarget/all');
  }

  getCollegeList(): Observable<Result> {
    return this.http.get<Result>('/college/all');
  }

  getRAbilityList(): Observable<Result> {
    return this.http.get<Result>('/rability/all');
  }

  getCourses(): Observable<Result> {
    return this.http.get<Result>('/course/findAllGroupByCollege');
  }

  downExcel(collegeId: number) {
    return this.http.get('/file/excel/courseAndCollege?collegeId=' + collegeId, {responseType: 'blob'});
  }

  getRelation(){
    return this.http.get<Result>('/courseAndCollege/getAll');
  }
}
