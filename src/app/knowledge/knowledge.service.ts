import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Result} from '../entity/Result';
import {HttpClient} from '@angular/common/http';
import {CourseTarget} from '../entity/CourseTarget';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {

  constructor(private http: HttpClient) {
  }

  addKnowledges(knowledgeList: Array<CourseTarget>): Observable<Result> {
    return this.http.post<Result>('/knowledge/insertAll', knowledgeList);
  }

  getKnowledge(): Observable<Result> {
    return this.http.get<Result>('/knowledge/findAll');
  }
  getCourseList(collegeId: number): Observable<Result> {
    return this.http.get<Result>('/course/findAllByCollegeId?collegeId=' + collegeId);
  }

  getCollegeList(): Observable<Result> {
    return this.http.get<Result>('/college/all');
  }

}
