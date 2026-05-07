export default function About() {
  const cards = [
    {
      title: "App Router",
      description: "Leveraging the power of Next.js 13+ App Router for nested layouts and simplified routing.",
      icon: "🚀",
    },
    {
      title: "Tailwind CSS",
      description: "Styled with utility-first CSS for rapid development and highly customizable designs.",
      icon: "🎨",
    },
    {
      title: "Client-side Logic",
      description: "State management using React hooks to provide a smooth and interactive user experience.",
      icon: "💻",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-blue-600">About the Project</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Everything you need to know
        </p>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          This application was built as a demonstration of modern web development practices using the latest Next.js features.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="flex flex-col bg-white p-8 rounded-2xl shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-shadow">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                <span className="text-2xl">{card.icon}</span>
                {card.title}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">{card.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
