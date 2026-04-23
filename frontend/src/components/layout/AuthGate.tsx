import { ReactNode } from "react";

const AuthGate = ({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-surface/80 backdrop-blur-glass">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-2 border-primary animate-spin"></div>
          <div className="absolute inset-2 h-20 w-20 rounded-full border-r-2 border-secondary animate-spin [animation-duration:1.5s]"></div>
          <div className="absolute inset-4 h-16 w-16 rounded-full border-l-2 border-tertiary animate-spin [animation-duration:2s]"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-on-surface shadow-[0_0_10px_#f0edf1]"></div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AuthGate;
