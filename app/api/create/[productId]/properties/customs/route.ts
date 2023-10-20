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
    const { properties } = await req.json();
    
    const product = await Promise.all(properties.map(async (data: { name: string; value: string[] }) => {
      // Finding the existing property based on productId and name
      const existingProperty = await db.productProperties.findFirst({
        where: {
          productId: params.productId,
        },
      });

      if (existingProperty) {
        return db.productProperties.update({
          where: { id: existingProperty.id },
          data: {name:data.name, value: data.value },
        });
      } else {
        return db.productProperties.create({
          data: {
            productId: params.productId,
            name: data.name,
            value: data.value,
          },
        });
      }
    }));

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Update product properties error:', error);
    return new NextResponse('Update product properties', { status: 500 });
  }
}
