import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Direction} from '../entity/Direction';
import {DirectionService} from './direction.service';
import {DirectionEntity} from '../entity/DirectionEntity';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit {

  constructor(private fb: FormBuilder, private directionService: DirectionService) {
  }

  size = 'default';
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;

  listOfData = [];
  value: 'string';
  mvalue: 'string';

  selectedCollege = null;
  listOfCollege = [];
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
      directionName: [null, [Validators.required]],
      directionDescription: [null, [Validators.required]],
    });
    this.mvalidateForm = this.fb.group({
      mmajorName: [null, [Validators.required]],
      mdirectionName: [null, [Validators.required]],
      mdirectionDescription: [null, [Validators.required]],
    });
    this.getList();
  }

  /**
   * 添加方向
   */

  addDirection(): void {
    this.isVisible = true;
    this.getCollegeList();
  }

  getCollegeList() {
    this.directionService.getCollegeList().subscribe(
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
    const majorName = this.validateForm.get('majorName').value;
    const directionName = this.validateForm.get('directionName').value;
    const directionDescription = this.validateForm.get('directionDescription').value;
    console.log('name is ', directionName, ',description:', directionDescription, ',collegeId,', majorName);
    const direction = new DirectionEntity();
    direction.name = directionName;
    direction.summary = directionDescription;
    direction.collegeId = majorName;
    this.directionService.addDirection(direction).subscribe(
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
    this.listOfCollege = [];
    this.listOfData = [];
    this.getList();
  }

  handleCancel(): void {
    this.validateForm.reset();
    this.isVisible = false;
  }

  /**
   * 获取专业列表
   */
  getList() {
    this.directionService.getList().subscribe(
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
    this.directionService.deleteOne(id).subscribe(
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
    let mdirectionName = this.mvalidateForm.get('mdirectionName').value;
    let mdirectionDescription = this.mvalidateForm.get('mdirectionDescription').value;
    if (mmajorName === null) {
      mmajorName = this.mmajor;
    }
    if (mdirectionName === null) {
      mdirectionName = this.mname;
    }
    if (mdirectionDescription === null) {
      mdirectionDescription = this.msummary;
    }

    const direction = new Direction();
    direction.name = mdirectionName;
    direction.summary = mdirectionDescription;
    direction.id = this.mid;
    this.directionService.modifyOne(direction).subscribe(
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
