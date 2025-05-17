import Banner from "@/components/Banner";
import Hero from "@/components/Hero";
import NewCollections from "@/components/NewCollections";
import Newsletter from "@/components/Newsletter";
import Women from "@/components/Women";

export default function Home() {
  return (
    <>
      <Hero />
      <Women />
      <Banner />
      <NewCollections />
      <Newsletter />
    </>
  );
}
