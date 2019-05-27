import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CollegeTargetComponent } from './college-target/college-target.component';
import { CollegeTargetRelationComponent } from './college-target-relation/college-target-relation.component';
import { CourseDirectionComponent } from './course-direction/course-direction.component';
import { CourseTargetComponent } from './course-target/course-target.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
