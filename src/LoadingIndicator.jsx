import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Spinner from "./Spinner";

const LdngIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress && <Spinner />;
};

export default function LoadingIndicator({ state, setmyState }) {
  return (
    <>
      <button onClick={() => setmyState(!state)}>click</button>
      <LdngIndicator />
    </>
  );
}
