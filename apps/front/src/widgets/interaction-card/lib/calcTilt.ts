export function calcTilt(x: number, y: number) {
  const rotateX = (4 / 30) * y - 20;
  const rotateY = (-1 / 5) * x + 20;
  const backgroundPosition = `${x / 5 + y / 5}%`;

  return { rotateX, rotateY, backgroundPosition };
}
