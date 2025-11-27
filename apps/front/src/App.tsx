import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main, Posts, Study, Visitor } from "./pages";
import { NavigationBar } from "./widgets/NavigationBar";
import styled from "@emotion/styled";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <RoutesWrapper>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/Study" element={<Study />} />
          <Route path="/Visitor" element={<Visitor />} />
        </Routes>
      </RoutesWrapper>
    </BrowserRouter>
  );
}

export default App;

const RoutesWrapper = styled.div`
  margin-top: 60px;
`;
