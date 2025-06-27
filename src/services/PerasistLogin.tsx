import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshTokenMutation } from "./api/authApiSlice";
import usePersist from "../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import PreLoader from "../components/PreLoader";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { Toaster } from "react-hot-toast";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PleaseLoginAgainProps {
  errMsg: string;
}

export const PleaseLoginAgain = ({ errMsg }: PleaseLoginAgainProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "0.5rem",
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <p className="text-neutral-600 mt-2">Session expired</p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-center">Please Login Again</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-50 mb-4">
                <FiLogIn className="h-6 w-6 text-brand-500" />
              </div>
            </div>

            <Button
              onClick={() => navigate("/login")}
              className="w-full bg-brand-500 hover:bg-brand-600"
            >
              <FiLogIn className="mr-2 h-4 w-4" />
              Go to Login Page
            </Button>

            <div className="mt-4 p-3 bg-red-100 text-red-800 text-sm rounded-md flex items-start gap-2">
              <svg
                className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-800"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
              <p>{errMsg}</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Masa Admin. All rights reserved.
        </div>
      </div>
    </div>
  );
};

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [
    refreshToken,
    { isUninitialized, isLoading, isSuccess, isError, error },
  ] = useRefreshTokenMutation();

  useEffect(() => {
    if (
      effectRan.current === true ||
      import.meta.env.NODE_ENV !== "development"
    ) {
      const verifyRefreshToken = async () => {
        try {
          await refreshToken();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  let content: JSX.Element;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <PreLoader />;
  } else if (isError) {
    const errorMessage =
      (error as FetchBaseQueryError)?.data?.message ||
      (error as SerializedError)?.message ||
      "An error occurred";
    content = <PleaseLoginAgain errMsg={errorMessage} />;
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  } else {
    // Fallback case
    content = <PreLoader />;
  }

  return content;
};

export default PersistLogin;
