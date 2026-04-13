import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
const Layout = ({ user }) => {
    return (_jsxs("main", { className: "text-on-surface font-display", children: [_jsx(Header, { user: user }), _jsx("div", { children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }));
};
export default Layout;
