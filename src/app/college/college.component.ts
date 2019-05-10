import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CollegeService} from './college.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.scss']
})
export class CollegeComponent implements OnInit {

  constructor(private fb: FormBuilder, private collegeService: CollegeService) {
  }

  size = 'default';
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
  }

  addStudent(): void {
    this.isVisible = true;
  }

  handleOk(): void {

  }

  handleCancel(): void {
    this.isVisible = false;
  }

  download() {
    console.log('下载');
  }

}
