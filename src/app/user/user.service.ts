import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../entity/Result';
import { StudentParam, TeacherParam, TeacherRoleParam } from '../entity/Params';

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

  getTeacherProfile(teacherId: number): Observable<Result> {
    return this.http.get<Result>(`/user/profile/teacher/${teacherId}`);
  }

  updateTeacherInfo(
    teacherId: number,
    teacherParam: TeacherParam,
  ): Observable<Result> {
    return this.http.put<Result>(`/teacher/${teacherId}`, teacherParam);
  }

  /**
   * 获得所有的教师角色信息
   */
  getTeacherRole(): Observable<Result> {
    return this.http.get<Result>(`/teacher/role`);
  }

  /**
   * 获取所有的权限
   */
  getAllRole(): Observable<Result> {
    return this.http.get<Result>(`/roles`);
  }

  updateTeacherRole(teacherRoleParam: TeacherRoleParam): Observable<Result> {
    return this.http.put<Result>(``, teacherRoleParam);
  }
}
