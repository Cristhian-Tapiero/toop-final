'use client'
import { MainContainer } from "@/layouts/main_div";
import { Grid } from "@chakra-ui/react";
import { useEffect } from "react"
import { useProducts } from "../context/context"
import { ProductForm } from "@/components/product_form"
import { ProductCard } from "@/components/product_card";

export const Core = () =>{
    const { 
        loadProducts,
        products,
    } = useProducts()

    useEffect(() =>{
        loadProducts()
    },[])

    return(
        <MainContainer>
            <ProductForm />
            <Grid
            px={0}
            m={0}
            boxSizing="border-box"
            py={4}
            w={'70%'}
            templateColumns={{
                base: 'repeat(1,1fr)',
                sm: 'repeat(2,1fr)',
                md: 'repeat(3, 1fr)'
            }}
            gap={{base: '.5rem', sm: '1rem', lg: '1.2rem'}}
            alignSelf={'center'}
            >
                {products.map(product =>{
                    return(<ProductCard key={product.id} product={product}/>)
                })}
            </Grid>
        </MainContainer>
    )
}