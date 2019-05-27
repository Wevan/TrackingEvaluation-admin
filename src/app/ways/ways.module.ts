import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WaysRoutingModule} from './ways-routing.module';
import {WaysComponent} from './ways.component';
import {SharedModule} from '../shared/shared.module';
import {WaysService} from './ways.service';

@NgModule({
  declarations: [WaysComponent],
  imports: [
    CommonModule,
    WaysRoutingModule,
    SharedModule
  ],
  providers: [WaysService]
})
export class WaysModule {
}
