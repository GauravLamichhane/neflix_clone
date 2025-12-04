import Link from "next/link";
export default function NewNavbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-linear-to-b from-black/80 via-black/40 to-transparent transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between px-12 md:px-20 lg:px-32 py-4 md:py-6 transition-all duration-300 ease-in-out">
        <img
          src="/netflix-3.svg"
          alt="Netflix"
          className="w-28 md:w-32 lg:w-36 h-auto cursor-pointer transition-all duration-300 ease-in-out"
        />
        <Link href="/signin">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm font-semibold transition">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
}
