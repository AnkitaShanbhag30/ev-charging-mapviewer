interface NavbarProps {
  setCurrentView: (view: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentView }) => (
  <nav className="bg-primary">
    <div className="sm:mx-8 md:mx-12 lg:mx-16">
      <div className="flex justify-between h-16 items-center text-white">
        <h3 className="text-3xl text-justify flex-grow">EV Equity Mapping Platform</h3>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="cursor-pointer bg-transparent border-none p-0"
          >
            Home
          </button>
          <span>|</span>
          <button
            type="button"
            onClick={() => setCurrentView('instructions')}
            className="cursor-pointer bg-transparent border-none p-0"
          >
            How to Use
          </button>
          <span>|</span>
          <button
            type="button"
            onClick={() => setCurrentView('data')}
            className="cursor-pointer bg-transparent border-none p-0"
          >
            Data
          </button>
          <span>|</span>
          <button
            type="button"
            onClick={() => setCurrentView('about')}
            className="cursor-pointer bg-transparent border-none p-0"
          >
            About
          </button>
          <span>|</span>
          <button
            type="button"
            onClick={() => setCurrentView('contact')}
            className="cursor-pointer bg-transparent border-none p-0"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  </nav>
)

export default Navbar
