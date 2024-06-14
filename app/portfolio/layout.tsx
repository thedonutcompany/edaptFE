import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {/* <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-200 rounded-md p-2">
        <div className="flex justify-center">
          <button
            className={"bg-white text-green-500 px-4 py-2 mx-1 rounded-t-md"}
          >
            Profile
          </button>
          <button className={"text-gray-700 px-4 py-2 mx-1 rounded-t-md"}>
            Portfolio
          </button>
        </div>
      </div> */}
    </>
  );
}
