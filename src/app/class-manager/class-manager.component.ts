import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherParam } from '../entity/Params';
import { TeacherInfo, TeacherProfileInfo } from '../entity/Info';
import { ClassManagerService } from './class-manager.service';
import { Result } from '../entity/Result';

@Component({
  selector: 'app-class-manager',
  templateUrl: './class-manager.component.html',
  styleUrls: ['./class-manager.component.scss'],
})
export class ClassManagerComponent implements OnInit {
  validateForm: FormGroup;
  dataSet = [];
  pageSize = 10;
  pageIndex = 1;
  isVisible = false;
  isOkLoading = false;
  sexOptions: number;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  searchValue: string;
  constructor(
    private fb: FormBuilder,
    private classService: ClassManagerService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
    });

    // 获取所有班级
    this.classService.getAllClass().subscribe(
      (result: Result) => {
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

    const name = this.validateForm.get('name').value;
    this.classService.addClass(name).subscribe(
      error => {},
      () => {
        console.log('成功');
        this.isOkLoading = false;
        this.isVisible = false;
      },
    );
  }

  handleCancel(): void {
    this.isOkLoading = false;
    this.isVisible = false;
  }

  showModalTitle: string = '';
  isShowVisible: boolean = false;
  teacherProfileInfo: TeacherProfileInfo = new TeacherProfileInfo();
  openProfile(teacherInfo: TeacherInfo) {
    console.log('teacher id ', teacherInfo);
    this.showModalTitle = teacherInfo.name;
    this.isShowVisible = true;
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

    this.updateTeacherId = -1;
  }
  isUpdateOkLoading = false;
  handleUpdateCancel() {
    this.isUpdateVisible = false;
  }

  // 搜索功能🔍
  search() {}
}
