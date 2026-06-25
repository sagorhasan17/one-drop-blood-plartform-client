import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
