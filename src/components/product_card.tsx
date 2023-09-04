'use client'
import { Button, Text, Card, CardBody, CardHeader, CardFooter, ButtonGroup, Divider  } from "@chakra-ui/react";
import { useProducts } from "@/context/context";
import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/app/types";

export const ProductCard = ({product}:{product : Product}) =>{
    const { 
        deleteProduct, 
        setSelectedProd
    } = useProducts()
    const variants = {
        hidden: {opacy: 0, y:20},
        enter: {opacy: 1, y:0},
        exit: {opacy: 0, y:20}
    }
    return(
        <AnimatePresence>
            <Card
            m={0}
            p={0}
            maxW={'sm'}
            minW={'13rem'}
            as={motion.div}
            initial='hidden'
            animate='enter'
            exit='exit'
            variants={variants}
            transition={'.9s ease-in-out'}
            >
                <CardHeader>
                    <Text
                    fontWeight={'semibold'}
                    fontSize={{
                        base: 'xl',
                        md: '3xl'
                    }}
                    >
                        {product.name}
                    </Text>
                </CardHeader>
                <Divider/>
                <CardBody
                pb={0}
                >
                    <Text
                    fontSize={{
                        base: 'lg',
                        md: 'xl'
                    }}
                    >
                        Precio: ${product.price}
                    </Text>
                    <Text
                    fontSize={{
                        base: 'lg',
                        md: 'xl'
                    }}
                    >
                        En Bodega: {product.stock} Disponibles
                    </Text>
                    <Text
                    fontSize={{
                        base: 'lg',
                        md: 'xl'
                    }}
                    >
                        Categoria: {product.category}
                    </Text>
                </CardBody>
                <CardFooter
                justifyContent={'center'}>
                    <ButtonGroup>
                        <Button
                        onClick={() => setSelectedProd(product)}
                        variant={'outline'}
                        >
                            Editar
                        </Button>
                        <Button
                        onClick={() => deleteProduct(product.id)}
                        variant={'outline'}
                        colorScheme="red"
                        >
                            Eliminar
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </AnimatePresence>
    )
}