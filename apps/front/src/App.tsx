import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { NavigationBar } from "./widgets/NavigationBar";
import styled from "@emotion/styled";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

const Wrapper = styled.div`
  margin-top: 60px;
`;
