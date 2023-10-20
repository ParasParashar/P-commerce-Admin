import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";


export const getAllUserProducts = async () => {
    try {
        const { userId } = auth();

        if (!userId) throw new Error('user not found');
        const products = await db.product.findMany({
            where: {
                userId: userId,
            },
            include: {
                category: true,
                properties: true,
                featuredProducts: true, 
            },
        });
        return products;
    } catch (error: any) {
        console.log('Something Went Wrong', error.message)
    }

}
export const getSpecificProductDetails = async (productId:string) => {
    try {
        const { userId } = auth();

        if (!userId) throw new Error('user not found');
        const product = await db.product.findUnique({
            where: {
              id: productId,
            },
            include: {
              category: true,
              properties:true,
              featuredProducts:true
            },
          });
        return product;
    } catch (error: any) {
        console.log('Something Went Wrong', error.message)
    }

}

export const getSpecificFeaturedProductDetails = async (featuredProductId:string) => {
    try {
        const { userId } = auth();

        if (!userId) throw new Error('user not found');
        const product = await db.featuredProducts.findFirst({
            where: {
              productId: featuredProductId, 
            }
          });
        return product;
    } catch (error: any) {
        console.log('Something Went Wrong', error.message)
    }

}
