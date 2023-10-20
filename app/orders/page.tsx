import { getSellerOrders } from "@/actions/getSellersOrders";

const page = async () => {
  const orders = await getSellerOrders();

  if (!orders?.orders || orders.orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-themes text-3xl text-center">
          Currently, you not have any orders.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-serif font-bold text-gray-800">
        Your orders
      </h1>
      <div className="overflow-x-auto mt-3 shadow-md border rounded-lg">
        <table className="table-auto  p-1">
          <thead className="bg-slate-50 themes-table-head p-1">
            <tr className="p-1 ">
              <th className="w-1/5 text-center my-2 sm:my-4">OrderId</th>
              <th className="w-2/5 text-center my-2 sm:my-4">Product</th>
              <th className="w-1/6 text-center my-2 sm:my-4">Quantity</th>
              <th className="w-2/6 text-center my-2 sm:my-4">
                Shipping Information
              </th>
              <th className="w-2/6 text-center my-2 sm:my-4"></th>
            </tr>
          </thead>

          <tbody>
            {orders.orders?.map((product, index) => (
              <tr
                key={product.id}
                className={`index % 2 === 0 ? "bg-gray-100" : "bg-white" themes-table-body `}
              >
                <td className="w-1/5 my-2 text-center">
                  {product.id.slice(-4)}
                </td>
                <td className="w-2/5 my-2 text-center">
                  <p className=" text-lg">{product.product.name}</p>
                  <p className=" text-themes ">
                    {Object.entries(
                      product.dynamicProperties as Record<string, string>
                    ).map(([propertyName, propertyValue]) => (
                      <div key={propertyName} className="text-md">
                        {propertyValue}
                      </div>
                    ))}
                  </p>
                </td>
                <td className="w-1/6 my-2 text-center">
                  <p className="text-lg">{product.quantity}</p>
                </td>
                <td className="w-1/3 my-2 text-center">
                  <p>{product.order?.clientUser.name}</p>
                  <p>{product.order?.clientUser.email}</p>
                  <p>{product.order?.clientUser.address}</p>
                  <p>{product.order?.clientUser.pincode}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
    </div>
  );
};

export default page;
