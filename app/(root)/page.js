import Hero from "@/components/Hero";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <div className="bg-[#07090F] min-h-screen w-full">
      <div className="md:w-[60%] w-full px-4 md:px-0  mx-auto">
        <Nav />
        <Hero/>
      </div>
    </div>
  );
}
