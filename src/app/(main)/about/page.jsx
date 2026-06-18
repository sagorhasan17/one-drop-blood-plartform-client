import { Button } from "@heroui/react";
import {
    FaClock,
    FaHeart,
    FaMapMarkerAlt,
    FaShieldAlt,
    FaTint,
    FaUsers,
} from "react-icons/fa";

const AboutPage = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500">
            ABOUT ONE DROP BLOOD
          </span>

          <h1 className="mt-6 text-5xl font-black md:text-7xl">
            Every Drop
            <span className="text-red-500"> Saves a Life</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            One Drop Blood is a community-driven blood donation platform
            dedicated to connecting donors with patients in need. Our mission is
            to make blood donation faster, safer, and more accessible for
            everyone.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
              <FaHeart className="text-2xl text-red-500" />
            </div>

            <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>

            <p className="leading-8 text-gray-400">
              To eliminate delays in emergency blood collection by creating a
              trusted platform where donors and recipients can connect instantly
              and efficiently.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
              <FaTint className="text-2xl text-red-500" />
            </div>

            <h2 className="mb-4 text-3xl font-bold">Our Vision</h2>

            <p className="leading-8 text-gray-400">
              To build the largest blood donor network in Bangladesh where every
              patient can find blood quickly and every donor can make a
              meaningful impact.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-24 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <FaUsers className="mx-auto mb-4 text-4xl text-red-500" />
            <h3 className="text-4xl font-bold">500+</h3>
            <p className="mt-2 text-gray-400">Registered Donors</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <FaHeart className="mx-auto mb-4 text-4xl text-red-500" />
            <h3 className="text-4xl font-bold">1200+</h3>
            <p className="mt-2 text-gray-400">Lives Impacted</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <FaTint className="mx-auto mb-4 text-4xl text-red-500" />
            <h3 className="text-4xl font-bold">150+</h3>
            <p className="mt-2 text-gray-400">Blood Requests</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-24">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold">Why Choose One Drop Blood?</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <FaShieldAlt className="mb-5 text-3xl text-red-500" />

              <h3 className="mb-3 text-2xl font-bold">Verified Donors</h3>

              <p className="text-gray-400">
                Connect with trusted and verified donors for safe blood donation
                experiences.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <FaClock className="mb-5 text-3xl text-red-500" />

              <h3 className="mb-3 text-2xl font-bold">Fast Response</h3>

              <p className="text-gray-400">
                Quickly find available donors during emergencies when every
                minute matters.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <FaMapMarkerAlt className="mb-5 text-3xl text-red-500" />

              <h3 className="mb-3 text-2xl font-bold">Local Community</h3>

              <p className="text-gray-400">
                Search donors nearby and build a stronger blood donation network
                in your area.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 rounded-3xl border border-red-500/20 bg-red-500/10 p-12 text-center">
          <h2 className="text-4xl font-black">Become a Hero Today</h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Join our growing community of blood donors and help save lives with
            just one donation.
          </p>

          <Button
            className="mt-8 bg-red-600 px-8 text-white hover:bg-red-700"
            radius="full"
            size="lg"
          >
            Join As Donor
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
