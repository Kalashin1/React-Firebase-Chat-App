import { Message } from "../../../types";
import Asset from "./asset";

const RecievedMessage = ({
  encoder,
  textContent,
  createdAt,
  assetURL,
}: Message) => {
  return (
    <div className="space-x-2.5 sm:space-x-5 my-2 px-2">
      <div className="flex items-start space-x-2.5 ">
        <div className="rounded-full w-10 h-10 bg-red-500 flex justify-center items-center">
          <span>{encoder?.fullName?.slice(0, 1)?.toUpperCase()}</span>
        </div>

        <div className="flex flex-col items-start space-y-3.5">
          <div className="mr-4 max-w-lg sm:mr-10">
            <div className="rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100">
              {textContent}
            </div>
            <p className="ml-auto mt-1 text-right text-xs text-slate-400 dark:text-navy-300">
              {new Intl.DateTimeFormat("en-US", {
                minute: "2-digit",
                hour: "2-digit",
              }).format(new Date(createdAt))}
            </p>
          </div>
        </div>
      </div>
      {assetURL && <Asset />}
    </div>
  );
};

export default RecievedMessage;
