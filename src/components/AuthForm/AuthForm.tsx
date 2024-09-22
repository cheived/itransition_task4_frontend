import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";

interface IAuthForm {
  title: string;
  link: string;
  linkTo: string;
  buttonText: string;
  inputFields: IInputField[];
  sendTo: string;
}

interface IInputField {
  title: string;
}

interface FormData {
  [key: string]: string; // Каждый ключ будет строкой, и значение тоже строка
}

const AuthForm: FC<IAuthForm> = ({
  title,
  link,
  linkTo,
  buttonText,
  inputFields,
  sendTo,
}) => {
  const textFieldSx: SxProps = { width: "100%" };

  const { control, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function sendData(data: FormData) {
    console.log(data);
    try {
      setLoading(true);
      console.log(data);
      const response = await fetch(import.meta.env.VITE_API_URL + sendTo, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      localStorage.setItem(
        "token",
        JSON.stringify((await response.json()).access_token)
      );
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    }
  }

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={4} sx={{ padding: 2 }}>
        <form onSubmit={handleSubmit(sendData)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{title}</Typography>
              <Link to={linkTo} component={RouterLink}>
                {link}
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                width: "100%",
              }}
            >
              {inputFields.map((item, i) => {
                return (
                  <Controller
                    name={item.title.toLowerCase()}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        key={i}
                        label={item.title}
                        sx={textFieldSx}
                      />
                    )}
                  />
                );
              })}
            </Box>

            <Button type="submit" variant="contained" sx={textFieldSx}>
              {buttonText}
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </form>
      </Paper>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
};

export default AuthForm;
