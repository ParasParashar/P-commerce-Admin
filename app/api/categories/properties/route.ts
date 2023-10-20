import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const {parentId,property}= await req.json();
        const existingCategory = await db.category.findUnique({
            where:{
                id:parentId
            }
        });
        if(!existingCategory) {
            return new NextResponse('Category not found',{status:401});
        }
        const propertCreate = await db.productProperties.createMany({
            data:property.map((data:{name:string,value:string[]})=>({
                name:data.name,
                value:data.value,
                categoryId:existingCategory.id
            })),
        });
        return NextResponse.json(propertCreate);
    } catch (error: any) {
        console.log(error.message, 'api handler category error')
        return new NextResponse('Create category ', error);
    }
}