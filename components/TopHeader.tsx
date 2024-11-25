import { EllipsisVertical, X } from "lucide-react";
import Image from "next/image";


export default function TopHeader(){


    return (
      <div className="space-x-5 0 h-20 w-full flex justify-between items-center px-7">
         <div className="rounded-full p-2 hover:bg-gray-100 transition duration-200 ease-in-out">
          <EllipsisVertical />
         </div>
        
        <div className="flex gap-4 items-center">
          <Image src="images\Logo.svg" alt="Logo" width={100} height={100}  style={{ objectFit: "contain"}} className="h-8 w-8"/>
          <p className="flex-1 font-semibold text-lg">Overlay</p>
        </div>
        
        <div className="rounded-full p-2 hover:bg-gray-100 transition duration-200 ease-in-out">
        <X />
        </div>
      </div>
    )
}