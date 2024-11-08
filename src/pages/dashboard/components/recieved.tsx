import Asset from "./asset";

const RecievedMessage = () => {
  return (
    <div className="space-x-2.5 sm:space-x-5 my-2 px-2">
      <div className="flex items-start space-x-2.5 ">
        <div className="rounded-full w-10 h-10 bg-red-500 flex justify-center items-center">
          <span>K</span>
        </div>

        <div className="flex flex-col items-start space-y-3.5">
          <div className="mr-4 max-w-lg sm:mr-10">
            <div className="rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100">
              Hello My Dear. Lorem ipsum dolor sit amet, consectetur.
            </div>
            <p className="ml-auto mt-1 text-right text-xs text-slate-400 dark:text-navy-300">
              08:16
            </p>
          </div>
        </div>
      </div>
      <Asset />
    </div>
  );
};

export default RecievedMessage;
