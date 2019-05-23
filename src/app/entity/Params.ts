export class StudentParam {
  studentName: string;
  studentNum: string;
  classId: number;
}

/**
 * 添加教师所需要的参数
 */
export class TeacherParam {
  teacherName: string;
  teacherNum: string;
  positionId: number;
  sex: number;
}
/**
 * 教师权限更新参数
 */
export class TeacherRoleParam {
  /**
   * 教师id
   */
  teacherId: number;
  /**
   * 权限id
   */
  roleId: Array<number>[];
}
