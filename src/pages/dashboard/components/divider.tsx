const Divider = ({ text = "Sunday" }: { text?: string }) => {
  return (
    <div className="mx-4 flex items-center space-x-3">
      <div className="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
      <p>{text}</p>
      <div className="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
    </div>
  );
};

export default Divider;
