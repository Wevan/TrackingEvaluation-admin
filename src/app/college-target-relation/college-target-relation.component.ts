import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CollegeTargetRelationService} from './college-target-relation.service';
import {CollegeResponse} from '../entity/CollegeResponse';
import {CollegeTarget} from '../entity/CollegeTarget';
import {CollegeAndAbility} from '../entity/CollegeAndAbility';
import {CollegeAndAbilityEntity} from '../entity/CollegeAndAbilityEntity';

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
  listOfTarget: Array<CollegeTarget> = [];
  listOfCA: Array<CollegeAndAbility> = [];
  value: 'string';

  selectedCollege = null;
  selectedRAbility = null;

  listOfRAbility = [];

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      majorName: [null, [Validators.required]],
      graduateName: [null, [Validators.required]],
      relation: [null, [Validators.required]],
    });
    this.initCAdata();
  }

  /**
   * 初始化展示数据
   */
  initCAdata() {
    this.collegeTargetRelationService.getAbilityTargetList().subscribe(
      next => {
        if (next.code === 200) {
          this.listOfCA = next.data;
          console.log('listOfCA', next);
        }
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  /**
   * 添加关系
   */

  addCollegeAndAbility(): void {
    this.isVisible = true;
    this.getCollegeList();
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
    const graduateName = this.validateForm.get('graduateName').value;
    const relation = this.validateForm.get('relation').value;
    console.log('The msg is ', majorName, ',', graduateName, ',', relation);
    const list = [];
    let counter = -1;
    const options = relation.split('/');
    options.forEach(
      item => {
        counter++;
        const collegeAbilityRelation = new CollegeAndAbilityEntity();
        collegeAbilityRelation.abilityId = graduateName;
        collegeAbilityRelation.collegeId = majorName;
        collegeAbilityRelation.collegeTargetId = this.listOfTarget[counter].id;
        collegeAbilityRelation.percent = item;
        list.push(collegeAbilityRelation);
      }
    );
    console.log('relation list', list);
    this.collegeTargetRelationService.addCollegeAndAbility(list).subscribe(
      next => {
        if (next.code === 200) {
          console.log('collegeTargetRelationService', next);
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
    this.listOfCA = [];
    this.listOfCollege = [];
    this.listOfRAbility = [];
    this.initCAdata();
  }

// 选择框中专业选择后的改变
  collegeChange() {
    this.getRAbilityList();
  }

  getRAbilityList() {
    this.collegeTargetRelationService.getRAbilityList(this.selectedCollege).subscribe(
      next => {
        if (next.code === 200) {
          this.listOfRAbility = next.data;
          console.log('getRAbilityList', next);
        }
      },
      (err: Error) => {
        console.log(err);
      }, () => {
        this.getCollegeTargetList();
      }
    );
  }

  handleCancel(): void {
    this.validateForm.reset();
    this.isVisible = false;
  }

  /**
   * 获取专业目标列表
   */
  getCollegeTargetList() {
    this.collegeTargetRelationService.getTargetList(this.selectedCollege).subscribe(
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
