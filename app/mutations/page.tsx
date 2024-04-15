"use client";

import { useQuery, useMutation, UseQueryResult } from "react-query";
import Image from "next/image";
import axios from "axios";

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

  const deleteProduct = useMutation({
    mutationKey: ["delete-products"],
    mutationFn: (id: number) =>
      axios.delete(`https://fakestoreapi.com/products/${id}`),
    onSuccess: () => {
      alert("Delete Success!")
    }
  })

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
          <th>Action</th>
        </tr>
        {data?.map((item: Product) => (
          <tr key={item.id}>
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
            <td className="font-normal text-red-700 hover:underline hover:cursor-pointer" onClick={() => deleteProduct.mutate(item.id)}>Delete</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
