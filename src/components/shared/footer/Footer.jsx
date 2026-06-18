import Image from "next/image";
import Link from "next/link";
import {
    FaEnvelope,
    FaFacebookF,
    FaHeart,
    FaInstagram,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050816] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <Image
                src="/oneDropLogo.png"
                alt="One Drop Blood"
                width={50}
                height={50}
              />

              <h2 className="text-2xl font-bold">
                <span className="text-red-500">One</span>
                <span> Drop Blood</span>
              </h2>
            </div>

            <p className="mb-6 text-gray-400 leading-8">
              Connecting blood donors with those in need. Together we can save
              lives and build a stronger community through voluntary blood
              donation.
            </p>

            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-gray-300 transition-all duration-300 hover:bg-red-600 hover:text-white"
                  >
                    <Icon />
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Quick Links</h3>

            <div className="flex flex-col gap-4 text-gray-400">
              <Link href="/" className="hover:text-red-500">
                Home
              </Link>

              <Link href="/donors" className="hover:text-red-500">
                Find Donor
              </Link>

              <Link href="/request" className="hover:text-red-500">
                Request Blood
              </Link>

              <Link href="/about" className="hover:text-red-500">
                About Us
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Support</h3>

            <div className="flex flex-col gap-4 text-gray-400">
              <Link href="#" className="hover:text-red-500">
                Privacy Policy
              </Link>

              <Link href="#" className="hover:text-red-500">
                Terms & Conditions
              </Link>

              <Link href="#" className="hover:text-red-500">
                Contact Us
              </Link>

              <Link href="#" className="hover:text-red-500">
                FAQ
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Stay Connected</h3>

            <div className="space-y-5 text-gray-400">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-red-500" />
                <span>+880 1712-********</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-red-500" />
                <span>support@onedropblood.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-red-500" />
                <span>Sirajganj, Bangladesh</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <div className="flex overflow-hidden rounded-xl border border-white/10">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-white/5 px-4 py-3 outline-none"
                />

                <button className="bg-red-600 px-5 font-medium hover:bg-red-700">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} One Drop Blood. All rights reserved.
          </p>

          <p className="flex items-center gap-2">
            Made with
            <FaHeart className="text-red-500" />
            for saving lives organized by{"  codealoy"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
