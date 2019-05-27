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
  roleIds: Array<number>[];
}

export class TitleParam {
  id: number;
  title: string;
  answer: string;
  analysis: string;
  difficulty: number;
  courseId: number;
  knowledgeId: number;
  isOrder: number;
  category: string;
  sectionA: string;
  sectionB: string;
  sectionC: string;
  sectionD: string;
}
