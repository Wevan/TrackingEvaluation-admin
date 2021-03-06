import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CollegeResponse} from '../entity/CollegeResponse';
import {CollegeTarget} from '../entity/CollegeTarget';
import {CourseTargetService} from './course-target.service';
import {CourseTargetResponse} from '../entity/CourseTargetResponse';
import {CourseTarget} from '../entity/CourseTarget';
import {Course} from '../entity/Course';

@Component({
  selector: 'app-course-target',
  templateUrl: './course-target.component.html',
  styleUrls: ['./course-target.component.scss']
})
export class CourseTargetComponent implements OnInit {


  constructor(private fb: FormBuilder, private courseTargetService: CourseTargetService) {
  }

  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  listOfCollege = [];
  // 课程目标按照课程的分组列表
  listOfTarget: Array<CourseTargetResponse> = [];

  listOfCourse: Array<Course> = [];
  value: 'string';

  selectedCollege = null;
  selectedCourse = null;

  listOfRAbility = [];

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      majorName: [null, [Validators.required]],
      courseName: [null, [Validators.required]],
      courseTarget: [null, [Validators.required]],
    });
    this.getList();
  }

  /**
   * 添加专业目标
   */

  addCollegeTarget(): void {
    this.isVisible = true;
    this.getCollegeList();
    // this.getRAbilityList();
  }

  getCollegeList() {
    this.courseTargetService.getCollegeList().subscribe(
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

  handleOk(): void {
    const courseName = this.validateForm.get('courseName').value;
    const courseTarget = this.validateForm.get('courseTarget').value;
    const regex = /\[(.+?)\]/g;
    const options = courseTarget.match(regex);
    const list = [];
    options.forEach(
      item => {
        const afterDeal = item.replace(/\[|]/g, '');
        const tempArray = afterDeal.split('/');
        const courseTargetEntity = new CourseTarget();
        courseTargetEntity.name = tempArray[0];
        courseTargetEntity.percent = tempArray[1];
        courseTargetEntity.courseId = courseName;
        list.push(courseTargetEntity);
      }
    );
    this.courseTargetService.addCollegeTarget(list).subscribe(
      next => {
        if (next.code === 200) {
          this.listOfTarget = [];
          this.listOfTarget = next.data;
          console.log('Target', next.data);
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
    this.isVisible = false;
  }

  handleCancel(): void {
    this.validateForm.reset();
    this.isVisible = false;
  }

  /**
   * 获取课程目标列表
   */
  getList() {
    this.courseTargetService.getTargetList().subscribe(
      next => {
        this.listOfTarget = next.data;
        console.log('TargetList', next);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  /**
   * 课程列表
   */
  getCourseList() {
    this.courseTargetService.getCourseList(this.selectedCollege).subscribe(
      next => {
        if (next.code === 200) {
          this.listOfCourse = next.data;
          console.log('getCourseList', next);
        }
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

}
