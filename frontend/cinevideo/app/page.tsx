// app/page.tsx
"use client";
import Login from "./pages/Login";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/");
  };

  return <Login onLoginSuccess={handleLoginSuccess} />;
}