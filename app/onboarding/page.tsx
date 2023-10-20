import { fetchUser } from "@/actions/user.action";
import AccountProfile from "@/components/customs/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser();
  const userData = {
    sellerName: userInfo?.sellerName || user?.username || "" ,
    companyName: userInfo?.companyName || "" ,
    email: userInfo?.email || "" ,
  };

  return (
    <main className="mx-auto flex-col flex justify-start px-10 py-20 max-w-3xl">
    <h1 className="text-3xl font-bold">Onboarding</h1>
    <p className="mt-3 test-lg">Complete your profile now to use Ecommerce Admin.</p>
    <section className="mt-9 bg-sky-100 themes rounded-lg p-10">
      <AccountProfile user={userData} />
    </section>
  </main>
  );
};

export default page;
