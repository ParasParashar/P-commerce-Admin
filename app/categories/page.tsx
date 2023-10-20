import CategoryCreation from "@/components/customs/CategoryCreation";
import PropertyCreation from "@/components/customs/PropertyCreation";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Shapes } from "lucide-react";
import { TableProperties } from "lucide-react";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const categories = await db.category.findMany();
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <div className="flex items-center gap-x-3">
            <Shapes className="h-8 w-8 text-blue-500" />
            <h2 className="text-xl font-medium ">Create Categories</h2>
          </div>
          <CategoryCreation initialData={categories} />
        </div>
        <div>
          <div className="flex items-center gap-x-3">
            <TableProperties className="h-8 w-8 text-blue-500" />
            <h2 className="text-xl font-medium ">
              Create Properties of your Desired Category
            </h2>
          </div>
          <PropertyCreation initialData={categories} />
        </div>
      </div>
    </div>
  );
};

export default page;
