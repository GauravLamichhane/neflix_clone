export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
      <div className="flex justify-between items-center px-6 md:px-16 lg:px-24 py-4 md:py-6">
        <h1 className="text-red-600 text-2xl md:text-3xl font-extrabold tracking-tight cursor-pointer">
          NETFLIX
        </h1>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm font-semibold transition">
          Sign In
        </button>
      </div>
    </nav>
  );
}
