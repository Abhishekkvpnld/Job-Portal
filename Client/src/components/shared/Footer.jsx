import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white">

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-1"
            >
              <span className="text-2xl font-black">
                Dream
              </span>

              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl font-black text-transparent">
                IT
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              Connecting talented people with meaningful
              opportunities. Search smarter, apply confidently
              and build the career you want.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition-all hover:-translate-y-1 hover:bg-white/10"
              >
                <Linkedin size={17} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition-all hover:-translate-y-1 hover:bg-white/10"
              >
                <Github size={17} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition-all hover:-translate-y-1 hover:bg-white/10"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Platform
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link
                  to="/jobs"
                  className="transition hover:text-white"
                >
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/browse"
                  className="transition hover:text-white"
                >
                  Search Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="transition hover:text-white"
                >
                  Create Account
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="transition hover:text-white"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Company
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="#" className="transition hover:text-white">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Contact
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Career Advice
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Legal
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="#" className="transition hover:text-white">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Terms of Service
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 DreamIT. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>Connecting talent everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;