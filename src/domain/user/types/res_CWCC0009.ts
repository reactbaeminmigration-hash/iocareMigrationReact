import { BaseModel } from '../../../shared/types/base-model';

/** 청정기 (홈) RESPONSE */
export class CWCC0009Res extends BaseModel {
  constructor(trcode: string) {
    super(trcode);
    this.body = {
      accessToken: '', // 인증 토큰
      refreshToken: '', // 갱신 토큰
    };
  }
}
