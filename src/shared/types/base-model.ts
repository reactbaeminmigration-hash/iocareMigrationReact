import { BaseHeader } from './base-header';

export class BaseModel {
  header: BaseHeader = new BaseHeader();
  body: any = null;

  constructor(_trcode: string) {
    this.header.trcode = _trcode;
  }
}
