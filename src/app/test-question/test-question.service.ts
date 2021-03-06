import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../entity/Result';
import { TitleParam } from '../entity/Params';

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

  getAllCourse(): Observable<Result> {
    return this.http.get<Result>('/course/findAll');
  }

  findByCourse(courseId: number): Observable<Result> {
    return this.http.get<Result>(
      `/knowledge/findByCourse?courseId=${courseId}`,
    );
  }

  addTitle(titleParam: TitleParam): Observable<Result> {
    return this.http.post<Result>('/title', titleParam);
  }

  /**
   * 更新试题
   * @param titleParam 试题
   */
  updateTitle(titleParam: TitleParam): Observable<Result> {
    return this.http.put<Result>('/title', titleParam);
  }

  /**
   * 获取算法题
   * @param category
   */
  getTitleByCategory(category: String): Observable<Result> {
    console.log('category ', category);
    return this.http.get<Result>(`/title/${category}`);
  }
}
