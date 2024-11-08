import Divider from "./divider";
import RecievedMessage from "./recieved";
import SendMessage from "./send-message";
import SentMessage from "./sent";

const ChatComponent = () => {
  return (
    <div className="h-[90.8vh] top-[3.3rem] w-9/12 fixed left-[20.1rem]">
      <div className="scrollbar-sm grow overflow-scroll px-[calc(var(--margin-x)-.5rem)] md:px-12 lg:px-8 py-5 transition-all h-full duration-[.25s]">
        <Divider />
        <RecievedMessage />
        <SentMessage />
        <RecievedMessage />
      </div>

      <SendMessage />
    </div>
  );
}

export default ChatComponent;