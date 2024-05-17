import { Alegreya_Sans, Raleway, Ropa_Sans } from 'next/font/google'
import React from 'react'

const fontR = Raleway({ subsets: ['latin'], weight: ["800"] })
const fontP = Ropa_Sans({ subsets: ['latin'], weight: ["400"] })
const fontM = Alegreya_Sans({ subsets: ['latin'], weight: ["400"] })



type Props = {}

function HeroSection({ }: Props) {
    return (
        <section className='grid md:grid-cols-2 lg:grid-cols-3 place-content-center p-10'>
            <article className='lg:col-span-2 col-span-1 lg:space-y-3'>
                <h1 className={`${fontR.className} text-4xl md:text-3xl lg:text-6xl`}>Shop Quality T-Shirts</h1>
                <p className={`${fontP.className} text-lg md:text-md lg:text-xl opacity-90`}>Find the perfect fit from our curated collection of soft, comfortable tees.</p>
                <ul className={`${fontM.className} hidden md:block list-disc opacity-60 pl-4 mt-4`}>  {/* Bullet list with disc marker */}
                    <li>Made with premium, 100% cotton.</li>
                    <li>Unique designs you won't find anywhere else.</li>
                    <li>Available in a variety of sizes and colors.</li>
                </ul>

            </article>
            <img src="/ecom.png" className='' alt="" />
        </section>
    )
}

export default HeroSection