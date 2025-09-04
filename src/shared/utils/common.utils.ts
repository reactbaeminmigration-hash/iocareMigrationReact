// 유닉스 타임스탬프를 스트링으로 변환 (yyyymmdd)
export function timeStampToString(timeStamp: string) {
  if (!timeStamp) return '';
  const timeDate = new Date(Number(timeStamp));
  const yyyy = String(timeDate.getFullYear());
  const mm = String(timeDate.getMonth() + 1).padStart(2, '0');
  const dd = String(timeDate.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

export function nowToString() {
  const now = new Date();
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}
