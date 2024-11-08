import Appbar from "./components/appbar";
import ChatComponent from "./components/chat-component";
import RightSidebar from "./components/right-sidebar";
import Sidebar from "./components/sidebar";

export const DashBoard = () => {
  return (
    <div
      id="root"
      className="min-h-100vh flow-row flex grow bg-slate-50 dark:bg-navy-900"
    >
      <Appbar />
      <Sidebar />
      <ChatComponent />
      <RightSidebar />
    </div>
  );
};

export default DashBoard;
