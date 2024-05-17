import HeroSection from "@/components/HeroSection";
import Products from "@/components/Products";
import Image from "next/image";

export type ProductsType={
  name:string,
  price:number,
  description:string,
  itemsLeft:number,
  image:string,
  quantity:number

}

export default async function Home() {

  const res = await fetch("http://localhost:5000/products",{cache:"no-store"})
 
  const data = await res.json()
  console.log(data)


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
        <HeroSection/>
        <Products products={data.products}/>
    </main>
  );
}
