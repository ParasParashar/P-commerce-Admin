import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const {name,parentId} = await req.json();
        const category = await db.category.create({
            data:{
                name:name,
                parentId:parentId||null
            }
        });
        return NextResponse.json(category);
    } catch (error: any) {
        console.log(error.message, 'api handler category error')
        return new NextResponse('Create category ', error);
    }

    
}