export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-svw justify-center flex-1 flex-col overflow-hidden relative h-svh bg-slate-950">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="flex w-1/2 border-stone-50 border flex-col justify-center min-h-screen">
        <header className=" text-black p-4">
          <h1 className="text-xl text-white font-bold">Header</h1>
        </header>
        <main>{children}</main>
      </div>
      <footer>Footer</footer>
    </div>
  );
};
