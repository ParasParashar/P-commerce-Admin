"use client";

import Link from "next/link";
import { BaggageClaim, Home, Package, User2 } from "lucide-react";
import { Gem } from "lucide-react";
import { Shapes } from "lucide-react";
import { BarChart2 } from "lucide-react";
import NavbarItem from "@/components/NavBar/NavbarItem";
const routes = [
  {
    icon: BarChart2,
    name: "Dashboard",
    route: "/",
  },
  {
    icon: Package,
    name: "Products",
    route: "/products",
  },
  {
    icon: Gem,
    name: "Featured Product",
    route: "/featuredProduct",
  },
  {
    icon: Shapes,
    name: "Categories",
    route: "/categories",
  },
  {
    icon: BaggageClaim,
    name: "Orders",
    route: "/orders",
  },
  {
    icon: User2,
    name: "Onboarding",
    route: "/onboarding",
  },
];

const NavbarRoutes = () => {
  return (
    <div className="flex flex-col w-full ">
      {routes.map((item: any) => (
        <NavbarItem
          key={item.name}
          name={item.name}
          href={item.route}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default NavbarRoutes;
