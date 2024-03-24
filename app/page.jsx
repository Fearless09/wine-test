import Image from "next/image";
import { data } from "@/data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-5 mt-20 flex flex-wrap gap-8">
      {data?.map((item, index) => (
        <Link
          href={`wine/${item.id}`}
          key={index}
          className="w-[250px] rounded-lg border shadow-md hover:border-2 hover:scale-[1.02] cursor-pointer"
        >
          <Image
            src={item.image}
            width={1080}
            height={1080}
            alt="img"
            className="w-full object-cover"
          />
          <div className="p-5 grid gap-1 capitalize">
            <h1 className="font-medium">
              {item.name}
            </h1>
            <h4>{item.year}</h4>
            <h4>{item.country}</h4>
            <h4>{item.type}</h4>
          </div>
        </Link>
      ))}
    </div>
  );
}
