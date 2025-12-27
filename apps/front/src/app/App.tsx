import { BrowserRouter } from "react-router-dom";
import { NavigationBar, Footer } from "@/widgets";
import { GlobalStyles } from "./GlobalStyles";
import { AppRouter } from "./routing/AppRouter";

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
