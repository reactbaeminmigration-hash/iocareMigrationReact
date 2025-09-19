export const TIME_LIKE_US = [
  'en-US',
  'en-GB',
  'en-AU',
  'en-CA',
  'en-IN',
] as const;
export const TIME_LIKE_KR = ['ko-KR', 'ja-JP', 'zh-CN'] as const;

export type TimeLikeUs = (typeof TIME_LIKE_US)[number];
export type TimeLikeKr = (typeof TIME_LIKE_KR)[number];
