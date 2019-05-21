import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {log} from 'util';
import {College} from '../entity/College';
import {CollegeTargetService} from './college-target.service';

@Component({
  selector: 'app-college-target',
  templateUrl: './college-target.component.html',
  styleUrls: ['./college-target.component.scss']
})
export class CollegeTargetComponent implements OnInit {

  constructor(private fb: FormBuilder, private collegeTargetService: CollegeTargetService) {
  }

  size = 'default';
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;

  listOfData = [];
  listOfCollege = [];
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
   * 添加专业目标
   */

  addCollegeTarget(): void {
    this.isVisible = true;
    this.getCollegeList();
  }

  getCollegeList() {
    this.collegeTargetService.getCollegeList().subscribe(
      next => {
        if (next.code === 200) {
          this.listOfCollege = next.data;
          console.log(next);
        }
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  handleOk(): void {
    log('ok');
    // this.isOkLoading = true;
    const majorName = this.validateForm.get('majorName').value;
    const collegeName = this.validateForm.get('collegeName').value;
    const collegeDescription = this.validateForm.get('collegeDescription').value;
    const list = [];
    const college = new College();
    college.name = collegeName;
    college.summary = collegeDescription;
    college.major = majorName;
    list.push(college);
    list.push(college);
    this.collegeTargetService.addCollegeTarget(list).subscribe(
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

  /**
   * 获取专业列表
   */
  getList() {
    this.collegeTargetService.getTargetList().subscribe(
      next => {
        this.listOfData = next.data;
        console.log(next);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  // deleteOne(id: number) {
  //   this.collegeTargetService.deleteOne(id).subscribe(
  //     next => {
  //       this.listOfData = [];
  //       this.listOfData = next.data;
  //       console.log(next);
  //     },
  //     (err: Error) => {
  //       console.log(err);
  //     }
  //   );
  // }

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
    // this.collegeService.modifyOne(college).subscribe(
    //   next => {
    //     this.listOfData = [];
    //     this.listOfData = next.data;
    //     console.log(next);
    //   },
    //   (err: Error) => {
    //     console.log(err);
    //   },
    //   () => {
    //     this.misOkLoading = false;
    //     this.misVisible = false;
    //     this.mname = '';
    //     this.mmajor = '';
    //     this.msummary = '';
    //     this.mid = 0;
    //
    //   }
    // );
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
