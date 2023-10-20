import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//for updating or creating the product
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
        const { image, ...otherValues } = values;
        const data = await db.product.update({
            where: {
                id: params.productId,
                userId
            },
            data: {
                image: image,
                ...otherValues,
            }
        })
        return NextResponse.json(data);
    } catch (error: any) {
        console.log(error.message, 'api handler error')
        return new NextResponse('Create product Details', error);
    }

}
// for updating the image
export async function POST(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('User not found', { status: 401 })
        }
        const { image } = await req.json();
        const data = await db.product.update({
            where: {
                id: params.productId,
                userId
            },
            data: {
                image: {
                    push: image
                },

            }
        })
        return NextResponse.json(data);
    } catch (error: any) {
        console.log(error.message, 'api handler error')
        return new NextResponse('Create product Details', error);
    }

}
// for deleting the complete product
export async function DELETE
    (
        req: Request,
        { params }: { params: { productId: string } }
    ) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('user Not Found', { status: 401 })
        }
        const getProduct = await db.product.findUnique({
            where:{
                userId:userId,
                id:params.productId
            },
            include:{
                properties:true,
                category:true
            }
        })
        if (!getProduct) {
            return new NextResponse('Product Not Found', { status: 404 })
        }

        const productCustomProperty = await db.productProperties.deleteMany({
            where:{
                productId:getProduct.id
            }
        });
        const deleteProduct = await db.product.delete({
            where:{
                id:getProduct.id
            }
        });

        return NextResponse.json('product delete successfully');
    } catch (error: any) {
        return new NextResponse('Delete product', { status: 500 });
    }

}