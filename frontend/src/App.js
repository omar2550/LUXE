import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import Layout from "./components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import DashboardProducts from "./pages/DashboardProducts";
import AuthGate from "./components/layout/AuthGate";
import { useUser } from "./hooks/useAuth";
import RedirectIfAuth from "./components/layout/RedirectIfAuth";
import NotFound from "./pages/NotFound";
import DashboardCustomers from "./pages/DashboardCustomers";
import DashboardSettings from "./pages/DashboardSettings";
import PurchaseSuccess from "./pages/PurchaseSuccess";
function App() {
    const { data, isLoading, isSuccess } = useUser();
    return (_jsx("div", { className: "font-display text-on-surface", children: _jsx(AuthGate, { isLoading: isLoading, children: _jsxs(Routes, { children: [_jsxs(Route, { path: "/dashboard", element: _jsx(DashboardLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "products", element: _jsx(DashboardProducts, {}) }), _jsx(Route, { path: "customers", element: _jsx(DashboardCustomers, {}) }), _jsx(Route, { path: "settings", element: _jsx(DashboardSettings, {}) })] }), _jsx(Route, { element: _jsx(RedirectIfAuth, { isSuccess: isSuccess }), children: _jsxs(Route, { path: "/auth", element: _jsx(AuthLayout, {}), children: [_jsx(Route, { path: "login", element: _jsx(Login, {}) }), _jsx(Route, { path: "signup", element: _jsx(Signup, {}) })] }) }), _jsxs(Route, { path: "/", element: _jsx(Layout, { user: data }), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "/products", element: _jsx(Products, {}) }), _jsx(Route, { path: "/product/:id", element: _jsx(ProductDetails, {}) }), _jsx(Route, { path: "/categories", element: _jsx(Categories, {}) }), _jsx(Route, { path: "/cart", element: _jsx(Cart, {}) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, { user: data }) }), _jsx(Route, { path: "/purchase-success", element: _jsx(PurchaseSuccess, {}) })] }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }) }));
}
export default App;
