export const Layout = ({ children }) => {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden">
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};
