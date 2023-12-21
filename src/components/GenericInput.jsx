import { useContext, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../provider/StoreProvider";
import { Toast, ToastTitle, Toaster, useToastController } from "@fluentui/react-components";

const GenericInput = () => {
  const navigate = useNavigate();
  const { I18N } = useContext(StoreContext);
  const [roomId, setRoomId] = useState();
  const tenebraRoomJoinToast = useId("tenebraRoomJoinToast");
  const { dispatchToast } = useToastController(tenebraRoomJoinToast);
  const handleRoomIdChange = (e) => {
    setRoomId(e.target.value);
  };
  const handleRoomIdSubmit = () => {
    if (roomId) {
      navigate(`room/${roomId}`);
    } else {
      dispatchToast(
        <Toast>
          <ToastTitle>{I18N.DASHBOARD.JOIN.TOAST}</ToastTitle>
        </Toast>,
        { position: "bottom", intent: "error", tenebraRoomJoinToast }
      );
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span className="userInputLabel">{I18N.DASHBOARD.JOIN.PLACEHOLDER}</span>
        <div className="userInputContainer">
          <div>
            <input
              className="inputBox"
              type="text"
              style={{ width: "15rem" }}
              name="nickname"
              placeholder={I18N.DASHBOARD.JOIN.PLACEHOLDER}
              onChange={handleRoomIdChange}
              maxLength={18}
            />
          </div>
          &nbsp;
          <button className="buttonBox" onClick={handleRoomIdSubmit}>
            {I18N.INPUT.CONFIRM}
          </button>
          <Toaster toasterId={tenebraRoomJoinToast} />
        </div>
      </div>
    </div>
  );
};
export default GenericInput;
