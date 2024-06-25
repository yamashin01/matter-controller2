const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-screen">
      <main className=" bg-slate-50 flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
