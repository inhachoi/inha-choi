import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main, Posts, Study, Visitor } from "./pages";
import { NavigationBar } from "./widgets/NavigationBar";
import styled from "@emotion/styled";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/Study" element={<Study />} />
          <Route path="/Visitor" element={<Visitor />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

const Wrapper = styled.div`
  margin-top: 60px;
`;
