import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useAuth";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { mutate, isPending, isError } = useLogin();

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    let isValid = true;

    if (formValues.email.trim() === "") {
      setEmailError(true);
      isValid = false;
    }
    if (formValues.password.trim() === "") {
      setPasswordError(true);
      isValid = false;
    }

    if (isValid) {
      mutate(formValues, {
        onError: () => {
          setEmailError(true);
          setPasswordError(true);
        },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.7 }}
      className="sm:ml-auto sm:mr-0 mx-auto  xs:min-w-96 sm:w-1/2 mt-5 relative z-20"
    >
      <h1 className="font-bold text-4xl sm:text-display-lg my-10">
        Elevate Your Style
        <br />
        <span className="bg-signature-gradient bg-clip-text text-transparent italic">
          The Elite Suite
        </span>
      </h1>
      <form
        onSubmit={(e) => handelSubmit(e)}
        className="glass rounded-lg glow-primary ghost-border p-5 space-y-4 text-on-surface-variant"
      >
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
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className={
            "w-full flex uppercase tracking-widest font-bold bg-signature-gradient !text-on-surface text-body-sm px-4 py-5"
          }
        >
          Unlock Access
        </Button>
      </form>
    </motion.div>
  );
};

export default Login;
