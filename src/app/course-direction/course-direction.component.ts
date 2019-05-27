import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {log} from 'util';
import {CourseDirection} from '../entity/CourseDirection';
import {CourseDirectionService} from './course-direction.service';

@Component({
  selector: 'app-course-direction',
  templateUrl: './course-direction.component.html',
  styleUrls: ['./course-direction.component.scss']
})
export class CourseDirectionComponent implements OnInit {

  constructor(private fb: FormBuilder, private courseDirectionService: CourseDirectionService) {
  }

  size = 'default';
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;

  selectedCollege = null;
  listOfCollege = [];

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
      direction: [null, [Validators.required]],
      commen: [null, [Validators.required]],
    });
    // this.mvalidateForm = this.fb.group({
    //   mmajorName: [null, [Validators.required]],
    //   mcourseDirectionName: [null, [Validators.required]],
    //   mcourseDirectionDescription: [null, [Validators.required]],
    // });
    // this.getCollegeList();
    this.getCourseDirectList();
  }

  /**
   * 添加课程比例
   */
  getCourseDirectList() {
    this.courseDirectionService.getCourseDirectList().subscribe(
      next => {
        if (next.code === 200) {
          this.listOfData = next.data;
          console.log(next);
        }
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  addCourseDirection(): void {
    this.isVisible = true;
    this.getCollegeList();
  }

  handleOk(): void {
    const majorName = this.validateForm.get('majorName').value;
    const direction = this.validateForm.get('direction').value;
    const commen = this.validateForm.get('commen').value;
    console.log('ok msg is ', majorName, ',', direction, ',', commen);
    const courseDirection = new CourseDirection();
    courseDirection.collegeId = majorName;
    courseDirection.direction = direction;
    courseDirection.commen = commen;
    this.courseDirectionService.addCourseDirection(courseDirection).subscribe(
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
  getCollegeList() {
    this.courseDirectionService.getCollegeList().subscribe(
      next => {
        if (next.code === 200) {
          this.listOfCollege = next.data;
          console.log('getCollegeList', next);
        }
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  deleteOne(id: number) {
    this.courseDirectionService.deleteOne(id).subscribe(
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
    let mcourseDirectionName = this.mvalidateForm.get('mcourseDirectionName').value;
    let mcourseDirectionDescription = this.mvalidateForm.get('mcourseDirectionDescription').value;
    if (mmajorName === null) {
      mmajorName = this.mmajor;
    }
    if (mcourseDirectionName === null) {
      mcourseDirectionName = this.mname;
    }
    if (mcourseDirectionDescription === null) {
      mcourseDirectionDescription = this.msummary;
    }

    const courseDirection = new CourseDirection();
    // courseDirection.name = mcourseDirectionName;
    // courseDirection.summary = mcourseDirectionDescription;
    // courseDirection.major = mmajorName;
    // courseDirection.id = this.mid;
    // this.coourseDirectionService.modifyOne(courseDirection).subscribe(
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
