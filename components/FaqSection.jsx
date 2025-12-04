const faqs = [
  {
    question: "What is Netflix?",
    answer: "Netflix is a streaming service ...",
  },
  {
    question: "How much does Netflix cost?",
    answer: "Plans start at USD 2.99 ...",
  },
  {
    question: "Where can I watch?",
    answer: "Watch on any device with the Netflix app ...",
  },
  {
    question: "How do I cancel?",
    answer: "Cancel online anytime from your Account page.",
  },
  {
    question: "What can I watch on Netflix?",
    answer: "Unlimited movies, TV shows, games, and more.",
  },
  {
    question: "Is Netflix good for kids?",
    answer: "Kids profiles include PIN-protected controls.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-black py-10 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-2 ">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-sm border border-black bg-[#333] text-white transition hover:bg-[#3d3d3d]"
            >
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-lg font-semibold ">
                {faq.question}
                <span className="text-2xl transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-black px-6 py-5 text-base text-gray-200">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
