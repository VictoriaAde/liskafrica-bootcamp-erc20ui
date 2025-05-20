import { Outlet } from "react-router-dom";

import Header from "@/components/shared/header"; 

export default function AppLayout() {
  return (
    <main className="h-screen">
      <div className="fixed h-full w-full bg-black">
        <div className="absolute bottom-0 left-0 right-0 opacity-30 top-0 bg-[linear-gradient(to_right,#111113_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>
      <Header />
      <Outlet />
    </main>
  );
}
