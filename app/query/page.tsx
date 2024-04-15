"use client";

import { useQuery, UseQueryResult } from "react-query";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function Page() {
  const {
    isLoading,
    isError,
    data,
    error,
  }: UseQueryResult<Product[], any> = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="ml-10 mr-10">
      <h1 className="text-center text-2xl mt-10 mb-10 font-bold">Product List</h1>
      <table>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
        </tr>
        {data?.map((item: Product) => (
          <tr>
            <td className="font-normal">
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
                className="w-20 h-20 object-cover"
              />
            </td>
            <td className="font-normal text-center">{item.title}</td>
            <td className="font-normal">${item.price}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
