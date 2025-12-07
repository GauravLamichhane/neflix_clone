import NewNavbar from "@/components/NewNavbar";
// import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import TrendingNow from "@/components/TrendingNow";
import TrendingNew from "@/components/TrendingNew";
import ReasonsSection from "@/components/ReasonsSection";
// import FaqSection from "@/components/FaqSection";
// import CtaBanner from "@/components/CtaBanner";
// import Footer from "@/components/Footer";
import dynamic from "next/dynamic";


//we can implement lazy loading and skeletons together
const FaqSection = dynamic(() => import("@/components/FaqSection"), {
  loading: () => (
    <div className="min-h-screen bg-black py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="h-12 bg-gray-800 rounded w-64 mb-8 shimmer" />
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-16 bg-gray-800 rounded mb-4 shimmer" />
          ))}
      </div>
    </div>
  ),
});
const CtaBanner = dynamic(() => import("@/components/CtaBanner"), {
  loading: () => <div className="h-64 bg-black" />,
  // ssr: false,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-96 bg-black" />,
  // ssr: false,
});

export default function Home() {
  return (
    <main className="text-white">
      <NewNavbar />
      {/* <Navbar /> */}
      <Hero />
      <TrendingNew />
      <ReasonsSection />
      <FaqSection />
      <CtaBanner />
      <Footer />
    </main>
  );
}
