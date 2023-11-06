import { RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import { router } from "./routes";
import useWindowDimension from "./components/useWindowDimension";
import BrowserUnsupported from "./components/BrowserUnsupported";

const App = () => {
  const dimension = useWindowDimension();
  return (
    <div className="mainBox">
      {(dimension.height > dimension.width && dimension.width < 767 && dimension.height < 767) ||
      /Mobi|Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|Mobile|webOS|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (
        <BrowserUnsupported />
      ) : (
        <RouterProvider router={router} />
      )}
      <Navbar />
    </div>
  );
};

export default App;
