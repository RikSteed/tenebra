import { useContext, useState } from "react";
import { StoreContext } from "../provider/StoreProvider";
import tenebra from "../assets/tenebralfgo.gif";
import { Collapse, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuid4 } from "uuid";
import InputNickname from "./InputNickname";

const Dashboard = () => {
  const navigate = useNavigate();
  const { I18N, user } = useContext(StoreContext);
  const [isUserLogged, setUserLogged] = useState(false);
  const handleUserLogin = () => {
    setUserLogged(true);
  };
  const handleCreateNewRoom = () => {
    const room = uuid4();
    navigate(`room/${room}`);
  };
  const handleJoinRoom = () => {};
  return (
    <div className="component">
      {!isUserLogged || !user ? (
        <>
          <img alt="tenebra" className="dashboardLogo" src={tenebra} />
          <h4 className="dashboardDescription">{I18N.DASHBOARD.DESCRIPTION}</h4>
          <br />
          <InputNickname isCreatedUser={handleUserLogin} />
        </>
      ) : (
        ""
      )}
      <br />
      <Collapse timeout={500} in={isUserLogged}>
        {isUserLogged && (
          <div className="dashboardButtonsParent">
            <button className="buttonBox" onClick={handleCreateNewRoom}>
              {I18N.DASHBOARD.NEWROOM}
            </button>
            <h3 className="dashboardOr">{I18N.DASHBOARD.OR}</h3>
            <Tooltip classes={{ tooltip: "popperTooltip", touch: "popperTooltip" }} title={I18N.MISC.BETA} placement="bottom">
              <span>
                <button className="buttonBox" onClick={handleJoinRoom} disabled>
                  {I18N.DASHBOARD.JOINROOM}
                </button>
              </span>
            </Tooltip>
          </div>
        )}
      </Collapse>
    </div>
  );
};

export default Dashboard;
