// 배열 섞기: Fisher-Yates shuffle 알고리즘 사용
export const shuffleArray = (array: string[]) => {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

// 점점 느려지는 롤링 delay 계산값 반환
export const getRollInterval = (index: number) => {
  const startSpeed = 10;
  const cumulativeSpeed = 50;

  return startSpeed + index * cumulativeSpeed;
};
