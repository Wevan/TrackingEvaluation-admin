import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Result} from '../entity/Result';
import {CollegeTarget} from '../entity/CollegeTarget';

@Injectable({
  providedIn: 'root'
})
export class CollegeTargetService {

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

}
