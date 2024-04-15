"use client";

import Image from "next/image";
import useSWR from "swr";
import fetch from "libs/fetch";

interface User {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
  email: string;
}

export default function Page() {
  const { isLoading, data, error } = useSWR(
    "https://randomuser.me/api/",
    fetch,
    { refreshInterval: 4000 }
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="ml-10 mr-10">
      <h1 className="text-center text-2xl mt-10 mb-10 font-bold">
        Random User
      </h1>
      {data?.results?.map((user: User) => (
        <div className="flex flex-col justify-center items-center">
          <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[400px] mx-auto p-4 bg-[#F3F3F3] bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
              <Image
                src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
                alt="bg-avatar"
                width={500}
                height={500}
              ></Image>
              <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                <Image
                  className="h-full w-full rounded-full"
                  src={user.picture.large}
                  alt="avatar"
                  width={500}
                  height={500}
                ></Image>
              </div>
            </div>
            <div className="mt-16 flex flex-col items-center">
              <h4 className="text-xl font-bold text-navy-700 text-black">
                {user.name.first + " " + user.name.last}
              </h4>
              <p className="text-base font-normal text-gray-600">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
