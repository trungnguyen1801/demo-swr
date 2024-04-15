"use client"

import React, { useState } from "react";
import useSWR from "swr";
import fetch from "../../libs/fetch";

interface User {
  name: string
}

export default function Page() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useSWR(
    `https://swapi.dev/api/planets/?page=${page}`,
    fetch,
  );

  if(isLoading) return <h2>loading...</h2>

  if (error) return <h1>Error</h1>;

  return (
    <div className="App">
      <h1 className="text-center text-2xl mt-10 mb-10 font-bold">Page {page}</h1>
      <ul className="text-center">
        {data.results.map((item: User) => (
          <li>{item.name}</li>
        ))}
      </ul>
      <ul className="flex justify-center items-center -space-x-px">
        <li>
          <button 
            disabled={!data.previous}
            onClick={() => setPage(data.previous.split("page=")[1])}
            className="bg-white disabled:bg-gray-700 disabled:hover:text-gray-400 disabled:cursor-not-allowed border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
        </li>
        <li>
          <button
          disabled={!data.next}
          onClick={() => setPage(data.next.split("page=")[1])}
            className="bg-white disabled:bg-gray-700 disabled:hover:text-gray-400 disabled:cursor-not-allowed border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
        </li>
      </ul>
    </div>
  );
}
