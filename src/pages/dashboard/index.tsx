import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Appbar from "./components/appbar";
import ChatComponent from "./components/chat-component";
import RightSidebar from "./components/right-sidebar";
import Sidebar from "./components/sidebar";
import { Chat, User } from "../../types";
import { notify, NotificationComponent } from "./components/notification";
import useFetchChatUser from "./hooks/useFetchChatUser";
import useGetChat from "./hooks/useGetChat";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-settings";

export const DashBoardContex = createContext<
  Partial<{
    showRightSidebar: boolean;
    setShowRightSidebar: Dispatch<SetStateAction<boolean>>;
    selectedChat: Chat | null;
    updateSelectedChat: Dispatch<SetStateAction<Chat | null>>;
    selectedUserId: string;
    setSelectedUserId: Dispatch<SetStateAction<string>>;
    chatUser: User | null;
    setChatUser: Dispatch<SetStateAction<User | null>>;
  }>
>({});

const DashBoard = () => {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [selectedChat, updateSelectedChat] = useState<Chat | null>(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [chatUser, setChatUser] = useState<User | null>(null);

  const handleNotification = () => {
    notify(<NotificationComponent message="Error fetching use" />, {
      style: { background: "red", color: "white" },
    });
  };

  useEffect(() => {
    try {
      
      const docRef = doc(db, "chats", selectedChat?.id as string);

      // Set up the listener
      onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          const _result = { ...doc.data(), id: doc.id } as Chat;
          updateSelectedChat(_result);
        }
      });
    } catch (error) {
      console.log(error)
    }
    // Cleanup function to unsubscribe from the listener
  }, [selectedChat?.id]);

  useGetChat({
    chatUser: chatUser!,
    setChat: updateSelectedChat,
    notify: handleNotification,
  });

  useFetchChatUser({
    selectedUserId,
    notify: handleNotification,
    setChatUser: setChatUser,
  });

  // console.log("selected chat", selectedChat);
  // console.log("selected user", chatUser);

  return (
    <DashBoardContex.Provider
      value={{
        showRightSidebar,
        setShowRightSidebar,
        selectedChat,
        updateSelectedChat,
        selectedUserId,
        setChatUser,
        chatUser,
        setSelectedUserId,
      }}
    >
      <div
        id="root"
        className="min-h-100vh flow-row flex grow bg-slate-50 dark:bg-navy-900"
      >
        <Appbar />
        <Sidebar />
        <ChatComponent />
        {showRightSidebar && <RightSidebar />}
      </div>
    </DashBoardContex.Provider>
  );
};

export default DashBoard;
