export interface Product {
    id: number
    name: string
    price: number
    stock: number
    category: number
}
export interface Params{
    params: {
        id: number
    }
}
export class CProduct {
    public id: number
    public name: string
    public price: number
    public stock: number
    public category: number
    constructor(id: number, name: string, price: number, stock: number, category: number){
        this.id = id,
        this.name = name,
        this.price = price,
        this.stock = stock,
        this.category = category
    }
    public describeCategory() : void{
        process.stdout.write('Cualquiera')
    }
}
export class CProduct_Comestible extends CProduct {
    constructor(id: number, name: string, price: number, stock: number, category: number){
        super(id, name, price, stock, category)
    }
    public describeCategory() : void{
        process.stdout.write('Comestible')
    }
}
export class CProduct_Ropa extends CProduct {
    constructor(id: number, name: string, price: number, stock: number, category: number){
        super(id, name, price, stock, category)
    }
    public describeCategory() : void{
        process.stdout.write('Ropa')
    }
}
export class CProduct_Elect extends CProduct {
    constructor(id: number, name: string, price: number, stock: number, category: number){
        super(id, name, price, stock, category)
    }
    public describeCategory() : void{
        process.stdout.write('Electrodomestico')
    }
}
export type createProduct = Omit<Product, "id">
export type updateProduct = Partial<createProduct>