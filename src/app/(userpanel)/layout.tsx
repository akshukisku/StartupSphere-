import AiChat from "@/components/ai/AiChat";
import Footer from "@/layout/Footer";
import Navbar from "@/layout/Navbar";
import React from "react";

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  console.log("UserLayout Mounted");
  return (
    <>
    <AiChat/>
      <Navbar />
      {children}
      <Footer />
      
    </>
  );
};

export default UserLayout;
