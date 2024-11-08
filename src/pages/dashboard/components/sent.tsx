import Asset from "./asset";

const SentMessage = () => {
  return (
    <div className="space-x-2.5 my-2 px-2 sm:space-x-5">
      <div className="flex items-start justify-end space-x-2.5 ">
        <div className="flex flex-col items-end space-y-3.5">
          <div className="ml-4 max-w-lg sm:ml-10">
            <div className="rounded-2xl rounded-tr-none bg-sky-200 p-3 text-slate-700 shadow-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda necessitatibus, ratione. Voluptatum.
            </div>
            <p className="ml-auto mt-1 text-left text-xs text-slate-400 dark:text-navy-300">
              08:16
            </p>
          </div>
        </div>
        <div className="rounded-full w-10 h-10 bg-red-500 flex justify-center items-center">
          <span>K</span>
        </div>
      </div>
      <div className="flex items-start justify-end space-x-2.5 ">
        <Asset />
      </div>
    </div>
  );
};

export default SentMessage;
