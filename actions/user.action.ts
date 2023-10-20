'use server'

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

interface props {
    sellerName: string;
    companyName: string;
    email: string;
}


export async function fetchUser() {
    try {
        const { userId } = auth();

        if(!userId) {
            throw new Error ('User Not found')
        }
       return  await db.sellers.findFirst({
            where:{
                userId:userId
            }
        })
        
    } catch (error: any) {
        throw new Error(error);
    };
}

export async function updateUser({sellerName,companyName,email}:props):Promise<void> {
    try {
        const { userId } = auth();

    if(!userId) {
        throw new Error ('User Not found')
    }
    const existingUserInfo = await db.sellers.findFirst({
        where:{
            userId:userId
        }
    });
    if(existingUserInfo){
        await db.sellers.update({
            where:{
                id:existingUserInfo.id
            },
            data:{
                sellerName:sellerName,
                companyName:companyName,
                email:email,
            },
        });
    }else{
        await db.sellers.create({
            data:{
                sellerName:sellerName,
                companyName:companyName,
                email:email,
                userId:userId
            },
        })
    }
    } catch (error:any) {
        throw new Error("Something went wrong update User",error.message)
    }

}