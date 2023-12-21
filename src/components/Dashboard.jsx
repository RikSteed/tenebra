import { useContext, useState } from "react";
import { StoreContext } from "../provider/StoreProvider";
import tenebra from "../assets/tenebralfgo.gif";
import { Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuid4 } from "uuid";
import InputNickname from "./InputNickname";
import GenericInput from "./GenericInput";

const Dashboard = () => {
  const navigate = useNavigate();
  const { I18N, user } = useContext(StoreContext);
  const [isUserLogged, setUserLogged] = useState(false);
  const [isJoining, setJoining] = useState(false);
  const handleUserLogin = () => {
    setUserLogged(true);
  };
  const handleCreateNewRoom = () => {
    const room = uuid4();
    navigate(`room/${room}`);
  };
  const handleJoinRoom = () => {
    setJoining(true);
  };
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
      <Collapse timeout={1000} in={isUserLogged}>
        {isUserLogged && (
          <div className="dashboardButtonsParent">
            {!isJoining && (
              <>
                <button className="buttonBox" onClick={handleCreateNewRoom}>
                  {I18N.DASHBOARD.NEWROOM}
                </button>
                <h3 className="dashboardOr">{I18N.DASHBOARD.OR}</h3>
              </>
            )}
            <span>
              {!isJoining && (
                <button className="buttonBox" onClick={handleJoinRoom}>
                  {I18N.DASHBOARD.JOINROOM}
                </button>
              )}
              <Collapse timeout={1000} in={isJoining}>
                {isJoining && <GenericInput />}
              </Collapse>
            </span>
          </div>
        )}
      </Collapse>
    </div>
  );
};

export default Dashboard;
