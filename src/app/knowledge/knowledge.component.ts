import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseTargetResponse} from '../entity/CourseTargetResponse';
import {Course} from '../entity/Course';
import {KnowledgeService} from './knowledge.service';
import {Knowledge} from '../entity/Knowledge';
import {KnowledgeResponse} from '../entity/KnowledgeResponse';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss']
})
export class KnowledgeComponent implements OnInit {

  constructor(private fb: FormBuilder, private knowledgeService: KnowledgeService) {
  }

  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  listOfCollege = [];
  // 课程目标按照课程的分组列表
  listOfTarget: Array<CourseTargetResponse> = [];

  listOfCourse: Array<Course> = [];
  listOfKnowledges: Array<KnowledgeResponse> = [];
  value: 'string';

  selectedCollege = null;
  selectedCourse = null;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      majorName: [null, [Validators.required]],
      courseName: [null, [Validators.required]],
      knowledgeList: [null, [Validators.required]],
    });
    this.initKnowledgeData();
  }

  initKnowledgeData() {
    this.knowledgeService.getKnowledge().subscribe(
      next => {
        if (next.code === 200) {
          this.listOfKnowledges = next.data;
          console.log('knowledge', next.data);
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

  /**
   * 添加专业目标
   */

  addKnowledge(): void {
    this.isVisible = true;
    this.getCollegeList();
    // this.getRAbilityList();
  }

  getCollegeList() {
    this.knowledgeService.getCollegeList().subscribe(
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
    const knowledgeList = this.validateForm.get('knowledgeList').value;
    const regex = /\[(.+?)\]/g;
    const options = knowledgeList.match(regex);
    const list = [];
    options.forEach(
      item => {
        const afterDeal = item.replace(/\[|]/g, '');
        const tempArray = afterDeal.split('/');
        const knowledgeEntity = new Knowledge();
        knowledgeEntity.name = tempArray[0];
        knowledgeEntity.percent = tempArray[1];
        knowledgeEntity.courseId = courseName;
        list.push(knowledgeEntity);
      }
    );
    this.knowledgeService.addKnowledges(list).subscribe(
      next => {
        if (next.code === 200) {
          console.log('knowledge', next.data);
        }
      },
      (err: Error) => {
        console.log(err);
      },
      () => {
        this.isOkLoading = false;
        this.isVisible = false;
        this.listOfKnowledges = [];
        this.initKnowledgeData();

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
   * 课程列表
   */
  getCourseList() {
    this.knowledgeService.getCourseList(this.selectedCollege).subscribe(
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
