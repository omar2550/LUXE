import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import ProductsByCat from "./pages/ProductsByCat";
import Layout from "./components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import DashboardProducts from "./pages/DashboardProducts";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="font-display text-on-surface">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<DashboardProducts />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/products/:cat" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            {/* <Route path="/products/:cat" element={<ProductsByCat />} /> */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
