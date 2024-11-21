import { useContext } from "react";
import Divider from "./divider";
import RecievedMessage from "./recieved";
import SendMessage from "./send-message";
import SentMessage from "./sent";
import { DashBoardContex } from "..";
import { auth } from "../../../firebase-settings";

const ChatComponent = () => {
  const { selectedChat } = useContext(DashBoardContex);

  return (
    <div className="h-[90.8vh] top-[3.3rem] w-9/12 fixed left-[20.1rem]">
      {selectedChat && (
        <div className="scrollbar-sm grow overflow-scroll px-[calc(var(--margin-x)-.5rem)] md:px-12 lg:px-8 py-5 transition-all h-full duration-[.25s]">
          <Divider />
          {selectedChat?.messages?.map((message, index) => {
            return message?.encoder?.id === auth.currentUser?.uid ? (
              <SentMessage {...message} key={index} />
            ) : (
              <RecievedMessage {...message} key={index} />
            );
          })}
        </div>
      )}

      <SendMessage />
    </div>
  );
};

export default ChatComponent;
