import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'
import { Prisma } from "@prisma/client";
import { createProduct, Params } from "@/app/types";



export const GET = async (req: Request, { params }: Params) => {
    try {
        const productFinded = await prisma.product.findFirst({
            where: {
                id: Number(params.id)
            }
        })
        if (!productFinded) {
            return NextResponse.json({
                message: "Product not found"
            }, {
                status: 404
            })
        }
        return NextResponse.json(productFinded)
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

export const DELETE = async (req: Request, { params }: Params) => {
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: Number(params.id)
            }
        })
        if (!deletedProduct) return NextResponse.json({
            message: "Product not found"
        },{
            status: 404
        })
        return NextResponse.json(deletedProduct)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if(error.code === "P2025"){
                return NextResponse.json({
                    message: "Product not found"
                },{
                    status: 404
                })
            }
            return NextResponse.json({
                message: error.message
            }, {
                status: 500
            })
        }
    }
}

export const PUT = async(req : Request, {params}: Params) => {
    try{
        const body : createProduct = await req.json()
        const updatedProduct = await prisma.product.update({
            where:{
                id: Number(params.id)
            },
            data: {
                name: body.name,
                price: body.price,
                stock: body.stock,
                category: body.category
            }
        })
        if(!updatedProduct) return NextResponse.json({
            message: "Product not found"
        },{
            status: 404
        })
        return NextResponse.json(updatedProduct)

    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025'){
                return NextResponse.json({
                    message: "Product not found"
                },{
                    status: 404
                })
            }
            return NextResponse.json({
                message: error.message
            },{
                status: 500
            })
        }
    }
}