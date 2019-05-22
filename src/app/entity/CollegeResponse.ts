import {CollegeTarget} from './CollegeTarget';

export class CollegeResponse {
  collegeId: number;
  collegeName: string;
  collegeTargetList: Array<CollegeTarget>;
}
