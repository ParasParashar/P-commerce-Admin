import {
  getSpecificProductDetails,
} from "@/actions/getProducts";
import FeaturedActionButtoin from "@/components/customs/FeaturedActionButtoin";
import FeaturedProductDescriptionForm from "@/components/customs/FeaturedProductDescriptionForm";
import { BadgePlus, Info } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { productId: string } }) => {
  const product = await getSpecificProductDetails(params.productId);

  if (!product) redirect("/featuredProduct");
  const featuredDescriptionArray = product.featuredProducts.map(
    (data) => data.specialDescription
  );
  const featuredDescription = featuredDescriptionArray.join(" ");

  return (
    <div className="p-6">
      <div className="flex justify-between w-full mb-2">
        {featuredDescription ? (
          <FeaturedActionButtoin productId={params.productId} />
        ) : (
          <div className="flex items-center gap-x-2">
            <BadgePlus className="h-8 w-8 text-blue-500" />
            <h2 className="text-xl font-medium font-serif ">
              Create a Featured Collections
            </h2>
          </div>
        )}
      </div>
      {product.isPublised ?(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="flex flex-col gap-3">
          <p className="font-medium bg-gray-100 themes rounded-lg p-4">
            Product Name:
            <h1 className="text-gray-900 text-2xl  font-mono font-semibold">
              {product.name}
            </h1>
          </p>
          <p className=" font-medium bg-gray-100 themes rounded-lg p-4">
            Product Description:
            <p className="text-gray-800 text-themes font-mono text-lg font-semibold">
              {product.description}
            </p>{" "}
          </p>
          <p className="font-medium  bg-gray-100 themes rounded-lg p-4">
            Product Price:
            <p className="text-gray-800 text-themes font-mono text-xl font-semibold">
              {product.price}
            </p>{" "}
          </p>
          <div className=" font-medium bg-gray-100 themes rounded-lg p-4">
            <p className="text-lg ">Product Primary Image:</p>
            <div className="relative aspect-square object-contain font-mono">
              <Image
                src={product.image[0]}
                alt="Product Image"
                fill
                className="object-contain p-2 rounded-md"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2">
          <div className="flex items-center gap-x-2">
            <Info className="h-8 w-8 text-blue-500" />
            <h2 className="text-xl font-medium font-serif ">
              Create a Featured Description
            </h2>
          </div>
          <FeaturedProductDescriptionForm
            // initialData={featuredProduct}
            initialData={featuredDescription}
            productId={params.productId}
            />
            </div>
        </div>
      </div>
      ):(
        <div className="h-[45vh] w-full text-center flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold">
          This Product is not Publish.
        </h2>
        <p className="text-lg text-fuchsia-600">You can make featured collection to published product only.</p>
      </div>
      )}
    </div>

  );
};

export default page;
