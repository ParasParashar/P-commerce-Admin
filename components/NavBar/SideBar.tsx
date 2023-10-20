"use client";

import React from "react";
import { Button } from "../ui/button";
import NavbarRoutes from "./NavbarRoutes";
import Logo from "./Logo";

const SideBar = () => {
  return (
    <aside className="h-full border-r flex-col flex overflow-y-auto theme-navbarRoutes  shadow-md">
      <Logo/>
      <NavbarRoutes />
    </aside>
  );
};

export default SideBar;
