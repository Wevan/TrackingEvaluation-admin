import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Result } from 'src/app/entity/Result';
import { StudentParam } from 'src/app/entity/Params';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) {}
  validateForm: FormGroup;
  dataSet = [];
  pageSize = 10;
  pageIndex = 1;
  isVisible = false;
  isOkLoading = false;

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      classId: [null, [Validators.required]],
      studentName: [null, [Validators.required]],
      studentNum: [null, [Validators.required]],
    });
    const children: Array<{ label: string; value: string }> = [];
    // 获取班级的请求
    this.userService.getClasses().subscribe((result: Result) => {
      console.log('result is ', result);
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
      result.data.forEach(
        element => {
          this.dataSet.push({
            id: element.id,
            studentName: element.name,
            studentNumber: element.studentNumber,
            class: element.class,
            classId: element.classId,
          });
        },
        () => {
          console.log('student ', this.dataSet);
        },
      );
    });
  }

  addStudent(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    for (const i in this.validateForm.controls) {
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
