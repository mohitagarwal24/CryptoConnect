const Footer = () => {
    return (
      <footer className="bg-white w-full">
        <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
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
              { name: "Facebook", path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
              { name: "Instagram", path: "M12.315 2c2.43 0 2.784..." },
              { name: "Twitter", path: "M8.29 20.251c7.547 0 11.675-6.253..." },
              { name: "GitHub", path: "M12 2C6.477 2 2 6.484 2 12.017..." },
              { name: "Dribbble", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10..." }
            ].map((social) => (
              <a key={social.name} href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{social.name}</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d={social.path} clipRule="evenodd"></path>
                </svg>
              </a>
            ))}
          </div>
  
          {/* Copyright Text */}
          <p className="mt-8 text-base leading-6 text-center text-gray-400">
            © {new Date().getFullYear()} SomeCompany, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  