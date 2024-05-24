import type { Metadata } from "next";
import Image from "next/image";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edapt",
  description:
    "Edapt is a platform for educators to share and discover resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Image
        src="/assets/images/logo.png"
        alt="logo"
        width={100}
        height={100}
        className=" object-contain absolute top-10 left-10"
      />
      {children}
    </>
  );
}
