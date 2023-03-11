import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Catalog from "../../features/catalog/catalog";

import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponenet";

const App = () => {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  const hanldeThemchangeHandler = () => {
    setDarkMode(!darkMode);
  };

  if (loading) return <LoadingComponent message="Initializing..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        theme="colored"
      ></ToastContainer>
      <CssBaseline />
      <Header
        darkMode={darkMode}
        handleThemeChange={hanldeThemchangeHandler}
      ></Header>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export default App;
