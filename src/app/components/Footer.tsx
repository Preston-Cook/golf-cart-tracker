import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#77C7AE] shadow  mt-auto">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-[#5A3E2B] sm:text-center">
          © 2023{" "}
          <Link href="/" className="hover:underline">
            Golf Cart Tracker™
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-[#5A3E2B] sm:mt-0 gap-8">
          <li>
            <Link href="/logs" className="hover:underline">
              Logs
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
