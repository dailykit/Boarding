import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../store/auth";
import Navbar from "../Navbar";
function Redirect({ to }) {
  const router = useRouter();
  React.useEffect(() => {
    router.push(to);
  }, [to]);
  return null;
}
export const Layout_2 = ({ children }) => {
  const { authenticated } = useAuth();
  if (!authenticated) <Redirect to="/onboard/login" />;
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
