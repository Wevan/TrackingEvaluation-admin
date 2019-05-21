import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { StudentComponent } from './student/student.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './user.service';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateModalComponent } from './update-modal/update-modal.component';

@NgModule({
  declarations: [StudentComponent, TeacherComponent, AdminComponent, ProfileComponent, UpdateModalComponent],
  imports: [SharedModule, UserRoutingModule],
  providers: [UserService],
})
export class UserModule {}
