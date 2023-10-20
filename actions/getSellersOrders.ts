
'use server'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"

export async function getSellerOrders() {
    try {
        const { userId } = auth();
        if (!userId) throw new Error('user not found')
        const sellerProducts = await db.sellers.findFirst({
            where: {
                userId: userId,
            },
            include: {
                products: {
                    include: {
                        featuredProducts: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            }
        });
        const sellerProductIds = sellerProducts?.products.map((product) => product.id);
        const orders = await db.orderItem.findMany({
            where: {
                productId: {
                    in: sellerProductIds
                }
            },
            include: {
                product: true,
                order: {
                    include: {
                        clientUser: true,
                    }
                }
            }
        })

        const groupOrders = (order: any[]) => {
            const grouped: any = {};
            order.forEach((order) => {
                const name = order.product.name;
                if (!grouped[name]) {
                    grouped[name] = order.product.price
                } else {
                    grouped[name] += order.product.price
                }
            })
            return grouped;
        }
        const groupedEarnings = groupOrders(orders);
        const data = Object.entries(groupedEarnings).map(([productName, total]) => ({
            name: productName,
            total: total
        }));
        const totalSales = orders.length;
        const totalRevenues = orders.reduce((order, item) => order + (item.quantity * (item.product.price || 0)), 0);
        const totalProducts = sellerProducts?.products.length;
        const totalFeaturedProducts = sellerProducts?.products.reduce((total, product) => {
            return total + product.featuredProducts.length;
        }, 0);

        return {
            orders,
            totalRevenues,
            totalSales,
            data,
            totalProducts,
            totalFeaturedProducts
        };

    } catch (error: any) {
        console.log('something went wrong seller orders', error.message)
    }
}
