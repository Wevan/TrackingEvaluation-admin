import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Result } from 'src/app/entity/Result';
import { StudentParam, TeacherParam } from 'src/app/entity/Params';

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

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      positionId: [null, [Validators.required]],
      teacherName: [null, [Validators.required]],
      teacherNumber: [null, [Validators.required]],
    });
    const children: Array<{ label: string; value: string }> = [];
    // 获取班级的请求
    this.userService.getPosition().subscribe((result: Result) => {
      console.log('position is ', result);
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
        result.data.forEach(element => {
          this.dataSet.push({
            id: element.id,
            teacherName: element.name,
            teacherNumber: element.teacherNumber,
            position: element.position,
            positionId: element.positionId,
          });
        });
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
    // 提交教师信息
    this.userService.addTeacher(teacherParam).subscribe(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  download() {
    console.log('下载');

    this.userService.downExcle().subscribe(res => {
      console.log(res);
      const file = new File([res], 'mm.xml', {
        type: 'application/vnd.ms-excel',
      });
      console.log('file is ', file);
      const objUrl = URL.createObjectURL(res);
      window.open(objUrl);
      URL.revokeObjectURL(objUrl);
    });
  }
}
