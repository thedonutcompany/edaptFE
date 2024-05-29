import NavBar from "@/components/madeups/navbar";
import type { Metadata } from "next";
import Image from "next/image";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edapt | Profile",
  description:
    "Edapt is a platform for educators to share and discover resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
