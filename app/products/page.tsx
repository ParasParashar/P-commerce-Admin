import { getAllUserProducts } from "@/actions/getProducts";
import { fetchUser } from "@/actions/user.action";
import CreateProduct from "@/components/Models/CreateProduct";
import DropModel from "@/components/Models/DropModel";
import { Button } from "@/components/ui/button";
import { BadgePlus, MoreHorizontal } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Home() {
  const seller =await fetchUser();
  if(!seller?.id || !seller.userId){
    return redirect('/onboarding');
  }
  const products = await getAllUserProducts();
  if (products?.length === 0 || !products) {
    return (
      <div className="h-[45vh] w-full text-center flex flex-col items-center justify-center gap-3">
        <h2 className="text-xl font-bold">
          Currently you don't have any product.
        </h2>
        <p className="text-lg text-fuchsia-600">Let's Create Some</p>
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
      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="text-xl font-bold text-gray-900 font-serif"> Products </h1>
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
      {products?.length > 0 && (
        <div className="overflow-x-auto shadow-md border rounded-lg themes">
          <table className="w-full themes table-auto p-1">
            <thead className="bg-slate-50 themes-table-head">
              <tr>
                <th className="w-[50px] py-2">S.no.</th>
                <th className="py-2">Products</th>
                <th className="py-2">Status</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => (
                <tr
                  key={product.id}
                  className={`index % 2 === 0 ? "bg-gray-100" : "bg-white" themes-table-body table-hover-row`}
                >
                  <td className="w-[50px] py-2 text-center">{index + 1}</td>
                  <td className="py-2 text-center">{product.name}</td>
                  <td className="py-2 text-center">
                    <span
                      className={`${
                        product.isPublised ? "bg-sky-700" : "bg-slate-500"
                      } font-semibold p-1 text-white px-2 text-sm rounded-full`}
                    >
                      {product.isPublised ? "Published" : "Unpublished"}
                    </span>
                  </td>
                  <td className="py-2 text-center">
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
