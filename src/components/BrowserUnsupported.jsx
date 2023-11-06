import { useContext } from "react";
import { StoreContext } from "../provider/StoreProvider";

const BrowserUnsupported = () => {
  const { I18N } = useContext(StoreContext);
  return (
    <div className="component">
      <h1 className="errorMessageBox">{I18N.BROWSER.UNSUPPORTED}</h1>
    </div>
  );
};
export default BrowserUnsupported;
