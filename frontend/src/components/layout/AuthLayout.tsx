import { Link, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "../ui/button";

const AuthLayout = () => {
  const { pathname } = useLocation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-surface py-2 px-2 xs:px-8">
      <header className="flex items-center justify-between relative z-10">
        <Link to={"/"}>
          <h1 className="text-xl font-bold">LUXE</h1>
        </Link>
        {pathname === "/auth/login" ? (
          <div>
            <p className="inline-block text-on-surface/50 text-body-sm mr-2">
              Not a member?
            </p>
            <Link to={"signup"}>
              <Button size="sm" variant="outline" className={"text-on-surface"}>
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <p className="inline-block text-on-surface/50 text-body-sm mr-2">
              Already a member?
            </p>
            <Link to={"login"}>
              <Button size="sm" variant="outline">
                Log In
              </Button>
            </Link>
          </div>
        )}
      </header>
      <AnimatePresence mode="popLayout">
        {pathname === "/auth/login" ? (
          <motion.div
            key="login-image"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.7 }}
            className="
      absolute block top-0 left-0 w-1/2 h-full 
      [mask-image:linear-gradient(to_right,black_-10%,transparent_100%)]
      bg-[url('/bg2.png')] bg-no-repeat 
      bg-[length:cover] 
      bg-[position:center]  
      "
          />
        ) : (
          <motion.div
            key="signup-image"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.7 }}
            className="
        absolute block top-0 right-0 w-1/2 h-full 
        [mask-image:linear-gradient(to_left,black_-10%,transparent_100%)]
        bg-[url('/bg2.png')] bg-no-repeat 
        bg-[length:cover] 
        bg-[position:center]  
        "
          />
        )}

        <Outlet />
      </AnimatePresence>
    </section>
  );
};

export default AuthLayout;
