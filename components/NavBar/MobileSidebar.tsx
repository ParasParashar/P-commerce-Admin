import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./SideBar";
import NavbarRoutes from "./NavbarRoutes";
import Logo from "./Logo";
const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"left"} className=" @apply  text-black  bg-gray-50  dark:text-white dark:border-none">
        <div className="h-full  my-7 flex-col flex  ">
          <Logo/>
          <NavbarRoutes />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
