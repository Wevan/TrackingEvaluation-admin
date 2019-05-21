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

  listOfData = [];
  value: 'string';
  mvalue: 'string';

  // 修改部分的模态框
  misVisible = false;
  misOkLoading = false;
  mvalidateForm: FormGroup;
  mname = '';
  mmajor = '';
  msummary = '';
  mid = 0;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      majorName: [null, [Validators.required]],
      collegeName: [null, [Validators.required]],
      collegeDescription: [null, [Validators.required]],
    });
    this.mvalidateForm = this.fb.group({
      mmajorName: [null, [Validators.required]],
      mcollegeName: [null, [Validators.required]],
      mcollegeDescription: [null, [Validators.required]],
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

  deleteOne(id: number) {
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

  beforeModify(id: number, major: string, name: string, summary: string) {
    this.misVisible = true;
    this.mname = name;
    this.mmajor = major;
    this.msummary = summary;
    this.mid = id;
  }

  mhandleOk(): void {
    let mmajorName = this.mvalidateForm.get('mmajorName').value;
    let mcollegeName = this.mvalidateForm.get('mcollegeName').value;
    let mcollegeDescription = this.mvalidateForm.get('mcollegeDescription').value;
    if (mmajorName === null) {
      mmajorName = this.mmajor;
    }
    if (mcollegeName === null) {
      mcollegeName = this.mname;
    }
    if (mcollegeDescription === null) {
      mcollegeDescription = this.msummary;
    }

    const college = new College();
    college.name = mcollegeName;
    college.summary = mcollegeDescription;
    college.major = mmajorName;
    college.id = this.mid;
    this.collegeService.modifyOne(college).subscribe(
      next => {
        this.listOfData = [];
        this.listOfData = next.data;
        console.log(next);
      },
      (err: Error) => {
        console.log(err);
      },
      () => {
        this.misOkLoading = false;
        this.misVisible = false;
        this.mname = '';
        this.mmajor = '';
        this.msummary = '';
        this.mid = 0;

      }
    );
  }

  mhandleCancel(): void {
    this.mvalidateForm.reset();
    this.misVisible = false;
    this.mname = '';
    this.mmajor = '';
    this.msummary = '';
    this.mid = 0;
  }

}
