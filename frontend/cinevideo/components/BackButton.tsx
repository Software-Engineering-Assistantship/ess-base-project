import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button className="bg-transparent text-gray-600 p-2 rounded-full" onClick={() => router.back()}>
      <ArrowLeft className="w-6 h-6" />
    </button>
  );
}