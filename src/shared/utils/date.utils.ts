export const formatTimestampToYyyyMmDdHhNn = (
  timestamp: string | number | undefined | null,
): string => {
  if (!timestamp) {
    return '';
  }

  try {
    const date = new Date(Number(timestamp));

    // Date 객체가 유효하지 않은 경우 (e.g., Number(timestamp)가 NaN일 때)
    if (isNaN(date.getTime())) {
      return '';
    }

    const pad = (num: number) => num.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // getMonth()는 0부터 시작합니다.
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}${month}${day}${hours}${minutes}`;
  } catch (error) {
    console.error('Failed to format timestamp:', error);
    return '';
  }
};

export function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
