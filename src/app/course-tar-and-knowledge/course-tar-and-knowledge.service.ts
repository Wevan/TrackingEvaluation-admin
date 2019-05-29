import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CollegeTarget} from '../entity/CollegeTarget';
import {Observable} from 'rxjs';
import {Result} from '../entity/Result';

@Injectable({
  providedIn: 'root'
})
export class CourseTarAndKnowledgeService {

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

  getCourses(collegeId: number): Observable<Result> {
    return this.http.get<Result>('/course/findAllByCollegeId?collegeId=' + collegeId);
  }

  downExcel(courseId: number) {
    return this.http.get('/file/excel/courseTarAndKnowledge?courseId=' + courseId, {responseType: 'blob'});
  }

  getRelation() {
    return this.http.get<Result>('/courseTarAndKnowledge/getAll');
  }
}
