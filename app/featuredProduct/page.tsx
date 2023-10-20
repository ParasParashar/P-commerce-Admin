import { getAllUserProducts } from "@/actions/getProducts";
import CreateProduct from "@/components/Models/CreateProduct";
import DropModel from "@/components/Models/DropModel";
import { Button } from "@/components/ui/button";
import { BadgePlus, ExternalLink, MoreHorizontal, Star } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const products = await getAllUserProducts();
  if (products?.length === 0 || !products) {
    return (
      <div className="h-[45vh] gap-3  w-full text-center flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold">
          Currently, you not have any product.
        </h2>
        <p className="text-lg text-fuchsia-600">Let&#39; Create Some</p>
        <CreateProduct>
          <Button
            variant="outline"
            className="bg-gray-200/90 flex items-center gap-x-2"
          >
            <BadgePlus className="h-5 w-5 text-gray-600" />
            New Product
          </Button>
        </CreateProduct>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-3 w-full">
        <h1 className="text-xl font-serif font-bold text-gray-800">
          Featured Collections
        </h1>
        <CreateProduct>
          <Button
            variant="outline"
            className="bg-gray-200/90 flex items-center gap-2"
          >
            <BadgePlus className="h-5 w-5 text-gray-600" />
            New Product
          </Button>
        </CreateProduct>
      </div>
      {products?.length > 0 && (
        <div className="overflow-x-auto shadow-md border rounded-lg">
          <table className="table-auto  p-1">
            <thead className="bg-slate-50 themes-table-head">
              <tr>
                <th className=" w-1/5 text-center py-2">S.No</th>
                <th className="w-2/6 text-center py-2">Products</th>
                <th className="w-1/6 text-center py-2">Status</th>
                <th className="w-2/6 text-center py-2">Featured</th>
                <th className="w-1/6 text-center py-2"></th>
              </tr>
            </thead>

            <tbody>
              {products?.map((product, index) => (
                <tr
                  key={product.id}
                  className={`index % 2 === 0 ? "bg-gray-100" : "bg-white" themes-table-body table-hover-row`}
                >
                  <td className="w-1/5 py-2 text-center">{index + 1}</td>
                  <td className="w-2/6 py-2 text-center">
                    <div className="text-center overflow-x-auto">
                      {product.name}
                    </div>
                  </td>
                  <td className="w-1/6 py-2 text-center">
                    <span
                      className={`${
                        product.isPublised
                          ? "bg-sky-700 "
                          : "bg-slate-500 "
                      } font-semibold text-white p-1 px-2 text-sm rounded-full`}
                    >
                      {product.isPublised ? "Published" : "Unpublished"}
                    </span>
                  </td>
                  <td className="w-2/6 py-2 text-center">
                    <Link
                      href={`/featuredProduct/${product.id}`}
                      className="text-center flex gap-1 justify-center items-center"
                    >
                      {product.featuredProducts.length > 0 ? (
                        <span className="text-blue-500 items-center flex">
                          <Star className="h-4 w-4" />
                          Featured
                        </span>
                      ) : (
                        "Add"
                      )}
                      <ExternalLink className="h-4 w-4 text-gray-500" />
                    </Link>
                  </td>
                  <td className="w-1/6 py-2 text-center">
                    <DropModel productId={product.id}>
                      <Button
                        variant="ghost"
                        className="rounded-full hover:bg-gray-200/80 p-1"
                      >
                        <MoreHorizontal className="h-5 w-5 text-gray-600" />
                      </Button>
                    </DropModel>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
