import { BrowserRouter } from "react-router-dom";
import { NavigationBar, Footer } from "@/widgets";
import { GlobalStyles } from "./styles/GlobalStyles";
import { AppRouter } from "./routes/AppRouter";

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
