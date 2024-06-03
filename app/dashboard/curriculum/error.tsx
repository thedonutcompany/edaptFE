"use client";
import { NextPageContext } from "next";
import Image from "next/image";

interface ErrorProps {
  statusCode?: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        alt="404"
        src={"/assets/images/404.jpg"}
        height={1000}
        width={1000}
        className="h-[400px] w-[400px]"
      />
      <p className="font-bold text-3xl text-gray-400">No User Found</p>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 404 : 404;
  return { statusCode };
};

export default Error;
