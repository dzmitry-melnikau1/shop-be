import { ProductServiceInterface, ProductsInterface, ProductInterface } from './interfaces';
import { Client, QueryConfig } from 'pg';

class PgProductService implements ProductServiceInterface {

    private products = 'products';
    private stocks = 'stocks';

    constructor(private databaseClient: Client){}

    async getProductById(id: string): Promise<ProductsInterface> {

        const query = {
            // text: `SELECT * FROM ${this.products} WHERE id = $1`,
            text: `select p.title, p.description, p.price, s.count
                   from products p
                   inner join
                   stocks s 
                   on p.id = s.product_id`,
            value: [id]
        } as QueryConfig;
        const result = await  this.databaseClient.query(query);
        return result.rows[0] ? result.rows[0] : null;
    }

    async getAllProducts(): Promise<ProductsInterface[]> {
        const query = {
            // text: `SELECT * FROM ${this.tableName}`,
            text: `select p.id, p.title, p.description, p.price, s.count 
                   from ${this.products} p 
                   inner join
                   ${this.stocks} s 
                   on p.id = s.product_id`
        } as QueryConfig;

        const result = await this.databaseClient.query(query);
        return result.rows ? result.rows : null;
    }

    async createProduct(products: Pick<ProductInterface, 'title' | 'description' | 'price'>) {
        const query = {
            text: `INSERT INTO ${this.products}(title, description, price) VALUES($1, $2, $3) RETURNING *`,
            values: [products.title, products.description, products.price],
        };
        const result = await this.databaseClient.query(query);
        return result.rows[0] ? result.rows[0] : null;
    }
}

export { PgProductService };