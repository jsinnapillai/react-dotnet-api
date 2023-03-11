import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const ServerError = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography gutterBottom variant="h3" color="secondary">
            {state.error.title}{" "}
          </Typography>
          <Divider></Divider>
          <Typography variant="body1">
            {state.error.detail || "Internal Server Error"}
          </Typography>
        </>
      ) : (
        <Typography gutterBottom variant="h5">
          Server Error
        </Typography>
      )}
      <Button onClick={() => navigate("/catalog")}>
        {" "}
        Go back to the store
      </Button>
    </Container>
  );
};

export default ServerError;
