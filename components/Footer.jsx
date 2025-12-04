const footerLinks = [
  ["FAQ", "Investor Relations", "Privacy", "Speed Test"],
  ["Help Center", "Jobs", "Cookie Preferences", "Legal Notices"],
  ["Account", "Ways to Watch", "Corporate Information", "Only on Netflix"],
  ["Media Center", "Terms of Use", "Contact Us"],
];

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-16">
      <div className="mx-auto max-w-6xl px-6 space-y-8">
        <a href="#" className="underline text-sm">
          Questions? Contact us.
        </a>

        <div className="grid gap-6 text-sm sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {footerLinks.map((column, idx) => (
            <ul key={idx} className="space-y-3">
              {column.map((link) => (
                <li key={link}>
                  <a href="#" className="underline hover:text-gray-100">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <div className="relative">
            <select className="w-32 rounded border border-gray-500 px-3 py-2 text-left">
              <option value="">English</option>
            </select>
          </div>
          <p>Netflix Nepal</p>
          <p className="text-xs text-gray-500">
            This page is protected by Google reCAPTCHA to ensure you&aptos;re
            not a bot.
            <a href="#" className="underline ml-1">
              Learn more.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
