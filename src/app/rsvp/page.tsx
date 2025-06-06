import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function RSVP() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf7f2] p-4">
      <Card className="max-w-md w-full p-8 shadow-lg border-primary/20">
        <h1 className="font-playfair text-3xl text-center mb-6">RSVP</h1>
        
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="font-cormorant text-lg block">Full Name</label>
            <input 
              type="text" 
              className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="font-cormorant text-lg block">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="space-y-2">
            <label className="font-cormorant text-lg block">Number of Guests</label>
            <select className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="font-cormorant text-lg block">Attending</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="attending" value="yes" className="mr-2" />
                <span>Yes</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="attending" value="no" className="mr-2" />
                <span>No</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="font-cormorant text-lg block">Dietary Restrictions</label>
            <textarea 
              className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              placeholder="Please list any dietary restrictions"
            ></textarea>
          </div>
          
          <div className="pt-4">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">
              Submit RSVP
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-primary hover:underline font-cormorant">
            Back to Invitation
          </Link>
        </div>
      </Card>
    </div>
  );
}