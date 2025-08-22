import Link from "next/link";

export default function AuthFooter() {
  return (
    <p className="text-center mt-4">
        Ainda não tem conta?{" "}
      <Link href="/registration" className="text-sm text-[#FF0000]">
        Cadastre-se
      </Link>
    </p>
  );
}