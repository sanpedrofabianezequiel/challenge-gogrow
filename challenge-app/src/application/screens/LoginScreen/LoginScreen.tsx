import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import image from "../../assets/image.png";
import { SignUp } from "../../components/SignUp";

export const LoginScreen = (props: any) => {
  const [spacing, ] = React.useState(0);

  return (
    <div style={{ marginTop: "200px" }}>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={spacing}>
            <Grid item>
              <Paper
                elevation={3}
                sx={{
                  height: 700,
                  width: 500,
                  backgroundColor: () => "#1F485B",
                }}
              >
                <img src={logo} alt='logo' style={{ marginTop: "10px", marginLeft: "10px", backgroundColor: "#1F485B", height: "50px", width: "50px" }} />

                <div style={{ color: "#FFFFFF", marginLeft: "20px", fontWeight: "600" }}>Getting Started With VR Creation</div>
                <img src={image} alt='logoPrincipal' style={{ marginTop: "100px", marginLeft: "40px", backgroundColor: "#1F485B", height: "500px", width: "500px" }} />
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                elevation={3}
                sx={{
                  height: 700,
                  width: 500,
                  backgroundColor: () => "#fff",
                }}
              >
                <Grid container>
                  <Grid item xs={12} style={{ marginTop: "100px", marginLeft: "100px" }}>
                    <Typography variant="h6" style={{ fontWeight: "600" }}>
                      Create Account
                    </Typography>
                  </Grid>
                  <Grid item xs={6} style={{ marginTop: "20px", marginLeft: "60px" }}>
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                  </Grid>
                  <Grid item xs={2} style={{ marginTop: "20px" }}>
                    <img className="google-icon" style={{ height: "30px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Jq43r07TSs3GSlqA1XVAxxRJriJpK6so7oLY_J1onCyV2vQdvtwp2c1jMmnCRJMWOA&usqp=CAU" alt="google button" />
                  </Grid>
                  <SignUp />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
