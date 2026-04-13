import { jsx as _jsx } from "react/jsx-runtime";
const AuthGate = ({ children, isLoading, }) => {
    if (isLoading) {
        return (_jsx("div", { className: "flex items-center justify-center h-screen text-primary", children: _jsx("span", { className: "", children: "Loading..." }) }));
    }
    return _jsx("div", { children: children });
};
export default AuthGate;
