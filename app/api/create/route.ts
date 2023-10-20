import { fetchUser } from "@/actions/user.action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('User Not Found', { status: 401 })
        }
        const { name } = await req.json();
        const seller = await fetchUser(userId);
        if(!seller) {
            return new Error("Seller Info error")
        };
        const product = await db.product.create({
            data: {
                userId,
                name,
                sellerId:seller.id
            }
        })
        return NextResponse.json(product);
    } catch (error: any) {
        return new NextResponse('Create product', { status: 500 });
    }

}