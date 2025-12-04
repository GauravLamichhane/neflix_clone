export default function TrendingNow() {
  return (
    <div className="bg-black text-white py-10">
      <h2 className="text-3xl font-bold mb-6 mx-auto mt-16 max-w-6xl px-6 ">
        Trending Now
      </h2>
      <div className="flex space-x-10 overflow-x-auto scroll-smooth mx-auto mt-16 max-w-6xl px-6">
        <div className="min-w-[150px] h-[225px] rounded-lg shrink-0 overflow-hidden hover:scale-105 transform transition duration-300">
          <img
            src="/stranger.webp"
            alt="Stranger Things"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-[150px] h-[225px] rounded-lg shrink-0 overflow-hidden hover:scale-105 transform transition duration-300">
          <img
            src="/wwe.webp"
            alt="WWE Survivor Series"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-[150px] h-[225px] rounded-lg shrink-0 overflow-hidden hover:scale-105 transform transition duration-300">
          <img
            src="/jolly.webp"
            alt="Jolly LLB 3"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-[150px] h-[225px] rounded-lg shrink-0 overflow-hidden hover:scale-105 transform transition duration-300">
          <img
            src="/delhi.webp"
            alt="Delhi Crime"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-[150px] h-[225px] rounded-lg shrink-0 overflow-hidden">
          <img
            src="/wwe.webp"
            alt="WWE Survivor Series"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-[150px] h-[225px] rounded-lg shrink-0 overflow-hidden">
          <img
            src="/stranger.webp"
            alt="Stranger Things"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
