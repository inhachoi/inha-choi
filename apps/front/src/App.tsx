import { useQuery } from "@tanstack/react-query";

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const res = await fetch("/api/hello");
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred 😢</div>;

  return (
    <div style={{ fontSize: "20px", padding: "20px" }}>
      <h1>Front ↔ Server 연결 성공 🎉</h1>
      <p>{data.message}</p>
      <p>Time: {data.time}</p>
    </div>
  );
}

export default App;
