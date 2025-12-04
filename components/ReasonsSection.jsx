const reasons = [
  {
    title: "Enjoy on your TV",
    description:
      "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
  },
  {
    title: "Download your shows to watch offline",
    description:
      "Save your favorites easily and always have something to watch.",
  },
  {
    title: "Watch everywhere",
    description:
      "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
  },
  {
    title: "Create profiles for kids",
    description:
      "Send kids on adventures with their favorite characters in a space made just for them — free with your membership.",
  },
];
export default function ReasonsSection() {
  return (
    <section className="bg-black py-10 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold mb-6">More Reasons to Join</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <article
              key={reason.title}
              className="rounded-2xl bg-linear-to-b from-[#1b1c3d] via-[#1b122c] to-[#1e0d1f] px-6 py-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
            >
              <h3 className="text-xl font-semibold">{reason.title}</h3>
              <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
