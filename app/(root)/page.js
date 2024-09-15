import About from "@/components/About";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Product from "@/components/Product";

export default function Home() {
  return (
    <div className="bg-[#07090F] min-h-screen w-full">
      <div className="md:w-[60%] w-full px-4 md:px-0  mx-auto">
        <Nav />
        <Hero/>
        <Product/>
        <About/>
      </div>
    </div>
  );
}
