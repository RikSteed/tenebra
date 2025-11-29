import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../provider/StoreProvider";
import { v4 as uuid4 } from "uuid";
import { joinRoom } from "trystero";
import InputNickname from "./InputNickname";
import RoomEditor from "./RoomEditor/RoomEditor";
import { Toast, ToastTitle, Toaster, useId, useToastController } from "@fluentui/react-components";
import User from "./User";

const Room = () => {
  const { user, I18N } = useContext(StoreContext);
  const { room } = useParams();
  const [isUserLogged, setUserLogged] = useState(user !== undefined);
  const [connectedUsers, setConnectedUser] = useState([]);
  const [code, setCode] = useState("");
  const [active, setActive] = useState(null);
  const toasterId = useId("tenebraToast");
  const { dispatchToast } = useToastController(toasterId);

  const peerRoomRef = useRef(null);
  const sendCodeRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  const handleUserLogin = () => {
    setUserLogged(true);
  };

  const showToast = useCallback(
    (message, intent = "info") => {
      dispatchToast(
        <Toast>
          <ToastTitle>{message}</ToastTitle>
        </Toast>,
        { position: "bottom", intent, toastId: uuid4() }
      );
    },
    [dispatchToast]
  );

  const handleUserConnection = useCallback(
    (newUser, isRemoving) => {
      if (isRemoving) {
        showToast(I18N.ROOM.LEFT, "info");
        setConnectedUser((prev) => prev.filter((_user) => _user.peerId !== newUser.peerId));
      } else {
        setConnectedUser((prev) => {
          const exists = prev.some((_user) => _user.peerId === newUser.peerId);
          if (exists) return prev;
          if (newUser.peerId) {
            showToast(I18N.ROOM.JOIN, "success");
          }
          return [...prev, newUser];
        });
      }
    },
    [I18N, showToast]
  );

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!peerRoomRef.current) {
      handleUserConnection(user, false);

      const config = { appId: room };
      peerRoomRef.current = joinRoom(config, "tenebra");
      const [sendUser, getUser] = peerRoomRef.current.makeAction("name");
      const [sendCode, getCode] = peerRoomRef.current.makeAction("code");
      sendCodeRef.current = sendCode;

      peerRoomRef.current.onPeerJoin((peerId) => {
        sendUser(user, peerId);
        if (code) {
          sendCode(code);
        }
      });

      getUser((userPeer, peerId) => {
        const peerUser = { ...userPeer, peerId };
        handleUserConnection(peerUser, false);
      });

      getCode((receivedCode, peerId) => {
        if (resetTimeoutRef.current) {
          clearTimeout(resetTimeoutRef.current);
        }
        setActive(peerId);
        setCode(receivedCode);
        resetTimeoutRef.current = setTimeout(() => {
          setActive(null);
        }, 1000);
      });

      peerRoomRef.current.onPeerLeave((peerId) => {
        setConnectedUser((prevUsers) => {
          const userToRemove = prevUsers.find((u) => u.peerId === peerId);
          if (userToRemove) {
            handleUserConnection(userToRemove, true);
          }
          return prevUsers;
        });
      });
    }

    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      if (peerRoomRef.current) {
        peerRoomRef.current.leave();
        peerRoomRef.current = null;
      }
      sendCodeRef.current = null;
    };
  }, [user, room, handleUserConnection, code]);

  const handleOnChange = useCallback((data) => {
    setCode(data);
    if (sendCodeRef.current) {
      sendCodeRef.current(data);
    }
  }, []);
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
