'use client'
import { Love_Light, Love_Ya_Like_A_Sister, Loved_by_the_King, Raleway } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { BsCartPlus, BsTrash2Fill } from 'react-icons/bs'
import { GiCancel } from 'react-icons/gi'
import Swal from 'sweetalert2'

type Props = {}
const fontR = Love_Light({ subsets: ['latin'], weight: ["400"] })
const fontS = Love_Ya_Like_A_Sister({ subsets: ['latin'], weight: ["400"] })
type CartItem = {
    _id: string
    name: string,
    price: number,
    description: string,
    itemsLeft: number,
    image: string,
    quantity: number
}
function Cart({ }: Props) {

    const userId = "66353a124f1ce681098a113c" //for simplification --- the id is stored in db , and user exists with this id

    const router = useRouter()

    const [cartItems, setcartItems] = useState<CartItem[] | []>([])
    const [totalPrice, settotalPrice] = useState<number>()

    const [showDialog, setShowDialog] = useState(false);
    const [shippingAddress, setShippingAddress] = useState("");

    const [btnDis, setbtnDis] = useState<boolean>(false)
    const [btnDia, setbtnDia] = useState<boolean>(true)



    const handleProcessOrder = () => {
        setShowDialog(true);
    };



    useEffect(() => {
        let s_products = localStorage.getItem("products")
        let products = s_products ? JSON.parse(s_products) : []

        setcartItems(products)
    }, [])

    useEffect(() => {
        let prices = cartItems.map(cartItem => (
            cartItem.price * cartItem.quantity
        ))
        let totalPrice = prices.reduce((previous, current) => previous + current, 0)
        // console.log(totalPrice)
        settotalPrice(totalPrice)

        setbtnDis(!cartItems || cartItems.length == 0)
    }, [cartItems])

    const increaseQuantity = (index: number) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity += 1;
        setcartItems(newCartItems);
        updateLocalStorage(newCartItems); // Add this function (below)
    };

    const decreaseQuantity = (index: number) => {
        const newCartItems = [...cartItems];
        if (newCartItems[index].quantity > 1) { // Prevent going below 1
            newCartItems[index].quantity -= 1;
            setcartItems(newCartItems);
            updateLocalStorage(newCartItems); // Add this function (below)
        }
    };

    const updateLocalStorage = (updatedCartItems: CartItem[]) => {
        localStorage.setItem("products", JSON.stringify(updatedCartItems));
    }

    const handleConfirmOrder = async () => {

        let finalOrder = {
            products: cartItems,
            userId,
            address: shippingAddress,
            totalPrice

        }
        // localStorage.setItem("order", JSON.stringify(finalOrder))

        try {
            const res = await fetch("http://localhost:5000/confirmOrder", {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(finalOrder)
            })

            const data = await res.json()

            console.log(data, "Successfull")



            localStorage.removeItem("products")
            setcartItems([]);//`Empty cart

            Swal.fire({
                title: 'Success',
                text: 'Your Order has been placed',
                icon: "success",
                confirmButtonText: 'Continue Shopping',
                confirmButtonColor: "#a5dc86"

            })
                .then(res => {

                    if (res.isConfirmed) {
                        router.push("/")
                    }
                })

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Order was not placed',
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor:"#f27474"
            })

        }



        setShowDialog(false); // Close the dialog




        // localStorage.setItem("order",JSON.stringify(cartItems))
    }

    const removeFromCart = (idItem: string) => {
        let cart_Items = [...cartItems].filter(item => item._id != idItem)

        setcartItems(cart_Items);

        updateLocalStorage(cart_Items)

    }

    return (

        <main className='mt-5 p-2  h-[70vh]'>
            <h1 className={`${fontR.className} mb-4  text-6xl text-center`}>Cart</h1>

            <section className=' w-[90vw] boxProduct h-[50vh] overflow-y-scroll mx-auto  '>
                {(cartItems && cartItems.length > 0) ?
                    <>
                        {
                            cartItems?.map((cartItem, index) => (
                                <article className=' flex my-2 items-center p-3 gap-5 sm:px-8' key={index}>
                                    <img src={cartItem.image} alt="" className=" size-9 sm:size-12 " />
                                    <div className=' flex-grow'>
                                        <h3 className='font-semibold text-base sm:text-lg'>{cartItem.name}</h3>
                                        <h4 className=' opacity-70 text-sm'>${cartItem.price}</h4>


                                    </div>

                                    <BsTrash2Fill onClick={() => removeFromCart(cartItem._id)} />

                                    <div className="flex items-center gap-3 "> {/* For buttons and quantity */}
                                        <button onClick={() => decreaseQuantity(index)}><BiMinus /></button>
                                        <h4 className='opacity-70'><span className=' hidden sm:inline-block'>Quantity:</span> {cartItem.quantity}</h4>
                                        <button onClick={() => increaseQuantity(index)}><BiPlus /></button>
                                    </div>
                                </article>
                            ))
                        }
                    </> :
                    <Link href="/"> <h2 className={`${fontS.className} mt-20 mb-4  text-2xl lg:text-3xl text-center flex opacity-30 justify-center flex-col items-center`}>Add to Cart<BsCartPlus /> </h2></Link>

                }
            </section>

            <section className='flex items-center justify-evenly sm:px-10 '>
                <aside className={` ${btnDis && "opacity-40"} flex items-center  justify-between w-2/3 p-3 px-6 boxProduct   my-7`}>
                    <h3 className={`${fontR.className} text-xl `}>Total Price</h3>
                    <p className=' font-mono '>${totalPrice?.toPrecision(4)}</p>
                </aside>
                <aside className=' flex justify-center'>
                    <button disabled={btnDis} className={`${btnDis && "cursor-not-allowed opacity-30 pointer-events-none"}  fancy   w-fit block mx-auto`} onClick={handleProcessOrder} >
                        <span className="top-key"></span>
                        <span className="text text-center">Order</span>
                        <span className="bottom-key-1"></span>
                        <span className="bottom-key-2"></span>
                    </button>
                </aside>
            </section>
            {showDialog && (
                <dialog
                    open
                    className="fixed inset-0 rounded-2xl p-4 flex items-center justify-center bg-opacity-40 w-[93%] lg:w-1/2"
                    style={{
                        boxShadow: " 0 0 5000px 2000px rgba(0, 0, 0, 0.5)"
                    }}
                >
                    <div className="bg-white rounded-lg  p-6 space-y-6 w-full">
                        <h3 className={` text-2xl text-rose-800  ${fontS.className} my-2`}>Order</h3>
                        <input
                            type="text"
                            className='my-2 outline-dashed p-3  outline-rose-800 w-full font-mono font-light'
                            placeholder="Shipping Address"
                            value={shippingAddress}
                            onChange={(e) => {
                                setShippingAddress(e.target.value)
                                e.target.value.length > 5 ? setbtnDia(false) : setbtnDia(true)


                            }}
                        />
                        <div className="flex items-center gap-4 mt-4 justify-between">
                            <button disabled={btnDia} onClick={handleConfirmOrder} className={` ${(btnDia) && "opacity-40 pointer-events-none cursor-not-allowed"} font-sans font-semibold bg-rose-800 text-white p-3 rounded-lg`}>Confirm Order</button>


                            <button onClick={() => setShowDialog(false)}><GiCancel className=' text-rose-800 size-8' /></button>
                        </div>
                    </div>
                </dialog>
            )}


        </main>
        // <div className="card">
        //     <div className="bg"></div>
        //     <div className="blob"></div>
        // </div>

    )
}

export default Cart