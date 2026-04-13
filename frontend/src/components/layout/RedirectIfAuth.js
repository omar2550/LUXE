import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
const RedirectIfAuth = ({ isSuccess }) => {
    if (isSuccess) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return (_jsx(_Fragment, { children: _jsx(Outlet, {}) }));
};
export default RedirectIfAuth;
