import Logo from "@/components/NavBar/Logo";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-full w-full gap-4 flex flex-col items-center justify-center">
      <div className="gap-1 flex items-center justify-center ">
        <p className="text-2xl font-mono line-clamp-4">
          Welcome to
        </p>
        <Logo />
      </div>
      <SignIn />
    </div>
  );
}
