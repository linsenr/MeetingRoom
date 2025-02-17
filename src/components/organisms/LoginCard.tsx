import {
  Box,
  Card,
  CardActions,
  CardContent,
  styled,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { COLORS } from "../../values/colors";

export type LoginCardProps = {
  onLoginClicked?: () => void;
  isLoading: boolean;
};

const LoginButton = styled(LoadingButton)`
  borderradius: 28px;
  color: ${COLORS.white};
  background-color: ${COLORS.srs_green};

  &:hover {
    color: ${COLORS.white};
    background-color: ${COLORS.srs_green};
  }
`;

const LoginCard = (props: LoginCardProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="h4" component="div">
            Log in
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome! Please login with your account
            <br />
            to proceed system authentication
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 1,
          }}
        >
          <LoginButton
            variant="contained"
            size="large"
            loading={props.isLoading}
            sx={{
              width: "100%",
            }}
            onClick={props.onLoginClicked}
          >
            LOGIN
          </LoginButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default LoginCard;
