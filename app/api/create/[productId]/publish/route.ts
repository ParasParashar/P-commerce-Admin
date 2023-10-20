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
    const getProduct = await db.product.findUnique({
        where:{
            id:params.productId,
            userId:userId,
        }

    });
    if (!getProduct) {
        return new NextResponse('Product Not Found', { status: 404 });
      }
      const publishProduct = await db.product.update({
        where:{
            id:getProduct.id
        },
        data:{
            isPublised:true
        }
      });
      return  NextResponse.json('Product Publish Successfully')
   } catch  (error: any) {
    console.error('Update product publish error:', error);
    return new NextResponse('Update product publish', { status: 500 });
   }
  }