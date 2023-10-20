import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('User Not Found', { status: 401 });
        }
        const { categoryId, productProperty } = await req.json();
        
        const product = await db.product.update({
            where:{
                userId:userId,
                id:params.productId
            },
            data: {
                categoryId: categoryId as string, 
                dynamicProperties:productProperty,
                },
                include:{
                    properties:true
                }
        });
        return NextResponse.json(product);
    } catch (error: any) {
        console.error('Create product error:', error);
        return new NextResponse('Create product', { status: 500 });
    }
}
