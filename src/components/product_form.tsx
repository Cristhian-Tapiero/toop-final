'use client'

import { useProducts } from "@/context/context"
import { useState, useEffect } from "react"
import { 
    Select, 
    Input, 
    FormControl, 
    FormLabel, 
    Button,
    Box,
    Stack
} from '@chakra-ui/react'
export const ProductForm = () =>{
    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)
    const [category, setCategory] = useState<number>(1)

    const { createProduct, updateProduct, setSelectedProd, selectedProd } = useProducts()
    useEffect(() =>{
        if(selectedProd){
            setName(selectedProd.name)
            setPrice(selectedProd.price)
            setStock(selectedProd.stock)
            setCategory(selectedProd.category)
        }
    },[selectedProd])

    return(
        <Box
        as={"form"}
        maxW={'30rem'}
        w={{
            base: '95%',
            sm: '60%',
            md: '50%'
        }}
        my={4}
        border={'2px'}
        p={5}
        borderColor={'slategray'}
        borderRadius={'xl'}
        alignSelf={'center'}
        onSubmit={async(e:any) =>{
            e.preventDefault()
            if(selectedProd){
                await updateProduct(selectedProd.id, {
                    name: name || "",
                    stock: stock,
                    price: price,
                    category: category
                })
                setSelectedProd(null)
            }else{
                await createProduct({
                    name: name || "",
                    stock: stock,
                    price: price,
                    category: category
                })
            }
            setName("")
            setStock(0)
            setPrice(0)
        }}
        >
            <FormControl isRequired>
                <FormLabel>Nombre:</FormLabel>
                <Input 
                placeholder="Nombre de Producto" 
                onChange={(e) => setName(e.target.value)} 
                value={name}/>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Cantidad:</FormLabel>
                <Input 
                placeholder="Cantidad"
                type="number"
                onChange={(e) => setStock(Number(e.target.value))} 
                value={stock == 0 ? "" : stock.toString()}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Precio:</FormLabel>
                <Input 
                placeholder="Precio"
                type="number"
                onChange={(e) => setPrice(Number(e.target.value))} 
                value={price == 0 ? "" : price.toString()}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Categoria:</FormLabel>
                <Select value={category}
                onChange={(e) => setCategory(Number(e.target.value))}
                >
                    <option value={1}>Comestible</option>
                    <option value={2}>Ropa</option>
                    <option value={3}>Electrodomestico</option>
                </Select>
            </FormControl>
            <Stack
            justifyContent={'center'}
            alignContent={'center'}
            direction={'row'}
            mt={'1rem'}
            >
                <Button
                type='submit'>
                    {selectedProd ? "Actualizar" : "Guardar"}
                </Button>
                {selectedProd &&
                    <Button
                    type="button"
                    onClick={() =>{
                        setSelectedProd(null)
                        setName("")
                        setStock(0)
                        setPrice(0)
                    }}
                    >
                        Cancelar
                    </Button>
                }
            </Stack>
        </Box>
    )
}