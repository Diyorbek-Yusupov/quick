import Link from "next/link";
import { Facebook, Instagram, Twitter, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 mt-auto container-box">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Let's Talk</h3>
          <p className="text-gray-600 mb-2">hello@quick.com</p>
          <p className="text-gray-600 mb-2">Kentucky 39495 USA</p>
          <p className="text-gray-600">+62 818 333 666</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Service</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Buy Property
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Sale Property
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Architecture
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Help
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-end space-x-4">
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <Facebook className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <Instagram className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <Twitter className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <Send className="h-6 w-6" />
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap justify-center space-x-4 text-sm text-gray-600">
        <Link href="#" className="hover:text-gray-900">
          Quick.kz
        </Link>
        <Link href="#" className="hover:text-gray-900">
          Quick.kg
        </Link>
        <Link href="#" className="hover:text-gray-900">
          Quick.az
        </Link>
        <Link href="#" className="hover:text-gray-900">
          Quick.tm
        </Link>
      </div>
      <div className="mt-8 border-t pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            Quick. All right reserved. © 2024
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Terms & Conditions
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
