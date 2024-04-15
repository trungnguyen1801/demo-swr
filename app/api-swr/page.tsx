"use client";

import Image from "next/image";
import useSWR from 'swr';
import fetch from "libs/fetch"

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
    data,
    error,
  } = useSWR("https://fakestoreapi.com/products", fetch, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 404) return
      if (key === '/api/user') return
      if (retryCount >= 10) return
   
      setTimeout(() => revalidate({ retryCount }), 5000)
    }
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  if(error) {
    return <p>{error}</p>;
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
