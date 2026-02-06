// 점점 느려지는 롤링 delay 계산값 반환
export const calculateRollInterval = (index: number) => {
  const startSpeed = 10;
  const cumulativeSpeed = 50;

  return startSpeed + index * cumulativeSpeed;
};
