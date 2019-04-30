import {Component, OnInit} from '@angular/core';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {ImportExcelService} from './import-excel.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})
export class ImportExcelComponent implements OnInit {

  uploading = false;
  fileList: UploadFile[] = [];

  constructor(private msg: NzMessageService, private resourceService: ImportExcelService) {
  }


  /**
   * 上传文件
   *
   */
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    console.log('add file ', file);
    return false;
  };

  /**
   * excel导入数据
   */

  handleUpload(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    this.uploading = true;
    console.log('filelist', this.fileList);
    this.resourceService.upload(formData).subscribe(
      (event: {}) => {
        this.uploading = false;
        this.msg.success('upload successfully.');
      },
      err => {
        this.uploading = false;
        if (err.status === 404) {
          this.msg.success('upload successfully.');
        } else {
          this.msg.error('upload failed.');
        }
      }
    );
  }


  ngOnInit() {
  }

}
