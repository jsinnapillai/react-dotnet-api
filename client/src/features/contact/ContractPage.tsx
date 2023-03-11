import { Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

const ContactPage = () => {
  const dispathch = useAppDispatch();
  const { data, title } = useAppSelector((state) => state.counter);
  return (
    <React.Fragment>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="h2">The data is {data}</Typography>
      <ButtonGroup>
        <Button
          onClick={() => dispathch(increment(1))}
          variant="contained"
          color="primary"
        >
          increment
        </Button>
        <Button
          onClick={() => dispathch(decrement(1))}
          variant="contained"
          color="secondary"
        >
          decrement
        </Button>

        <Button
          onClick={() => dispathch(increment(5))}
          variant="contained"
          color="error"
        >
          increment by 5
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
};

export default ContactPage;
