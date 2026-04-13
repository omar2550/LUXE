import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignup } from "@/hooks/useAuth";
const Signup = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [password2, setPassword2] = useState("");
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false);
    const [passwordCompare, setPasswordCompare] = useState(false);
    const { mutate, isPending } = useSignup();
    const handelSubmit = (e) => {
        e.preventDefault();
        setNameError(false);
        setEmailError(false);
        setPasswordError(false);
        setPasswordLength(false);
        setPasswordCompare(false);
        let isValid = true;
        if (formValues.name.trim() === "") {
            setNameError(true);
            isValid = false;
        }
        if (formValues.email.trim() === "") {
            setEmailError(true);
            isValid = false;
        }
        if (formValues.password.trim() === "") {
            setPasswordError(true);
            isValid = false;
        }
        else if (formValues.password.length < 6) {
            setPasswordLength(true);
            isValid = false;
        }
        if (formValues.password !== password2) {
            setPasswordCompare(true);
            isValid = false;
        }
        if (isValid) {
            mutate(formValues, {
                onError: () => {
                    setEmailError(true);
                    setPasswordError(true);
                    setNameError(true);
                },
            });
        }
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -30 }, transition: { duration: 0.7 }, className: "mx-auto sm:mr-auto sm:ml-0 xs:min-w-96 sm:w-1/2 mt-5 relative z-20", children: [_jsxs("h1", { className: "font-bold text-3xl xs:text-5xl sm:text-display-lg my-7", children: ["Join the Elite", _jsx("br", {}), _jsx("span", { className: "bg-signature-gradient bg-clip-text text-transparent italic", children: "Premium Access" })] }), _jsxs("form", { onSubmit: (e) => handelSubmit(e), className: "glass rounded-lg glow-primary ghost-border p-5 space-y-4 text-on-surface-variant", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "text-body-sm", children: "Name" }), _jsx(Input, { id: "name", placeholder: "Jordan Lee", value: formValues.name, "aria-invalid": nameError, onChange: (e) => setFormValues({ ...formValues, name: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "text-body-sm", children: "Email" }), _jsx(Input, { id: "email", type: "email", value: formValues.email, "aria-invalid": emailError, onChange: (e) => setFormValues({ ...formValues, email: e.target.value }), placeholder: "name@example.com" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "text-body-sm", children: "Password" }), _jsx(Input, { id: "password", type: "password", value: formValues.password, "aria-invalid": passwordError, onChange: (e) => setFormValues({ ...formValues, password: e.target.value }), placeholder: "pas..." }), passwordLength && (_jsx("p", { className: "text-body-sm text-destructive", children: "Password Must be at Least 6 Characters Long" }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password_confirm", className: "text-body-sm", children: "Confirm Password" }), _jsx(Input, { id: "password_confirm", type: "password", placeholder: "pas...", "aria-invalid": passwordLength || passwordCompare || passwordError, value: password2, onChange: (e) => setPassword2(e.target.value) }), passwordCompare && (_jsx("p", { className: "text-body-sm text-destructive", children: "The Passwords Doesn't Match" }))] }), _jsx(Button, { type: "submit", disabled: isPending, className: "w-full flex uppercase tracking-widest font-bold bg-signature-gradient !text-on-surface text-body-sm px-4 py-5", children: "Join the circle" })] })] }));
};
export default Signup;
