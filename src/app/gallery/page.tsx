import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";

export default function Gallery() {
  // Placeholder for gallery images
  const images = Array(9).fill(null);

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-playfair text-4xl text-center mb-2">Our Gallery</h1>
          <p className="font-cormorant text-xl text-center mb-12">Memories we've shared together</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((_, index) => (
              <div key={index} className="aspect-square bg-gray-200 rounded-md hover:opacity-90 transition-opacity"></div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-white">
              <Link href="/">Back to Invitation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}