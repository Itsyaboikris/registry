import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Registry() {
  const gifts = [
    {
      title: "Honeymoon Fund",
      description: "Help us create unforgettable memories on our dream honeymoon.",
      link: "#"
    },
    {
      title: "Home Essentials",
      description: "Contribute to our new home together.",
      link: "#"
    },
    {
      title: "Dining Experience",
      description: "Gift us a special dining experience at our favorite restaurant.",
      link: "#"
    },
    {
      title: "Charity Donation",
      description: "Make a donation to our chosen charity in our name.",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair text-4xl text-center mb-2">Gift Registry</h1>
        <p className="font-cormorant text-xl text-center mb-12">Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we've created this registry.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gifts.map((gift, index) => (
            <Card key={index} className="p-6 border-primary/20 hover:shadow-md transition-shadow">
              <h3 className="font-playfair text-2xl mb-2">{gift.title}</h3>
              <p className="font-cormorant text-lg mb-4">{gift.description}</p>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Link href={gift.link}>View Details</Link>
              </Button>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/">Back to Invitation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}