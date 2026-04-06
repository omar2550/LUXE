import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ user }: { user: any }) => {
  return (
    <main className="text-on-surface font-display">
      <Header user={user} />
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
