import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-zens-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  private _titlesData: Array<{ title: string }> = [];
  private _itemsData: Array<any> = [];

  /**
   * 处理表格数据
   */
  @Input() set itemsData(itemsData: Array<any>) {
    this._itemsData = itemsData;
  }

  get itemsData(): Array<any> {
    return this._itemsData;
  }

  /**
   * 处理标题，输入表格标题字段
   */
  @Input() set titleData(titleData: Array<{ title: string }>) {
    this._titlesData = titleData;
  }

  get titleData(): Array<{ title: string }> {
    return this._titlesData;
  }

  constructor() {}

  ngOnInit() {}
}
