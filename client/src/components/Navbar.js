import Link from './Link';

function Navbar() {
  const links = [
    { label: 'Home', path: '/' },
    { label: 'Find Jobs', path: '/find-jobs' },
    { label: 'Hire Employees', path: '/hire-employees' },
    { label: 'About', path: '/about' },
  ];

  const renderedLinks = links.map((link) => {
    return (
      <Link
        key={link.label}
        to={link.path}
        className="mb-3 text-xs sm:text-base lg:text-xl"
        activeClassName="font-bold border-b-4 border-white pb-2"
      >
        {link.label}
      </Link>
    );
  });

  return (
    <div className="mr-16 sm:mr-0 pt-4 pb-2 w-[300px] sm:w-[60%] lg:w-[35%] absolute top-0 flex justify-around bg-gray-600 bg-clip-padding bg-opacity-10 rounded-full"  style={{backdropFilter: "blur(30px)"}}>
      {renderedLinks}
    </div>
  );
}

export default Navbar;
