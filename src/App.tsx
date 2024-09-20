import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/mainPage/mainPage";
import LoginPage from "./pages/loginPage/loginPage";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import RegisterPage from "./pages/registerPage/registerPage";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        {
          path: "",
          element: <MainPage />,
        },
      ],
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
  ]);

  const theme = createTheme({
    palette: {
      primary: { main: "#202020" },
      secondary: { main: "# 949494" },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
