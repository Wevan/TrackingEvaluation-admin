import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {CollegeResponse} from '../entity/CollegeResponse';
import {CourseAndCollegeResponse} from '../entity/CourseAndCollegeResponse';
import {CollegeTarget} from '../entity/CollegeTarget';
import {UploadXHRArgs} from 'ng-zorro-antd';
import {CourseTarAndKnowledgeService} from './course-tar-and-knowledge.service';
import {CourseTarAndKnowledgeResponse} from '../entity/CourseTarAndKnowledgeResponse';

@Component({
  selector: 'app-course-tar-and-knowledge',
  templateUrl: './course-tar-and-knowledge.component.html',
  styleUrls: ['./course-tar-and-knowledge.component.scss']
})
export class CourseTarAndKnowledgeComponent implements OnInit {

  constructor(private fb: FormBuilder, private courseTarAndKnowledgeService: CourseTarAndKnowledgeService, private http: HttpClient) {
  }

  size = 'default';
  vis = null;
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  listOfCollege = [];
  listOfCourse = [];
  // 专业目标按照专业的分组列表
  listOfTarget: Array<CollegeResponse> = [];
  value: 'string';

  selectedCollege = null;
  selectedCourse = null;
  visib = null;

  listOfRelation: Array<CourseTarAndKnowledgeResponse> = [];
  // 文件上传框
  fileIsVisible = false;
  fileValidateForm: FormGroup;
  fileSelectedCollege = null;
  fileSelectedCourse = null;
  fileListOfCourse = [];

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      majorName: [null, [Validators.required]],
      courseName: [null, [Validators.required]],
      downloadFile: [null, [Validators.required]],
    });
    this.fileValidateForm = this.fb.group({
      fileMajorName: [null, [Validators.required]],
      fileCourseName: [null, [Validators.required]],
      file: [null, [Validators.required]]
    });
    this.initRelation();
  }

  initRelation() {
    this.courseTarAndKnowledgeService.getRelation().subscribe(
      next => {
        if (next.code === 200) {
          this.listOfRelation = next.data;
          console.log('listOfRelation', next);
        }
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  initCourseData() {
    this.courseTarAndKnowledgeService.getCourses(this.selectedCollege).subscribe(
      next => {
        if (next.code === 200) {
          this.listOfCourse = next.data;
          console.log('getCourses', next);
        }
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  /**
   * 添加专业目标
   */

  addCollegeTarget(): void {
    this.isVisible = true;
    this.getCollegeList();
  }

  getCollegeList() {
    this.courseTarAndKnowledgeService.getCollegeList().subscribe(
      next => {
        if (next.code === 200) {
          this.listOfCollege = next.data;
          console.log('getCollegeList', next);
        }
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  getCourseData() {
    this.courseTarAndKnowledgeService.getCourses(this.fileSelectedCollege).subscribe(
      next => {
        if (next.code === 200) {
          this.fileListOfCourse = next.data;
          console.log('getCourses', next);
        }
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  handleOk(): void {
    const majorName = this.validateForm.get('majorName').value;
    // const graduateName = this.validateForm.get('graduateName').value;
    const collegeTarget = this.validateForm.get('collegeTarget').value;
    const regex = /\[(.+?)\]/g;
    const options = collegeTarget.match(regex);
    const list = [];
    options.forEach(
      item => {
        const afterDeal = item.replace(/\[|]/g, '');
        const tempArray = afterDeal.split('/');
        const collegeTargetEntity = new CollegeTarget();
        collegeTargetEntity.name = tempArray[0];
        collegeTargetEntity.percent = tempArray[1];
        collegeTargetEntity.collegeId = majorName;
        list.push(collegeTargetEntity);
      }
    );
    this.courseTarAndKnowledgeService.addCollegeTarget(list).subscribe(
      next => {
        if (next.code === 200) {
          console.log('Target', next);
        }
      },
      (err: Error) => {
        console.log(err);
      },
      () => {
        this.isOkLoading = false;
        this.isVisible = false;

      }
    );
    this.validateForm.reset();
    this.isVisible = false;
    this.listOfTarget = [];
    this.getCollegeTargetList();
  }


  handleCancel(): void {
    this.validateForm.reset();
    this.isVisible = false;
    this.fileValidateForm.reset();
    this.fileIsVisible = false;
  }

  /**
   * 获取专业列表
   */
  getCollegeTargetList() {
    this.courseTarAndKnowledgeService.getTargetList().subscribe(
      next => {
        this.listOfTarget = next.data;
        console.log('TargetList', next);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  /**
   * 下载课程模板
   */
  downTemplate() {
    this.isVisible = true;
    this.getCollegeList();
  }

  download() {
    this.courseTarAndKnowledgeService.downExcel(this.selectedCourse).subscribe(
      res => {
        const objUrl = URL.createObjectURL(res);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objUrl);
        a.setAttribute('download', '课程知识关系模板.xlsx');
        a.click();
        URL.revokeObjectURL(objUrl);
      },
      error => {
        console.log('error is ', error);
      },
    );
  }

  /**
   * 上传课程模板
   */

  addRelationFile(): void {
    this.fileIsVisible = true;
    this.listOfCollege = [];
    this.getCollegeList();
  }

  customRequest = (item: UploadXHRArgs) => {
    const formData = new FormData();
    formData.append('excel', item.file as any);
    const req = new HttpRequest('POST', `/file/excel/knowledgeAndCourseTar${this.fileSelectedCourse}`, formData, {
      reportProgress: true,
    });
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {

        if (event.type === HttpEventType.UploadProgress) {
          if (event.total > 0) {
            (event as any).percent = (event.loaded / event.total) * 100;
          }
          item.onProgress(event, item.file);
        } else if (event instanceof HttpResponse) {
          item.onSuccess(event.body, item.file, event);
        }
        this.fileIsVisible = false;
      },
      err => {
        item.onError(err, item.file);
        this.fileIsVisible = false;
      }, () => {
        this.fileValidateForm.reset();
        this.fileIsVisible = false;
      }
    );
  };


}
