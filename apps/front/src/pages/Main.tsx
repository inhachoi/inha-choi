export function Main() {
  return (
    <>
      {Array.from({ length: 100 }).map((_, index) => (
        <div key={index}>언주 바보 ㅋㅋ</div>
      ))}
    </>
  );
}
