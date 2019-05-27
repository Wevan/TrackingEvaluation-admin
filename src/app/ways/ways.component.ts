import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseTargetResponse} from '../entity/CourseTargetResponse';
import {Course} from '../entity/Course';
import {Knowledge} from '../entity/Knowledge';
import {GlobalWayResponse} from '../entity/GlobalWayResponse';
import {DailyWayResponse} from '../entity/DailyWayResponse';
import {WaysService} from './ways.service';
import {DailyWay} from '../entity/DailyWay';
import {GlobalWay} from '../entity/GlobalWay';

@Component({
  selector: 'app-ways',
  templateUrl: './ways.component.html',
  styleUrls: ['./ways.component.scss']
})
export class WaysComponent implements OnInit {

  constructor(private fb: FormBuilder, private waysService: WaysService) {
  }

  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  radioValue = 'daily';
  listOfCollege = [];

  listOfCourse: Array<Course> = [];
  listOfGlobalWays: Array<GlobalWayResponse> = [];
  listOfDailyWays: Array<DailyWayResponse> = [];
  value: 'string';

  selectedCollege = null;
  selectedCourse = null;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      majorName: [null, [Validators.required]],
      courseName: [null, [Validators.required]],
      isGlobal: [null, [Validators.required]],
      waysList: [null, [Validators.required]],
    });
    this.initWaysData();
  }

  initWaysData() {
    this.waysService.getDailyWayList().subscribe(
      next => {
        if (next.code === 200) {
          this.listOfDailyWays = next.data;
          console.log('get Daily WayList', next.data);
        }
        this.waysService.getGlobalWayList().subscribe(
          next1 => {
            if (next1.code === 200) {
              this.listOfGlobalWays = next1.data;
              console.log('get Global WayList', next1.data);
            }
          },
          (err: Error) => {
            console.log(err);
          }
        );
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  /**
   * 添加考核方式
   */

  addWays(): void {
    this.isVisible = true;
    this.getCollegeList();
  }

  getCollegeList() {
    this.waysService.getCollegeList().subscribe(
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
    const waysList = this.validateForm.get('waysList').value;
    const regex = /\[(.+?)\]/g;
    const options = waysList.match(regex);
    const list = [];
    if (this.radioValue === 'daily') {
      options.forEach(
        item => {
          const afterDeal = item.replace(/\[|]/g, '');
          const tempArray = afterDeal.split('/');
          const dailyWay = new DailyWay();
          dailyWay.name = tempArray[0];
          dailyWay.percent = tempArray[1];
          dailyWay.courseId = courseName;
          list.push(dailyWay);
        }
      );
      this.waysService.addDailyWays(list).subscribe(
        next => {
          if (next.code === 200) {
            this.listOfDailyWays = [];
            this.listOfDailyWays = next.data;
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
    } else {
      options.forEach(
        item => {
          const afterDeal = item.replace(/\[|]/g, '');
          const tempArray = afterDeal.split('/');
          const globalWay = new GlobalWay();
          globalWay.name = tempArray[0];
          globalWay.percent = tempArray[1];
          globalWay.courseId = courseName;
          list.push(globalWay);
        }
      );
      this.waysService.addGlobalWays(list).subscribe(
        next => {
          if (next.code === 200) {
            this.listOfGlobalWays = [];
            this.listOfGlobalWays = next.data;
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
    }
    this.validateForm.reset();
    this.isVisible = false;
  }

  handleCancel(): void {
    this.validateForm.reset();
    this.isVisible = false;
  }

  /**
   * 课程列表
   */
  getCourseList() {
    this.waysService.getCourseList(this.selectedCollege).subscribe(
      next => {
        if (next.code === 200) {
          this.listOfCourse = next.data;
        }
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

}
