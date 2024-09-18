import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const LoginPage = () => {
  return (
    <>
      <Container>
        <Paper elevation={1}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
          >
            <Typography>Enter your email and password</Typography>
            <TextField label="Email" />
            <TextField label="Password" />
            <Button variant="contained" style={{ flexGrow: 1 }}>
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
