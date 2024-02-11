import "./LoaderLite.css";
import { Circles } from "react-loader-spinner";

const LoaderLite = () => {
  return (
    <div className="loader-area">
      <div className="loader">
        <Circles
          height="80"
          width="80"
          color="#1B5A90"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default LoaderLite;
