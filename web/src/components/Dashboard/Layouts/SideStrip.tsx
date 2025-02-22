const SideStrip = () => {
  return (
    <div className="h-full w-[70px] flex flex-col items-center py-5">
      <div>
        <div className="h-[38px] w-[38px] flex rounded-full bg-white items-center justify-center text-purple-400">
          TM
        </div>
      </div>
      <div className="flex flex-col items-center mt-8 gap-2">
        <div className="flex h-[35px] w-[35px] rounded-full border border-white items-center justify-center">
          H
        </div>
      </div>
    </div>
  );
};

export default SideStrip;
