import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Result } from 'src/app/entity/Result';
import { StudentParam, TeacherParam } from 'src/app/entity/Params';
import { TeacherInfo, TeacherProfileInfo } from 'src/app/entity/Info';
import { locale } from 'core-js';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit {
  validateForm: FormGroup;
  dataSet = [];
  pageSize = 10;
  pageIndex = 1;
  isVisible = false;
  isOkLoading = false;
  sexOptions: number;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      positionId: [null, [Validators.required]],
      teacherName: [null, [Validators.required]],
      teacherNumber: [null, [Validators.required]],
      teacherSex: [null, [Validators.required]],
    });
    const children: Array<{ label: string; value: string }> = [];
    // 获取班级的请求
    this.userService.getPosition().subscribe((result: Result) => {
      for (let i = 0; i < result.data.length; i++) {
        children.push({
          label: result.data[i].name,
          value: result.data[i].id,
        });
      }
      this.listOfOption = children;
    });

    // 获取所有学生
    this.userService.getAll('teachers').subscribe(
      (result: Result) => {
        console.log('result teacher ', result.data);
        this.dataSet = result.data;
      },
      () => {
        console.log('teacher ', this.dataSet);
      },
    );
  }

  add(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const teacherName = this.validateForm.get('teacherName').value;
    const teacherNumber = this.validateForm.get('teacherNumber').value;
    const positionId = this.validateForm.get('positionId').value;
    const teacherParam = new TeacherParam();
    teacherParam.positionId = positionId;
    teacherParam.teacherName = teacherName;
    teacherParam.teacherNum = teacherNumber;
    teacherParam.sex = this.sexOptions;
    console.log('sex => ', this.sexOptions);
    // 提交教师信息
    this.userService.addTeacher(teacherParam).subscribe(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showModalTitle: string = '';
  isShowVisible: boolean = false;
  teacherProfileInfo: TeacherProfileInfo = new TeacherProfileInfo();
  openProfile(teacherInfo: TeacherInfo) {
    console.log('teacher id ', teacherInfo);
    this.showModalTitle = teacherInfo.name;
    this.isShowVisible = true;
    this.userService
      .getTeacherProfile(teacherInfo.id)
      .subscribe((result: Result) => {
        this.teacherProfileInfo = result.data;
        console.log('result teacher profile ', this.teacherProfileInfo);
      });
  }
  handleShowCancel() {
    this.isShowVisible = false;
  }

  handleShowOk() {
    this.isShowVisible = false;
  }

  isUpdateVisible = false;
  updateTeacherId = -1;
  openUpdate(teacherInfo: TeacherInfo) {
    console.log('teacher id ', teacherInfo);
    this.updateTeacherId = teacherInfo.id;
    // document.getElementById('teacher_id_visible'). = teacherInfo.id.toString;
    this.isUpdateVisible = true;
    this.validateForm.get('teacherName').setValue(teacherInfo.name);
    this.validateForm.get('teacherNumber').setValue(teacherInfo.teacherNumber);
    this.sexOptions = teacherInfo.sex == '男' ? 1 : 0;
    this.listOfTagOptions = [teacherInfo.positionId];
    // this.validateForm.get('teacherSex').setValue(teacherInfo.sex);

    // 更新
  }
  handleUpdateOk() {
    this.isUpdateOkLoading = true;
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    var teacherParam = new TeacherParam();
    teacherParam.teacherName = this.validateForm.get('teacherName').value;
    teacherParam.teacherNum = this.validateForm.get('teacherNumber').value;
    teacherParam.sex = this.sexOptions; // this.validateForm.get('teacherNumber').value
    teacherParam.positionId = this.listOfTagOptions[0];

    this.userService
      .updateTeacherInfo(this.updateTeacherId, teacherParam)
      .subscribe(
        (result: Result) => {
          console.log('result => ', result);
        },
        error => {
          console.log('error ', error);
        },
        () => {
          this.isUpdateVisible = false;
          this.isUpdateOkLoading = false;
          location.reload();
        },
      );
    this.updateTeacherId = -1;
  }
  isUpdateOkLoading = false;
  handleUpdateCancel() {
    this.isUpdateVisible = false;
  }
}
