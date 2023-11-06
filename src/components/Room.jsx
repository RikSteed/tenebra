import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../provider/StoreProvider";
import { v4 as uuid4 } from "uuid";
import { joinRoom } from "trystero";
import InputNickname from "./InputNickname";
import RoomEditor from "./RoomEditor/RoomEditor";
import { Toast, ToastTitle, Toaster, useId, useToastController } from "@fluentui/react-components";
import User from "./User";

let peerRoom;
let resetTimeout;
let sendCode;
let getCode;

const Room = () => {
  const { user, I18N } = useContext(StoreContext);
  const { room } = useParams();
  const [isUserLogged, setUserLogged] = useState(user !== undefined);
  const [connectedUsers, setConnectedUser] = useState([]);
  const [code, setCode] = useState("");
  const [active, setActive] = useState();
  const toasterId = useId("tenebraToast");
  const { dispatchToast } = useToastController(toasterId);

  const handleUserLogin = () => {
    setUserLogged(true);
  };

  const handleUserConnection = useCallback(
    (user, isRemoving) => {
      if (isRemoving) {
        const toastId = uuid4();
        dispatchToast(
          <Toast>
            <ToastTitle>{I18N.ROOM.LEFT}</ToastTitle>
          </Toast>,
          { position: "bottom", intent: "info", toastId }
        );
        return setConnectedUser((prev) => prev.filter((_user) => _user.peerId !== user.peerId));
      }
      return setConnectedUser((prev) => [...prev, user]);
    },
    [I18N, dispatchToast]
  );
  useEffect(() => {
    if (!user) {
      return;
    }
    if (!peerRoom) {
      handleUserConnection(user);
      const config = { appId: room };
      peerRoom = joinRoom(config, "tenebra");
      const [sendUser, getUser] = peerRoom.makeAction("name");
      [sendCode, getCode] = peerRoom.makeAction("code");
      peerRoom.onPeerJoin((peerId) => {
        sendUser(user, peerId);
        sendCode(code);
      });
      getUser((userPeer, peerId) => {
        userPeer.peerId = peerId;
        handleUserConnection(userPeer, false);
      });
      getCode((code, peerId) => {
        clearTimeout(resetTimeout);
        setActive(peerId);
        setCode(code);
        resetTimeout = setTimeout(() => {
          setActive(null);
        }, 1000);
      });
      peerRoom.onPeerLeave((peerId) => {
        const nickname = connectedUsers.find((user) => user.peerId === peerId);
        const userExit = { nickname, peerId };
        handleUserConnection(userExit, true);
      });
    }

    return () => {
      peerRoom.leave();
    };
  }, [user]);
  const handleOnChange = (data) => {
    sendCode(data);
  };
  return isUserLogged ? (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <RoomEditor handleOnChange={handleOnChange} value={code} />
      <div style={{ width: "20%", height: "100%", backgroundColor: "#141414" }}>
        <div style={{ padding: "1rem", display: "flex", flexDirection: "column" }}>
          {connectedUsers.map((user) => (
            <User
              key={user.peerId}
              isRoomUser={user.peerId ? false : true}
              active={user.peerId && active && user.peerId === active}
              name={user.nickname}
            />
          ))}
          <Toaster toasterId={toasterId} />
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InputNickname isCreatedUser={handleUserLogin} />
    </div>
  );
};

export default Room;
