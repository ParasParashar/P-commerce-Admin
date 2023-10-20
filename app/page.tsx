import { getSellerOrders } from "@/actions/getSellersOrders";
import { fetchUser } from "@/actions/user.action";
import { Chart } from "@/components/analytics/Chart";
import DataCard from "@/components/analytics/DataCard";
import { redirect } from "next/navigation";

export default async function Home() {
  const seller = await fetchUser();
  if (!seller?.id || !seller.userId) {
    return redirect("/onboarding");
  }
  const userOrder = await getSellerOrders();
  const data = userOrder?.data;
  const totalRevenue = userOrder?.totalRevenues;
  const totalSales = userOrder?.totalSales;
  const totalProducts = userOrder?.totalProducts;
  const totalFeaturedProducts = userOrder?.totalFeaturedProducts;
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Total Revenue"
          value={totalRevenue as number}
          shouldFormat
        />
        <DataCard label="Total Sales" value={totalSales as number} />
        <DataCard label="Total Products" value={totalProducts as number} />
        <DataCard
          label="Total Featured Products"
          value={totalFeaturedProducts as number}
        />
      </div>
      <Chart data={data as any} />
    </div>
  );
}
