import { Alert, Box, Snackbar } from "@mui/material";
import LoginCard from "../../components/organisms/LoginCard";
import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationProps } from "../../types/LocationProps";

const Login = () => {
  //   const auth = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation() as unknown as LocationProps;
  const from = location.state?.from?.pathname || "/";
  const [isLoginLoading, setLoading] = useState<boolean>(false);
  const [showErrorMsg, setShowErrMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowErrMsg(false);
    setErrorMsg("");
  };

  const handleLogin = () => {};

  //   const handleLogin = () => {
  //     setLoading(true);
  //     setTimeout(() => {
  //       auth?.signIn(async ({ isSuccess, errorMessage }) => {
  //         setLoading(false);
  //         if (isSuccess) {
  //           await refreshToken();
  //           await getAssessmentPanels();
  //           navigate(from, { replace: true });
  //         } else {
  //           navigate("/error", { replace: true });
  //         }
  //       });
  //     }, 500);
  //   };

  useEffect(() => {
    // handleLogin();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        background: "rgb(231, 235, 240)",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            flexBasis: 0,
          }}
        >
          {/* <CSDLogo /> */}
        </Box>
        <Box sx={{ minWidth: 275 }}>
          <LoginCard isLoading={isLoginLoading} onLoginClicked={handleLogin} />
          <Snackbar
            open={showErrorMsg}
            autoHideDuration={1000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={handleClose}
          >
            <Alert
              variant="filled"
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%", fontSize: "18px" }}
            >
              {errorMsg}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
