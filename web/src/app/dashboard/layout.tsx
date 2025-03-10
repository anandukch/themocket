import EndpointsStrip from "@/components/Dashboard/Endpoints/EndpointsStrip";
import MainArea from "@/components/Dashboard/Layouts/MainArea";
import Navbar from "@/components/Dashboard/Layouts/Navbar";
import SideStrip from "@/components/Dashboard/Layouts/SideStrip";
import type { Metadata } from "next";
import { Providers } from "../provider";

export const metadata: Metadata = {
  title: "Mocket POC Dashboard",
  description: "Generated by Mocket POC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <main className="h-screen w-screen flex flex-row items-center justify-center">
        <SideStrip />
        <EndpointsStrip />
        <section className="h-full w-full flex flex-col px-5 py-3">
          <Navbar />
          <MainArea>{children}</MainArea>
        </section>
      </main>
    </Providers>
  );
}
