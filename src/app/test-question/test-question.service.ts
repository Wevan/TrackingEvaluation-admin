import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../entity/Result';

@Injectable({
  providedIn: 'root',
})
export class TestQuestionService {
  constructor(private http: HttpClient) {}

  downTitleTemplates(courseId: number) {
    return this.http.get(`/file/excel/title/${courseId}`, {
      responseType: 'blob',
    });
  }

  /**
   * 获取所有的试题
   */
  getAllTitles(): Observable<Result> {
    return this.http.get<Result>(`/titles`);
  }
}
