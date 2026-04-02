import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <main className="text-on-surface font-display">
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
