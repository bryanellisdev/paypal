import { Link } from '@remix-run/react';
import productdata from '~/data/products.json'

export default function Home() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 id="products-heading" className="sr-only">
                    Products
                </h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {productdata.map((product, index) => (
                        <Link key={index} to={`/product/${product.id}`}>
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
                                <img
                                    src={product.img}
                                    alt="asdf"
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                                <h3>{product.title}</h3>
                                <p>{product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
