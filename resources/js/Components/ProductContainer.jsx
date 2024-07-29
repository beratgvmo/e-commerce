import Product from "./Product";

export default function ProductContainer({ products, cart }) {
    return (
        <div className="grid grid-cols-4 gap-4 mt-4">
            {products.map((product, index) => (
                <Product product={product} key={index} cart={cart} />
            ))}
        </div>
    );
}
