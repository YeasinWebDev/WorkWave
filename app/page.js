import About from "@/components/About";
import AccordionCom from "@/components/AccordionCom";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Integrations from "@/components/Integrations";
import Nav from "@/components/Nav";
import Pricing from "@/components/Pricing";
import Product from "@/components/Product";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="bg-[#07090F] min-h-screen w-full pb-10">
      <div className="md:w-[80%] lg:w-[80%] xl:w-[60%] w-full pl-2 md:px-0  mx-auto">
        <Nav />
        <Hero/>
        <Product/>
        <About/>
        <Benefits/>
        <Integrations/>
        <Pricing/>
        <Testimonials/>
        <AccordionCom/>
      </div>
      <div className="md:w-[90%] lg:w-[80%] xl:w-[80%] mx-auto">
        <Footer/>
      </div>
    </div>
  );
}
