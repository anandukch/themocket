const MainArea = (props: { children: React.ReactNode }) => {
  return (
    <div className="mt-5 mb-3 bg-[#0c0b1e] border border-purple-950 h-full flex rounded-xl px-4 py-3">
      {props.children}
    </div>
  );
};

export default MainArea;
