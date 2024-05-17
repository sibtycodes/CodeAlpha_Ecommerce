'use client';
import { ProductsType } from '@/app/page';
import React from 'react'; // No need for useEffect in this scenario
import { toast } from 'react-toastify';


type Props = {
    products: ProductsType[]
}
type ProdLocal = {
    name: string,
    price: number,
    description: string,
    itemsLeft: number,
    image: string,
    quantity: number
}
function Products({ products }: Props) {

    const addToCart = (product: ProductsType) => {



        //?Get products from localStorage,parse them
        let fromLocalProducts = localStorage.getItem("products")
        let localProducts: ProdLocal[] = fromLocalProducts ? JSON.parse(fromLocalProducts) : []

        //?If item is already there, increase the quantity,

        const isItemAlready = localProducts.find((prod: ProdLocal) => product.name == prod.name)
        // console.log(isItemAlready)


        if (isItemAlready) {
        // toast.success(``,{
        //     style:{width:"100px",display:"flex",alignItems:"center",justifyContent:"center"},
        //     position:"top-center",
        //     closeButton:false,
        //     progress:1
            
        // })


            //`filter out array without current prod and then add modified product
            let modifiedProds = localProducts.filter((prods: ProdLocal) => prods.name != product.name)

            modifiedProds.push({
                ...product,
                quantity: (isItemAlready.quantity) + 1
            })

            localStorage.setItem("products", JSON.stringify(modifiedProds))

        }
        else {
            toast.success(`${product.name} added to Cart`)


            localProducts?.push(product)
            localStorage.setItem("products", JSON.stringify(localProducts))

        }


        // console.log(final)

    }

    return (
        <main className="container mx-auto px-4 py-8"> {/* Container for spacing */}
            <section className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <div key={index} className=" boxProduct overflow-hidden"> {/* Product Card */}
                        <img src={product.image} alt={product.name} className="aspect-square object-cover" />
                        <div className="p-4  h-24">
                            <h3 className="font-medium text-lg">{product.name}</h3>
                            <p className="text-gray-600">{product.description}</p> {/* Assuming description exists */}
                            <div className="mt-2 font-bold">${product.price}</div>



                        </div>
                        <aside className=' p-3 flex justify-end '>
                            {/* <button className=' rounded-lg p-2 bg-gray-100 font-semibold font-sans '></button> */}
                            <button className="fancy" onClick={() => addToCart(product)} >
                                <span className="top-key"></span>
                                <span className="text">Add to Cart</span>
                                <span className="bottom-key-1"></span>
                                <span className="bottom-key-2"></span>
                            </button>
                        </aside>
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Products;
