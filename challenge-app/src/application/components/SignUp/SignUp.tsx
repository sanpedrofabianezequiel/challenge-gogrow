import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UseForm } from "../../hooks";
import { UserService } from "../../../services/Http";
import { ISignIn } from "../../interfaces";
import Swal from "sweetalert2";

const theme = createTheme();

export const SignUp = () => {
  const http = new UserService();

  const { handleInputChange, reset, values } = UseForm({
    correo: "",
    password: "",
    nombre: "",
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser(values);
    reset();
  };
  const createUser = async (props: ISignIn) => {
    const resp = await http.createUser(props || {});
    if (resp.ok) {
      Swal.fire({
        title: "Success",
        text: "User created successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "The user already exists",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField autoComplete="given-name" name="nombre" required fullWidth id="nombre" label="Full Name" autoFocus onChange={handleInputChange} value={values.nombre} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="Email Address" name="correo" autoComplete="email" onChange={handleInputChange} value={values.correo} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" onChange={handleInputChange} value={values.password} />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Create Account
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Log In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
