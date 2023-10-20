import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request){
try {
    const products = await db.product.findMany({
        where:{
            isPublised:true,
        },
        include:{
            category:true,
            properties:true,
            featuredProducts:true,
        }
    })
    return NextResponse.json(products);
} catch (error) {
    return new NextResponse('Something Went Wrong',{status:500})
}
}