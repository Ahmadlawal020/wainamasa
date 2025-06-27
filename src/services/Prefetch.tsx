import { store } from "../app/store";
import { usersApiSlice } from "../services/api/userApiSlice";
import { packageApiSlice } from "../services/api/packageApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Unsubscribe } from "@reduxjs/toolkit";

const Prefetch = () => {
  useEffect(() => {
    // console.log("subscribing");
    const packages: Unsubscribe = store.dispatch(
      packageApiSlice.endpoints.getPackages.initiate()
    );
    const users: Unsubscribe = store.dispatch(
      usersApiSlice.endpoints.getUsers.initiate()
    );

    return () => {
      // console.log("unsubscribing");
      packages.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
