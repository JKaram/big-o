export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-svh w-svw flex-1 flex-col justify-center overflow-hidden bg-slate-950 text-white">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="flex min-h-screen flex-col border border-stone-50">
        <header className="p-4 text-black">
          <h1 className="text-xl font-bold">The Big O</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque pellentesque felis quis mi venenatis auctor. Donec nisi
            magna, viverra a mattis eget, iaculis sed dui. Sed feugiat ac leo ac
            bibendum. Pellentesque lacinia erat in est cursus, nec lobortis
            ligula dignissim. Nunc faucibus malesuada efficitur.
          </p>
        </header>
        <main>{children}</main>
      </div>
      <footer>Footer</footer>
    </div>
  );
};
