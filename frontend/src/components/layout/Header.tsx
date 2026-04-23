import { Link, useLocation } from "react-router-dom";
import { Menu, Search, ShoppingCart, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { SearchModal } from "../SearchModal";

const Header = ({ user }: { user: any }) => {
  const location = useLocation();

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const closeMenu = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  };

  return (
    <header className="bg-surface ghost-border !border-t-0 !border-x-0 sticky top-0 left-0 py-2 px-4 z-50 w-full">
      {/* Desktop */}
      <nav className="hidden sm:flex mx-auto items-center justify-between">
        {/* LOGO */}
        <Link to={"/"}>
          <h1 className="text-xl font-bold">LUXE</h1>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-3 text-on-surface-variant uppercase font-semibold text-body-sm">
          <Link
            to={"/products"}
            className={
              location.pathname === "/products"
                ? "text-primary underline-offset-4 underline"
                : ""
            }
          >
            Products
          </Link>
          <Link
            to={"/categories"}
            className={
              location.pathname === "/categories"
                ? "text-primary underline-offset-4 underline"
                : ""
            }
          >
            Categories
          </Link>
          {user?.role === "admin" && (
            <Link
              to={"/dashboard"}
              className={
                location.pathname === "/dashboard"
                  ? "text-primary underline-offset-4 underline"
                  : ""
              }
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Search */}
        <div className="flex items-center gap-4 text-on-surface-variant">
          <motion.div
            key="search-icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsSearchOpen(true)}
            className="cursor-pointer duration-300 transition-all hover:text-primary"
          >
            <Search size={16} />
          </motion.div>
          <SearchModal open={isSearchOpen} setOpen={setIsSearchOpen} />
          {user ? (
            <>
              <Link
                to={"/cart"}
                className="duration-300 transition-all hover:text-primary"
              >
                <ShoppingCart size={16} />
              </Link>
              <Link
                to={"/profile"}
                className="duration-300 transition-all hover:text-primary"
              >
                <User2 size={16} />
              </Link>
            </>
          ) : (
            <Link to={"/auth/login"}>
              <Button
                size="sm"
                className={
                  "bg-signature-gradient text-on-surface font-semibold"
                }
              >
                Log In
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile */}
      <nav className="sm:hidden mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link to={"/"}>
          <h1 className="text-xl font-bold">LUXE</h1>
        </Link>

        <div className="flex items-center gap-1">
          <motion.div
            key="search-icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-md data-active:bg-muted/50 data-active:hover:bg-muted data-active:focus:bg-muted [&_svg:not([class*='size-'])]:size-4"
          >
            <Search size={14} />
          </motion.div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Menu />
                </NavigationMenuTrigger>
                <NavigationMenuContent onClick={closeMenu}>
                  <ul className="min-w-36 xs:min-w-60">
                    <ListItem href="/products" title="Products" />
                    <ListItem href="/categories" title="Categories" />
                    {user?.role === "admin" && (
                      <ListItem href="/dashboard" title="Dashboard" />
                    )}
                    {user && (
                      <ListItem href="/cart" title="">
                        <ShoppingCart size={16} />
                      </ListItem>
                    )}
                    {user && (
                      <ListItem href="/profile" title="">
                        <User2 size={16} />
                      </ListItem>
                    )}
                    {!user && (
                      <ListItem href="/auth/login" title="">
                        <Button
                          size="sm"
                          className={
                            "bg-signature-gradient text-on-surface font-semibold"
                          }
                        >
                          Log In
                        </Button>
                      </ListItem>
                    )}
                    {/* </ListItem> */}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  );
};

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <Link
        to={href}
        className={
          location.pathname === href
            ? "text-primary underline-offset-4 underline"
            : ""
        }
      >
        <div className="flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-md data-active:bg-muted/50 data-active:hover:bg-muted data-active:focus:bg-muted [&_svg:not([class*='size-'])]:size-4">
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default Header;
