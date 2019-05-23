import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CollegeTargetRelationService} from './college-target-relation.service';
import {CollegeResponse} from '../entity/CollegeResponse';
import {CollegeTarget} from '../entity/CollegeTarget';

@Component({
  selector: 'app-college-target-relation',
  templateUrl: './college-target-relation.component.html',
  styleUrls: ['./college-target-relation.component.scss']
})
export class CollegeTargetRelationComponent implements OnInit {

  constructor(private fb: FormBuilder, private collegeTargetRelationService: CollegeTargetRelationService) {
  }

  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  listOfCollege = [];
  // 专业目标按照专业的分组列表
  listOfTarget: Array<CollegeResponse> = [];
  value: 'string';

  selectedCollege = null;
  selectedRAbility = null;

  listOfRAbility = [];

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      majorName: [null, [Validators.required]],
      graduateName: [null, [Validators.required]],
      collegeTarget: [null, [Validators.required]],
    });
    // this.getList();
  }

  /**
   * 添加专业目标
   */

  addCollegeAndAbility(): void {
    this.isVisible = true;
    // this.getCollegeList();
    // this.getRAbilityList();
  }

  getCollegeList() {
    this.collegeTargetRelationService.getCollegeList().subscribe(
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
    // const graduateName = this.validateForm.get('graduateName').value;
    const collegeTarget = this.validateForm.get('collegeTarget').value;
    const regex = /\[(.+?)\]/g;
    const options = collegeTarget.match(regex);
    const list = [];
    options.forEach(
      item => {
        const afterDeal = item.replace(/\[|]/g, '');
        const tempArray = afterDeal.split('/');
        const collegeTargetEntity = new CollegeTarget();
        collegeTargetEntity.name = tempArray[0];
        collegeTargetEntity.percent = tempArray[1];
        collegeTargetEntity.collegeId = majorName;
        list.push(collegeTargetEntity);
      }
    );
    this.collegeTargetRelationService.addCollegeAndAbility(list).subscribe(
      next => {
        if (next.code === 200) {
          console.log('Target', next);
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
    this.listOfTarget = [];
    this.getList();
  }

  getRAbilityList() {
    this.collegeTargetRelationService.getRAbilityList().subscribe(
      next => {
        if (next.code === 200) {
          this.listOfRAbility = next.data;
          console.log('getRAbilityList', next);
        }
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  handleCancel(): void {
    this.validateForm.reset();
    this.isVisible = false;
  }

  /**
   * 获取专业列表
   */
  getList() {
    this.collegeTargetRelationService.getTargetList().subscribe(
      next => {
        this.listOfTarget = next.data;
        console.log('TargetList', next);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

}
