import Navbar from "@/components/shared/navbar/Navbar";

const AuthLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default AuthLayout;
