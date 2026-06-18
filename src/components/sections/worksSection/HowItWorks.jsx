import Link from "next/link";
import { FaComments, FaHeart, FaSearch, FaUserPlus } from "react-icons/fa";

const steps = [
  {
    id: "01",
    title: "Create Account",
    icon: FaUserPlus,
    description:
      "Register as a donor or recipient in just a few minutes and become part of our life-saving community.",
  },
  {
    id: "02",
    title: "Find or Request Blood",
    icon: FaSearch,
    description:
      "Search available donors near you or create an urgent blood request for immediate help.",
  },
  {
    id: "03",
    title: "Connect & Coordinate",
    icon: FaComments,
    description:
      "Connect directly with verified donors and coordinate donation details securely.",
  },
  {
    id: "04",
    title: "Save a Life",
    icon: FaHeart,
    description:
      "Complete the donation process and make a real difference in someone's life.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-24">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500">
            HOW IT WORKS
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            How <span className="text-red-500">One Drop Blood</span> Works
          </h2>

          <p className="mt-6 text-lg text-gray-400">
            From registration to life-saving donations, our platform makes every
            step simple, secure, and impactful.
          </p>
        </div>

        {/* Timeline Line */}
        <div className="relative">
          <div className="absolute left-1/2 top-16 hidden h-1 w-[75%] -translate-x-1/2 rounded-full bg-linear-to-r from-red-500/20 via-red-500 to-red-500/20 lg:block" />

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-red-500/40"
                >
                  {/* Number */}
                  <div className="absolute right-5 top-4 text-6xl font-black text-white/5">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-500/10 transition-all duration-500 group-hover:bg-red-500">
                    <Icon className="text-3xl text-red-500 transition-all duration-500 group-hover:text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <h3 className="mb-4 text-2xl font-bold">{step.title}</h3>

                    <p className="leading-7 text-gray-400">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -bottom-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-red-500/20 bg-red-500/10 px-6 py-3">
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
              READY?
            </span>

            <p className="text-sm text-gray-300 md:text-base">
              Join thousands of donors and start saving lives today.
            </p>

            <Link href="/register">
              <button className="font-semibold text-red-500 hover:text-red-400 transition-colors duration-300 cursor-pointer">
                Create Account →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
