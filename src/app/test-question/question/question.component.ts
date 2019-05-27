import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFile, UploadXHRArgs, NzMessageService } from 'ng-zorro-antd';
import {
  StudentInfo,
  StudentProfileInfo,
  TitleProfileInfo,
} from 'src/app/entity/Info';
import { StudentParam, TitleParam } from 'src/app/entity/Params';
import { TestQuestionService } from '../test-question.service';
import { Result } from 'src/app/entity/Result';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  size = 'default';
  constructor(
    private fb: FormBuilder,
    private testQuestionService: TestQuestionService,
    private http: HttpClient,
    private message: NzMessageService,
  ) {}
  validateForm: FormGroup;
  dataSet = [];
  pageSize = 10;
  pageIndex = 1;
  isVisible = false;
  isOkLoading = false;
  isUpdateLoading = false;
  isUpdateVisible = false;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  updateFrom: FormGroup;
  listOfData: Array<StudentInfo> = [];
  studentProfileInfo = new StudentProfileInfo();
  updateModalTitle: string = '';
  studentFileList: UploadFile[] = [];
  listOfTypeOptions: string;
  listOfCourseOptions: string;
  listOfKnowledgeOptions: string;
  listOfTypeOption: Array<{ label: string; value: string }> = [];
  listOfCourseOption: Array<{ label: string; value: string }> = [];
  listOfKnowledgeIdOption: Array<{ label: string; value: string }> = [];

  isOrderValue: string;
  selectAnswer: string;
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      answer: [null, [Validators.required]],
      analysis: [null, [Validators.required]],
      difficulty: [null, [Validators.required]],
      courseId: [null, [Validators.required]],
      // 主要知识点
      knowledgeId: [null, [Validators.required]],
      isOrder: [null],
      category: [null, [Validators.required]],
      sectionA: [null],
      sectionB: [null],
      sectionC: [null],
      sectionD: [null],
    });
    this.updateFrom = this.fb.group({
      title: [null, [Validators.required]],
      answer: [null, [Validators.required]],
      analysis: [null, [Validators.required]],
      difficulty: [null, [Validators.required]],
      courseId: [null, [Validators.required]],
      // 主要知识点
      knowledgeId: [null, [Validators.required]],
      isOrder: [null],
      category: [null, [Validators.required]],
      sectionA: [null],
      sectionB: [null],
      sectionC: [null],
      sectionD: [null],
    });

    // 获取所有试题
    this.testQuestionService.getAllTitles().subscribe((result: Result) => {
      console.log('students ', result.data);
      this.listOfData = result.data;
    });
    this.getCourse();
  }

  addTitle(): void {
    this.isVisible = true;
    this.getCourse();
  }
  private getCourse() {
    const courseChildren: Array<{ label: string; value: string }> = [];
    this.testQuestionService.getAllCourse().subscribe((result: Result) => {
      console.log('data => ', result.data);
      for (let i = 0; i < result.data.length; i++) {
        courseChildren.push({
          label: result.data[i].name,
          value: result.data[i].id,
        });
      }
      this.listOfCourseOption = courseChildren;
    });
  }
  courseModelSelect(event: number) {
    if (event == undefined || event == NaN) {
      return;
    }
    this.download(event);
  }

  courseModelChange(event: number) {
    if (event == undefined) {
      return;
    }
    const knowledgeIdChildren: Array<{ label: string; value: string }> = [];
    this.testQuestionService.findByCourse(event).subscribe((result: Result) => {
      for (let i = 0; i < result.data.length; i++) {
        knowledgeIdChildren.push({
          label: result.data[i].name,
          value: result.data[i].id,
        });
        this.listOfKnowledgeIdOption = knowledgeIdChildren;
      }
    });
  }
  /**
   * 定制的上传方法
   */
  customRequest = (item: UploadXHRArgs) => {
    const formData = new FormData();
    formData.append('excel', item.file as any);
    const req = new HttpRequest('POST', `/file/excel/title`, formData, {
      reportProgress: true,
    });
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        console.log('event |> ', event);

        if (event.type === HttpEventType.UploadProgress) {
          if (event.total > 0) {
            (event as any).percent = (event.loaded / event.total) * 100;
          }
          item.onProgress(event, item.file);
        } else if (event instanceof HttpResponse) {
          item.onSuccess(event.body, item.file, event);
        }
      },
      err => {
        item.onError(err, item.file);
      },
    );
  };

  /**
   * 确定后上传数据 进行单个添加
   */
  handleOk(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const titleParam = new TitleParam();

    titleParam.title = this.validateForm.get('title').value;
    titleParam.answer = this.validateForm.get('answer').value;
    titleParam.analysis = this.validateForm.get('analysis').value;
    titleParam.difficulty = this.validateForm.get('difficulty').value;
    titleParam.courseId = this.validateForm.get('courseId').value;
    titleParam.knowledgeId = this.validateForm.get('knowledgeId').value;
    titleParam.isOrder = this.validateForm.get('isOrder').value;
    titleParam.category = this.validateForm.get('category').value;
    titleParam.sectionA = this.validateForm.get('sectionA').value;
    titleParam.sectionB = this.validateForm.get('sectionB').value;
    titleParam.sectionC = this.validateForm.get('sectionC').value;
    titleParam.sectionD = this.validateForm.get('sectionD').value;

    if (titleParam.category == '1') {
      if (titleParam.sectionA == null) {
        this.message.create('error', `请设置A选项`);
        return;
      } else {
        titleParam.sectionA = '【' + titleParam.sectionA + '】';
      }
      if (titleParam.sectionB == null) {
        this.message.create('error', `请设置B选项`);
        return;
      } else {
        titleParam.sectionB = '【' + titleParam.sectionB + '】';
      }
      if (titleParam.sectionC == null) {
        this.message.create('error', `请设置C选项`);
        return;
      } else {
        titleParam.sectionC = '【' + titleParam.sectionC + '】';
      }
      if (titleParam.sectionD == null) {
        this.message.create('error', `请设置D选项`);

        return;
      } else {
        titleParam.sectionD = '【' + titleParam.sectionD + '】';
      }
    }
    if (titleParam.category == '2') {
      if (titleParam.isOrder == null) {
        // 默认为无序答案
        titleParam.isOrder = 0;
      }
    }
    this.isOkLoading = true;
    this.testQuestionService
      .addTitle(titleParam)
      .subscribe((result: Result) => {
        this.isOkLoading = false;
        this.isVisible = false;
      });
    this.validateForm.reset();
    console.log('title param => ', titleParam);
    // 进行上传试题
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isOkLoading = false;
  }

  download(courseId: number) {
    this.testQuestionService.downTitleTemplates(courseId).subscribe(
      res => {
        const objUrl = URL.createObjectURL(res);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objUrl);
        a.setAttribute('download', '试题模板.xlsx');
        a.click();
        URL.revokeObjectURL(objUrl);
      },
      error => {
        console.log('error is ', error);
      },
    );
  }

  titleProfileInfo: TitleProfileInfo = new TitleProfileInfo();
  isShowVisible: boolean = false;
  openProfile(titleProfileInfo: TitleProfileInfo) {
    console.log('title id ', titleProfileInfo);
    this.updateModalTitle = titleProfileInfo.title;
    this.titleProfileInfo = titleProfileInfo;
    this.isShowVisible = true;
  }
  handleShowCancel() {
    this.isShowVisible = false;
  }

  handleShowOk() {
    this.isShowVisible = false;
  }
  handleUpdateCancel() {
    this.isUpdateVisible = false;
  }

  handleUpdateOk() {
    console.log('update');
    const titleParam = new TitleParam();
    titleParam.title = this.updateFrom.get('title').value;
    titleParam.answer = this.updateFrom.get('answer').value;
    titleParam.analysis = this.updateFrom.get('analysis').value;
    titleParam.difficulty = this.updateFrom.get('difficulty').value;
    titleParam.courseId = this.updateFrom.get('courseId').value;
    titleParam.knowledgeId = this.updateFrom.get('knowledgeId').value;
    titleParam.isOrder = this.updateFrom.get('isOrder').value;
    titleParam.category = this.updateFrom.get('category').value;
    titleParam.sectionA = this.updateFrom.get('sectionA').value;
    titleParam.sectionB = this.updateFrom.get('sectionB').value;
    titleParam.sectionC = this.updateFrom.get('sectionC').value;
    titleParam.sectionD = this.updateFrom.get('sectionD').value;
    console.log('title ', titleParam);
    if (titleParam.category == '1') {
      if (titleParam.sectionA == null) {
        this.message.create('error', `请设置A选项`);
        return;
      } else {
        titleParam.sectionA = '【' + titleParam.sectionA + '】';
      }
      if (titleParam.sectionB == null) {
        this.message.create('error', `请设置B选项`);
        return;
      } else {
        titleParam.sectionB = '【' + titleParam.sectionB + '】';
      }
      if (titleParam.sectionC == null) {
        this.message.create('error', `请设置C选项`);
        return;
      } else {
        titleParam.sectionC = '【' + titleParam.sectionC + '】';
      }
      if (titleParam.sectionD == null) {
        this.message.create('error', `请设置D选项`);

        return;
      } else {
        titleParam.sectionD = '【' + titleParam.sectionD + '】';
      }
    }
    if (titleParam.category == '2') {
      if (titleParam.isOrder == null) {
        // 默认为无序答案
        titleParam.isOrder = 0;
      }
    }
    this.isUpdateLoading = true;
    this.testQuestionService
      .updateTitle(titleParam)
      .subscribe((result: Result) => {
        console.log(result);
      });
    this.isUpdateLoading = false;
    this.isUpdateVisible = false;
  }

  updateTitleProfileInfoId = 0;
  openUpdate(titleProfileInfo: TitleProfileInfo) {
    console.log(titleProfileInfo);
    this.isUpdateVisible = true;
    this.updateTitleProfileInfoId = titleProfileInfo.id;
    this.updateFrom.get('title').setValue(titleProfileInfo.title);
    this.updateFrom.get('answer').setValue(titleProfileInfo.answer);
    this.updateFrom.get('analysis').setValue(titleProfileInfo.answer);
    this.updateFrom.get('difficulty').setValue(titleProfileInfo.difficulty);
    this.getCourse();
    switch (titleProfileInfo.category) {
      case '选择题':
        titleProfileInfo.category = '1';
        break;
      case '填空题':
        titleProfileInfo.category = '2';
        break;
      case '简答题':
        titleProfileInfo.category = '3';
        break;
    }
    this.selectAnswer = titleProfileInfo.answer;
    this.isOrderValue = titleProfileInfo.order;
    this.updateFrom.get('category').setValue(titleProfileInfo.category);
    this.updateFrom.get('sectionA').setValue(titleProfileInfo.sectionA);
    this.updateFrom.get('sectionB').setValue(titleProfileInfo.sectionB);
    this.updateFrom.get('sectionC').setValue(titleProfileInfo.sectionC);
    this.updateFrom.get('sectionD').setValue(titleProfileInfo.sectionD);
  }
}
