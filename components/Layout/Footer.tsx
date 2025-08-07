import Link from 'next/link';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
      ],
    },
    {
      title: 'Account',
      links: [
        { name: 'Manage Profile', href: '/profile' },
        { name: 'Subscription', href: '/subscription' },
        { name: 'Billing', href: '/billing' },
      ],
    },
  ];

  return (
    <footer className="bg-black/90 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="netflix-gradient rounded px-3 py-1 text-2xl font-bold text-white w-fit">
              StreamFlix
            </div>
            <p className="text-gray-400 text-sm">
              Your premium streaming destination for unlimited entertainment.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/michaelysmael10"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/michael-ysmael-jr-fernandez-0b4318280/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-white font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} StreamFlix. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm flex items-center space-x-4">
              <span>Developed by</span>
              <Link
                href="https://github.com/michaelysmael10"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 transition-colors font-medium"
              >
                Michael Ysmael Jr. Fernandez
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;