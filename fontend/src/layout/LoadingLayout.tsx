import { ReactElement } from "react";
import Spiner from "../component/Spiner/Spiner";

type props = {
  loading?: boolean;
  children?: ReactElement;
};

const LoadingLayout = ({ loading, children }: props) => {
  return (
    <div>
      {loading && <Spiner></Spiner>}

      {!loading && children}
    </div>
  );
};

export default LoadingLayout;
