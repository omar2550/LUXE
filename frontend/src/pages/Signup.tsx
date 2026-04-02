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

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    } else if (formValues.password.length < 6) {
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.7 }}
      className="mx-auto sm:mr-auto sm:ml-0 xs:min-w-96 sm:w-1/2 mt-5 relative z-20"
    >
      <h1 className="font-bold text-3xl xs:text-5xl sm:text-display-lg my-7">
        Join the Elite
        <br />
        <span className="bg-signature-gradient bg-clip-text text-transparent italic">
          Premium Access
        </span>
      </h1>
      <form
        onSubmit={(e) => handelSubmit(e)}
        className="glass rounded-lg glow-primary ghost-border p-5 space-y-4 text-on-surface-variant"
      >
        <div>
          <label htmlFor="name" className="text-body-sm">
            Name
          </label>
          <Input
            id="name"
            placeholder="Jordan Lee"
            value={formValues.name}
            aria-invalid={nameError}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="email" className="text-body-sm">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={formValues.email}
            aria-invalid={emailError}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            placeholder="name@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-body-sm">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={formValues.password}
            aria-invalid={passwordError}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
            placeholder="pas..."
          />
          {passwordLength && (
            <p className="text-body-sm text-destructive">
              Password Must be at Least 6 Characters Long
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password_confirm" className="text-body-sm">
            Confirm Password
          </label>
          <Input
            id="password_confirm"
            type="password"
            placeholder="pas..."
            aria-invalid={passwordLength || passwordCompare || passwordError}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          {passwordCompare && (
            <p className="text-body-sm text-destructive">
              The Passwords Doesn't Match
            </p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className={
            "w-full flex uppercase tracking-widest font-bold bg-signature-gradient !text-on-surface text-body-sm px-4 py-5"
          }
        >
          Join the circle
        </Button>
      </form>
    </motion.div>
  );
};

export default Signup;
