import CategoryForm from "@/components/Forms/CategoryForm";
import CustomPropertyForm from "@/components/Forms/CustomPropertyForm";
import Description from "@/components/Forms/Description";
import ImageForm from "@/components/Forms/ImageForm";
import Name from "@/components/Forms/Name";
import Price from "@/components/Forms/Price";
import ProductActionButton from "@/components/Forms/ProductActionButton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Product } from "@prisma/client";
import { ImageIcon, InfoIcon, Shapes, TableProperties } from "lucide-react";
import { redirect } from "next/navigation";

type customType = Product & propertyType;
type propertyType = {
  properties: {
    name: string;
    value: string[];
    productId: string;
  }[];
};
const Page = async ({ params }: { params: { productId: string } }) => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      category: true,
      properties:true
    },
  });
  if (!product) redirect("/");
  const category = await db.category.findMany({
    include: {
      parent: {
        include: {
          properties: true,
        },
      },
      properties: {
        include: {
          products: true,
        },
      },
    },
  });
  const requiredField = [
    product.name,
    product.description,
    product.image,
    product.price,
    product.categoryId,
  ];
  const totalField = requiredField.length;
  const completedFiled = requiredField.filter(Boolean).length;
  const task = `(${completedFiled}/${totalField})`;
  const isCompleted = requiredField.every(Boolean);
  return (
    <div className="p-6">
      <div className="flex justify-between gap-y-2 mb-5">
        <div className="flex flex-col gap-y-2 ">

        <h1 className=" text-2xl font-medium">Product Setup</h1>
        <p className="text-slate-700 flex text-sm">
          Complete all required fields 
          <span className="font-bold">
          {task}
            </span>
        </p>
        </div>
        <ProductActionButton
        disabled={!isCompleted}
        productId={params.productId}
        isCompleted={product.isPublised}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <div className="flex items-center gap-x-3">
            <InfoIcon className="h-8 w-8 text-blue-500" />
            <h2 className="text-xl font-medium ">Product Information</h2>
          </div>
          <Name productId={params.productId} initialData={product} />
          <Description productId={params.productId} initialData={product} />
          <Price productId={params.productId} initialData={product} />
          <div>
            <div className="flex items-center gap-x-3 mt-4">
              <ImageIcon className="h-8 w-8 text-blue-500" />
              <h2 className="text-xl font-medium ">
                 Product Images
              </h2>
            </div>
            <ImageForm productId={params.productId} initialData={product} />
          </div>
        </div>

        <div>
          <div>
            <div className="flex items-center gap-x-3">
              <TableProperties className="h-8 w-8 text-blue-500" />
              <h2 className="text-xl font-medium ">Add Product Custom Categories</h2>
            </div>
            <CustomPropertyForm
             productId={params.productId} initialData={product as customType} 
             />
          </div>

          <div>
            <div className="flex items-center gap-x-3 mt-4">
              <Shapes className="h-8 w-8 text-blue-500" />
              <h2 className="text-xl font-medium ">
                Product Category and Properties
              </h2>
            </div>
            <CategoryForm
              category={category}
              productId={params.productId}
              initialData={product}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
