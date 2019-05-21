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
