import { GetServerSideProps } from "next";
import Cookies from "js-cookie";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = Cookies.get("token");

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Your props here
  };
};

const pages = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the protected dashboard!</p>
    </div>
  );
};

export default pages;
