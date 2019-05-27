import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseTarget} from '../entity/CourseTarget';
import {Observable} from 'rxjs';
import {Result} from '../entity/Result';
import {GlobalWay} from '../entity/GlobalWay';
import {DailyWay} from '../entity/DailyWay';

@Injectable({
  providedIn: 'root'
})
export class WaysService {

  constructor(private http: HttpClient) {
  }

  addGlobalWays(globalWays: Array<GlobalWay>): Observable<Result> {
    return this.http.post<Result>('/globalWay/insert', globalWays);
  }

  addDailyWays(dailyWays: Array<DailyWay>): Observable<Result> {
    return this.http.post<Result>('/dailyWay/insert', dailyWays);
  }

  getGlobalWayList(): Observable<Result> {
    return this.http.get<Result>('/globalWay/getAll');
  }

  getDailyWayList(): Observable<Result> {
    return this.http.get<Result>('/dailyWay/getAll');
  }

  getCourseList(collegeId: number): Observable<Result> {
    return this.http.get<Result>('/course/findAllByCollegeId?collegeId=' + collegeId);
  }

  getCollegeList(): Observable<Result> {
    return this.http.get<Result>('/college/all');
  }
}
