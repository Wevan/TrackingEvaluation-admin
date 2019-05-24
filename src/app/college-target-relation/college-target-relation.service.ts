import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CollegeTarget} from '../entity/CollegeTarget';
import {Observable} from 'rxjs';
import {Result} from '../entity/Result';

@Injectable({
  providedIn: 'root'
})
export class CollegeTargetRelationService {

  constructor(private http: HttpClient) {
  }

  addCollegeAndAbility(collegeTargetList: Array<CollegeTarget>): Observable<Result> {
    return this.http.post<Result>('/collegeAndability/insertAll', collegeTargetList);
  }

  getAbilityTargetList(): Observable<Result> {
    return this.http.get<Result>('/collegeAndability/getAll');
  }

  getTargetList(collegeId: number): Observable<Result> {
    return this.http.get<Result>('/collegeTarget/getByCollegeId?collegeId=' + collegeId);
  }

  getCollegeList(): Observable<Result> {
    return this.http.get<Result>('/college/all');
  }

  getRAbilityList(collegeId: number): Observable<Result> {
    return this.http.get<Result>('/rability/findByCollegeId?collegeId=' + collegeId);
  }

}
