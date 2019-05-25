import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFile, UploadXHRArgs } from 'ng-zorro-antd';
import { StudentInfo, StudentProfileInfo } from 'src/app/entity/Info';
import { StudentParam } from 'src/app/entity/Params';
import { Result } from 'src/app/entity/Result';
import { UserService } from '../user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  size = 'default';
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
  ) {}
  validateForm: FormGroup;
  dataSet = [];
  pageSize = 10;
  pageIndex = 1;
  isVisible = false;
  isOkLoading = false;
  isUpdateVisible = false;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  updateFrom: FormGroup;
  listOfData: Array<StudentInfo> = [];
  studentProfileInfo = new StudentProfileInfo();
  updateModalTitle = '';
  studentFileList: UploadFile[] = [];
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      classId: [null, [Validators.required]],
      studentName: [null, [Validators.required]],
      studentNum: [null, [Validators.required]],
    });
    this.updateFrom = this.fb.group({
      name: [null, [Validators.required]],
      studentNumber: [null, [Validators.required]],
      class: [null, [Validators.required]],
    });
    const children: Array<{ label: string; value: string }> = [];
    // 获取班级的请求
    this.userService.getClasses().subscribe((result: Result) => {
      for (let i = 0; i < result.data.length; i++) {
        children.push({
          label: result.data[i].name,
          value: result.data[i].id,
        });
      }
      this.listOfOption = children;
    });

    // 获取所有学生
    this.userService.getAll('students').subscribe((result: Result) => {
      console.log('students ', result.data);
      this.listOfData = result.data;
    });
  }

  addStudent(): void {
    this.isVisible = true;
  }

  /**
   * 定制的上传方法
   */
  customRequest = (item: UploadXHRArgs) => {
    const formData = new FormData();
    formData.append('excel', item.file as any);
    const req = new HttpRequest('POST', `/file/excel/student`, formData, {
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
  }

  /**
   * 确定后上传数据 进行单个添加
   */
  handleOk(): void {
    this.isOkLoading = true;
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const studentName = this.validateForm.get('studentName').value;
    const studentNum = this.validateForm.get('studentNum').value;
    const classId = this.validateForm.get('classId').value;
    const studentParam = new StudentParam();
    studentParam.classId = classId;
    studentParam.studentName = studentName;
    studentParam.studentNum = studentNum;
    //  提交学生信息
    this.userService.addStudent(studentParam).subscribe(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  download() {
    this.userService.downExcle().subscribe(
      res => {
        const objUrl = URL.createObjectURL(res);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objUrl);
        a.setAttribute('download', '学生模板.xlsx');
        a.click();
        URL.revokeObjectURL(objUrl);
      },
      error => {
        console.log('error is ', error);
      },
    );
  }

  openProfile(studentInfo: StudentInfo) {
    console.log('student id ', studentInfo);
    this.updateModalTitle = studentInfo.name;
    this.isUpdateVisible = true;
    this.userService
      .getStudentProfile(studentInfo.id)
      .subscribe((result: Result) => {
        this.studentProfileInfo = result.data;
        console.log('result profile ', this.studentProfileInfo);
      });
  }
  handleUpdateCancel() {
    this.isUpdateVisible = false;
  }

  handleUpdateOk() {
    this.isUpdateVisible = false;
  }
}
