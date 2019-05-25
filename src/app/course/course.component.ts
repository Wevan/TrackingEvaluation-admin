import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CollegeResponse} from '../entity/CollegeResponse';
import {CollegeTarget} from '../entity/CollegeTarget';
import {CourseService} from './course.service';
import {UploadXHRArgs} from 'ng-zorro-antd';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  constructor(private fb: FormBuilder, private courseService: CourseService, private http: HttpClient) {
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

  listOfRAbility = [];
  // 文件上传框
  fileIsVisible = false;
  fileValidateForm: FormGroup;
  fileSelectedCollege = null;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      majorName: [null, [Validators.required]],
      graduateName: [null, [Validators.required]],
      collegeTarget: [null, [Validators.required]],
    });
    this.fileValidateForm = this.fb.group({
      fileMajorName: [null, [Validators.required]],
      file: [null, [Validators.required]]
    });
    this.initCourseData();
    // this.getCollegeTargetList();
  }

  initCourseData() {
    this.courseService.getCourses().subscribe(
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
    // this.getRAbilityList();
  }

  getCollegeList() {
    this.courseService.getCollegeList().subscribe(
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
    this.courseService.addCollegeTarget(list).subscribe(
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

  getRAbilityList() {
    this.courseService.getRAbilityList().subscribe(
      next => {
        if (next.code === 200) {
          this.listOfRAbility = next.data;
          console.log('getRAbilityList', next);
        }
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  handleCancel(): void {
    this.validateForm.reset();
    this.isVisible = false;
  }

  /**
   * 获取专业列表
   */
  getCollegeTargetList() {
    this.courseService.getTargetList().subscribe(
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
  download() {
    this.courseService.downExcle().subscribe(
      res => {
        const objUrl = URL.createObjectURL(res);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objUrl);
        a.setAttribute('download', '课程模板.xlsx');
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

  addCourseFile(): void {
    this.fileIsVisible = true;
    this.listOfCollege = [];
    this.getCollegeList();
  }

  customRequest = (item: UploadXHRArgs) => {
    const formData = new FormData();
    formData.append('excel', item.file as any);
    const req = new HttpRequest('POST', `/file/excel/course${this.fileSelectedCollege}`, formData, {
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
      }
    );
  };
}
