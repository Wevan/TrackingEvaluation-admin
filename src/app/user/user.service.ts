import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../entity/Result';
import { StudentParam, TeacherParam } from '../entity/Params';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(type: String): Observable<Result> {
    return this.http.get<Result>(`/user/${type}/0`);
  }

  addStudent(studentParam: StudentParam): Observable<Result> {
    return this.http.post<Result>('/user/student', studentParam);
  }

  getClasses(): Observable<Result> {
    return this.http.get<Result>('/class/all');
  }

  getPosition(): Observable<Result> {
    return this.http.get<Result>('/positions');
  }

  downExcle() {
    return this.http.get('/file/excel/student', { responseType: 'blob' });
  }

  addTeacher(teacherParam: TeacherParam) {
    return this.http.post('/teacher', teacherParam);
  }

  getStudentProfile(studentId: number): Observable<Result> {
    return this.http.get<Result>(`/user/student/${studentId}`);
  }
}
