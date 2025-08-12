function buildGenericQueryString(data: Record<string, any>): string {
  const parts: string[] = [];
  let count = 0;

  for (const key in data) {
    // 객체 자신의 속성만 처리 (프로토타입 체인에 있는 속성 제외)
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      // 첫 번째 파라미터가 아니면 '&' 추가
      parts.push(`${count > 0 ? '&' : ''}${key}=${value}`);
      count++;
    }
  }

  return parts.join(''); // 이미 '&'가 추가되었으므로 join('')
}

export default buildGenericQueryString;
