import React from "react";
import useFetch from "react-fetch-hook";
import Alert from "@mui/material/Alert";

export const useGetData = (rackID) => {
  const { isLoading, data, error } = useFetch(
    "https://my-json-server.typicode.com/CoreNest/TestIO/rack" + rackID.toString()
  );

  if (error) {
    return (
      <>
        <Alert severity="error">
          error kod {error.status}: {error.statusText}
        </Alert>
        <Alert severity="info">
          no data https://my-json-server.typicode.com/CoreNest/TestIO/rack{rackID.toString()}
        </Alert>
      </>
    );
  }

  return { isLoading, data };
};

const percentage = (a, b) => (a / b) * 100;

const Rack = (props) => {
  const { isLoading, data } = useGetData(props.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const capacity = data[0].capacity;
  const slots = data[0].slots.length;
  if (props.max) {
    return <div>{capacity}</div>;
  }
  return <div>{percentage(slots, capacity)}%</div>;
};

export default Rack;
