export function Main() {
  return (
    <>
      {Array.from({ length: 100 }).map((_, index) => (
        <div key={index}>Main 화면 개발 중...</div>
      ))}
    </>
  );
}
