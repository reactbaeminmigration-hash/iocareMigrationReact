import type { resources } from '@/core/i18n/i18n';
import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    // 기본 네임스페이스 타입을 'translation'으로 설정합니다.
    defaultNS: 'translation';
    // 리소스 타입을 우리가 정의한 resources 객체의 타입으로 설정합니다.
    // 'ko'를 기준으로 모든 키의 타입을 추론합니다.
    resources: (typeof resources)['ko'];
  }
}
