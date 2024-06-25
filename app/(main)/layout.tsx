import { Footer } from "../components/footer";
import Header from "../components/header";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-screen">
      <Header />
      <main className=" bg-slate-50 flex-1 overflow-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
