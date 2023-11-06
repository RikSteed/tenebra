import { useContext } from "react";
import { StoreContext } from "../provider/StoreProvider";

const User = ({ active, key, name, isRoomUser }) => {
  const { I18N } = useContext(StoreContext);
  return (
    <div className="userBoxContainer" key={key || "1"}>
      <div className="userAvatarPlaceholder" style={{ border: active ? "2px solid #fce7c2" : "2px solid #000" }}>
        {name[0]}
      </div>
      <div className="userNameAndActive">
        <div style={{ fontWeight: "400" }}>
          {name}&nbsp;{isRoomUser && `(${I18N.MISC.YOU})`}
        </div>
        <div>{active && I18N.ROOM.WRITING}</div>
      </div>
    </div>
  );
};

export default User;
