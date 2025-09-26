/**
 * 값이 null, undefined 또는 빈 문자열인지 확인합니다.
 * TypeScript의 타입 가드(`is`)를 사용하여, 이 함수가 true를 반환하면
 * 해당 스코프에서 값의 타입이 `null | undefined | ''`으로 좁혀집니다.
 *
 * @param value 확인할 값 (unknown 타입으로 다양한 값을 받을 수 있습니다)
 * @returns `true`이면 값이 null, undefined 또는 빈 문자열입니다.
 */
export const isNilOrEmptyString = (
  value: unknown,
): value is null | undefined | '' => {
  // `== null`은 `null`과 `undefined`를 모두 확인하는 단축 표현입니다.
  return value == null || value === '';
};
