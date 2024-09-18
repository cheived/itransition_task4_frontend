import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const RegisterPage = () => {
  const textFieldSx: SxProps = { width: "100%" };
  return (
    <>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper elevation={4} sx={{ padding: 2 }}>
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
              <Typography variant="h6">
                Enter your email and password
              </Typography>
              <Link to="/login" component={RouterLink}>
                Want to log in?
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
              <TextField label="Name" sx={textFieldSx} />
              <TextField label="Email" sx={textFieldSx} />
              <TextField label="Password" sx={textFieldSx} />
            </Box>

            <Button variant="contained" sx={textFieldSx}>
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default RegisterPage;
