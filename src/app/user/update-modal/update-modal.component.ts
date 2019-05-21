import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {
  isVisible: boolean;

  /**
   * 外部传入的 isVisible
   */
  @Input() isVisibleInput: boolean;

  constructor() {}

  ngOnInit() {
    this.isVisible = this.isVisibleInput;
  }
}
