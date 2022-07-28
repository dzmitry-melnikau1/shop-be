export interface ProductsInterface {
    id: string,
    title: string,
    description: string,
    price: number,
    count: number,
}

export interface ProductInterface {
    title: string,
    description: string,
    price: number,
}

export interface ProductServiceInterface {
    getProductById: (id: string) => Promise<ProductsInterface>,
    getAllProducts: () => Promise<ProductsInterface[]>,
    createProduct: (product: Omit<ProductInterface, 'id'>) => Promise<ProductInterface>,
}
