export class StudentInfo {
  /**
   * 学生id
   */
  id: number;
  /**
   * 名字
   */
  name: string;
  /**
   * 学号
   */
  studentNumber: string;
  /**
   * 班级号
   */
  classId: number;
  /**
   * 班级名称
   */
  class: string;
}

/**
 * 学生详细信息
 */
export class StudentProfileInfo {
  id: number = 0;
  email: String = 'null';
  idcard: String = 'null';
  name: String;
  phone: String = 'null';
  /**
   * 学号
   */
  studentNumber: String;

  qq: String = 'null';
  /**
   * 班级号
   */
  classNumber: String;
}
/**
 * 在列表上的教师信息
 *
 */
export class TeacherInfo {
  /**
   * teacher id
   */
  id: number;
  /**
   * 姓名
   */
  name: string;
  /**
   * 职位
   */
  position: string;
  /**
   * 职位id
   */
  positionId: number;
  /**
   * 教师号
   */
  teacherNumber: string;

  sex: string;
}

/**
 * 教师详细信息
 */
export class TeacherProfileInfo {
  id: number;
  name: string;
  jobNumber: string;
  sex: string;
  tel: string;
}
/**
 * 试题详情信息
 */
export class TitleProfileInfo {
  id: number;
  title: string;
  analysis: string;
  category: string;
  difficulty: number;
  knowledge: string;
  sectionA: string;
  sectionB: string;
  sectionC: string;
  sectionD: string;
}
