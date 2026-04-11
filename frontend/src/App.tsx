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

  return (
    <div className="font-display text-on-surface">
      <AuthGate isLoading={isLoading}>
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<DashboardProducts />} />
            <Route path="customers" element={<DashboardCustomers />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>

          <Route element={<RedirectIfAuth isSuccess={isSuccess} />}>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Route>

          <Route path="/" element={<Layout user={data} />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile user={data} />} />
            <Route path="/purchase-success" element={<PurchaseSuccess />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthGate>
    </div>
  );
}

export default App;
