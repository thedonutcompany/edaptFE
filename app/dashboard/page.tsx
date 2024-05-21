"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const pages = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  if (!token) {
    router.push("/signin");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the protected dashboard!</p>
    </div>
  );
};

export default pages;
