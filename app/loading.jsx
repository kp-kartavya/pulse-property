"use client";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
  borderColor: "blue",
};

const LoadingPage = ({loading}) => {
  return (
    <div>
      <ClipLoader
        color={"blue"}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default LoadingPage;
