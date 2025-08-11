import { BaseModel } from '@/shared/types/base-model';

/** 청정기 (홈) REQUEST */
export class CWCC0009Req extends BaseModel {
  public body = {
    authCode: '', // 코드
    redirectUrl: '', // redirectUrl
  };
  constructor(TrCode: string) {
    super(TrCode);
  }
}
