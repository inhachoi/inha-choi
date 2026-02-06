import { BrowserRouter } from "react-router-dom";

import { Footer,NavigationBar } from "@/widgets";

import { AppRouter } from "./routes/AppRouter";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />

      <NavigationBar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
