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
            return new NextResponse('User not found', { status: 401 })
        }
        const values = await req.json();
        const data = await db.featuredProducts.upsert({
            where: {
                productId:params.productId
            },
            create: {

                    ...values,
                    productId:params.productId
            },
            update:{
                ...values,
                productId:params.productId
            }
        })
        return NextResponse.json('data');
    } catch (error: any) {
        console.log(error.message, 'api handler error')
        return new NextResponse('Create featuredproduct Details', error);
    }

}

export async function DELETE(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('User not found', { status: 401 })
        }
        const data = await db.featuredProducts.delete({
            where: {
                productId:params.productId
            }
        })
        return NextResponse.json('data');
    } catch (error: any) {
        console.log(error.message, 'api handler error')
        return new NextResponse('Create featued  delete', error);
    }

}