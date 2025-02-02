import { FaTwitter, FaGithub, FaDribbble } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        {/* Main content of the page goes here */}
      </div>

      <footer className="bg-gray-100 w-full mt-auto py-12">
        <div className="max-w-screen-xl px-4 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center -mx-5 -my-2">
            {["About", "Blog", "Team", "Pricing", "Contact", "Terms"].map((item) => (
              <div key={item} className="px-5 py-2">
                <a href="#" className="text-base leading-6 text-gray-500 hover:text-gray-900">
                  {item}
                </a>
              </div>
            ))}
          </nav>

          {/* Social Media Icons */}
          <div className="flex justify-center mt-8 space-x-6">
            {[ 
              { name: "Twitter", Icon: FaTwitter },
              { name: "GitHub", Icon: FaGithub },
              { name: "Dribbble", Icon: FaDribbble }
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className="text-gray-400 hover:text-gray-500 transition-colors duration-300"
                title={social.name} // Tooltip added for accessibility
              >
                <span className="sr-only">{social.name}</span>
                <social.Icon className="w-6 h-6" aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Copyright Text */}
          <p className="mt-8 text-base leading-6 text-center text-gray-400">
            © {new Date().getFullYear()} SomeCompany, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
