export default () => {
  return (
    <>
      <div className="fixed w-full h-full z-50 bg-[rgb(255,255,255,0.5)] dark:bg-[rgb(36,41,38,0.5)] rounded-lg flex justify-center items-center">
        <div className="w-32 h-32 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl animate-pulse" />
          <div className="w-full h-full relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin blur-sm" />
            <div className="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
              <div className="flex gap-1 items-center">
                <div className="w-1.5 h-12 bg-cyan-500 rounded-full animate-[bounce_1s_ease-in-out_infinite]" />
                <div className="w-1.5 h-12 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.1s]" />
                <div className="w-1.5 h-12 bg-indigo-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.2s]" />
                <div className="w-1.5 h-12 bg-purple-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.3s]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse" />
            </div>
          </div>
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-100" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-500 rounded-full animate-ping delay-200" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300" />
        </div>
      </div>
    </>
  );
};
