import { useContext, useState } from "react";
import { StoreContext } from "../provider/StoreProvider";

const InputNickname = ({ isCreatedUser }) => {
  const { I18N, addUser } = useContext(StoreContext);
  const [nickname, setNickname] = useState("User");

  const handleNickChange = (e) => {
    setNickname(e.target.value);
  };
  const handleNickSubmit = () => {
    addUser({ nickname });
    isCreatedUser();
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span className="userInputLabel">{I18N.USER.NICKNAME}</span>
        <div className="userInputContainer">
          <input
            className="inputBox"
            type="text"
            style={{ width: "15rem" }}
            name="nickname"
            placeholder={I18N.USER.PLACEHOLDER}
            onChange={handleNickChange}
            maxLength={18}
          />
          &nbsp;
          <button className="buttonBox" onClick={handleNickSubmit}>
            {I18N.INPUT.CONFIRM}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputNickname;
