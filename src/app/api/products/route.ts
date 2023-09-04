import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'
import { createProduct } from "@/app/types";


export const GET = async () => {
    try {
        const products = await prisma.product.findMany()
        console.log(products)
        return NextResponse.json(products)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500
            })
        }

    }
}

export const POST = async (req: Request) => {
    try {
        const body: createProduct = await req.json()
        const verifyExist = await prisma.category.findFirst({
            where: {
                id: body.category
            }
        })
        if(!verifyExist) return NextResponse.json({
            message: "Category doesnt exist"
        },{
            status: 404
        })
        const data = await prisma.product.create({
            data: {
                name: body.name,
                stock: body.stock,
                price: body.price,
                category: body.category
            }
        })

        return NextResponse.json(data)

    } catch (error) {

        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500
            })
        }
    }
}