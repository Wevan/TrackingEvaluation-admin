import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Result } from 'src/app/entity/Result';
import { TeacherParam, TeacherRoleParam } from 'src/app/entity/Params';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  validateForm: FormGroup;
  dataSet = [];
  pageSize = 10;
  pageIndex = 1;
  isVisible = false;
  isOkLoading = false;

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      positionId: [null, [Validators.required]],
      teacherName: [null, [Validators.required]],
      teacherNumber: [null, [Validators.required]],
    });
    // 获取班级的请求

    // 获取所有教师
    this.userService.getTeacherRole().subscribe(
      (result: Result) => {
        console.log('result teacher ', result.data);
        this.dataSet = result.data;
      },
      () => {
        console.log('teacher ', this.dataSet);
      },
    );
  }
  updateTeacherId: number;
  openUpdate(data): void {
    this.isVisible = true;
    this.validateForm.get('teacherName').setValue(data.name);

    this.updateTeacherId = data.id;
    this.validateForm.get('teacherNumber').setValue(data.jobNumber);
    const children: Array<{ label: string; value: string }> = [];

    this.userService.getAllRole().subscribe((result: Result) => {
      for (let i = 0; i < result.data.length; i++) {
        children.push({
          label: result.data[i].about,
          value: result.data[i].id,
        });
      }
      this.listOfOption = children;
    });
  }

  handleOk(): void {
    this.isOkLoading = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    var teacherRoleParam = new TeacherRoleParam();
    teacherRoleParam.roleIds = this.listOfTagOptions;
    teacherRoleParam.teacherId = this.updateTeacherId;
    this.updateTeacherId = -1;
    // 更新教师权限信息
    this.userService.updateTeacherRole(teacherRoleParam).subscribe(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
