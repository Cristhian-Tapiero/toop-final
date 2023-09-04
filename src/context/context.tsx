'use client'
import { useContext, useState, createContext } from 'react'
import { Product, createProduct, updateProduct } from '../app/types'
const Context = createContext<{
    products : Product[]
    selectedProd: Product | null 
    setSelectedProd: (product: Product | null) => void
    loadProducts : () => Promise<void>
    createProduct: (product: createProduct) => Promise<void>
    deleteProduct: (id: number) => Promise<void>
    updateProduct: (id: number, product: updateProduct) => Promise<void>
}>({
    products: [],
    selectedProd: null,
    setSelectedProd: (product: Product | null) => {},
    loadProducts : async () => { } ,
    createProduct: async(product: createProduct) => { },
    deleteProduct: async(id: number) => { },
    updateProduct: async(id: number, product : updateProduct) => { }
})

export const useProducts = () =>{
    const context = useContext(Context)
    if(!context){
        throw new Error("No hay provider")
    }
    return context
}

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [products, setProducts] = useState<Product[]>([])
    const [selectedProd, setSelectedProd] = useState<Product | null>(null)
    const loadProducts = async() =>{
        const res = await fetch("https://toop-final.vercel.app/api/products")
        const data = await res.json()
        setProducts(data)

    }
    const createProduct = async(product: createProduct) =>{
        const res = await fetch("https://toop-final.vercel.app/api/products",{
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const newProduct = await res.json()
        setProducts([...products, newProduct])

    }

    const deleteProduct = async(id: number) =>{
        const res = await fetch("https://toop-final.vercel.app/api/products/" + id,{
            method: "DELETE"
        })
        const data = res.json()
        setProducts(products.filter(product => product.id !== id ))
    }

    const updateProduct = async(id: number, product: updateProduct) =>{
        const res = await fetch("https://toop-final.vercel.app/api/products/" + id, {
            method: "PUT",
            body: JSON.stringify(product),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const data = await res.json()
        setProducts(products.map(product => product.id == id ? data : product))

    }
    return (
        <Context.Provider value={
            { 
                products,
                selectedProd,
                setSelectedProd, 
                loadProducts, 
                createProduct, 
                deleteProduct, 
                updateProduct,
            }
        }>
            {children}
        </Context.Provider>
    )
} 