export const generateRandomColorCode = (): string => {
  // 0xffffff(16진수 FFFFFF)는 16777215(10진수)와 동일
  const randomNumber = Math.floor(Math.random() * 0xffffff);
  // 16진수 문자열로 변환하고, 6자리 부족 시 앞에 0을 채워준다.
  const hexString = randomNumber.toString(16).padStart(6, '0');
  return `#${hexString}`;
};
