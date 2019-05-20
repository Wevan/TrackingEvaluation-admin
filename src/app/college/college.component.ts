import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CollegeService} from './college.service';
import {College} from '../entity/College';
import {log} from 'util';

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
  isVisible = false;
  isOkLoading = false;

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
  value: 'string';

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      majorName: [null, [Validators.required]],
      collegeName: [null, [Validators.required]],
      collegeDescription: [null, [Validators.required]],
    });
    this.getList();
  }

  /**
   * 添加专业
   */

  addCollege(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    log('ok');
    // this.isOkLoading = true;
    const majorName = this.validateForm.get('majorName').value;
    const collegeName = this.validateForm.get('collegeName').value;
    const collegeDescription = this.validateForm.get('collegeDescription').value;
    const college = new College();
    college.name = collegeName;
    college.summary = collegeDescription;
    college.major = majorName;
    this.collegeService.addCollege(college).subscribe(
      next => {
        if (next.code === 200) {
          console.log(next);
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
  }

  handleCancel(): void {
    this.validateForm.reset();
    this.isVisible = false;
  }

  download() {
    console.log('下载');
  }

  /**
   * 获取专业列表
   */
  getList() {
    this.collegeService.getList().subscribe(
      next => {
        this.listOfData = next.data;
        console.log(next);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  deleteOne(id: number, index: number) {
    console.log('id', id, ',index', index);
    this.listOfData.splice(index, 1);
    this.collegeService.deleteOne(id).subscribe(
      next => {
        this.listOfData = [];
        this.listOfData = next.data;
        console.log(next);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

}
