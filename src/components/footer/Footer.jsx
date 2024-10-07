import Link from "next/link";

const Footer = () => {
    const contactLinks = ["/api" , "/api1" , "/api2"];
  return (
    <footer className="mt-5 bg-white ">
        <div className="max-w-screen-xl p-4 mx-auto space-y-2 overflow-hidden sm:px-6 lg:px-8">
            <nav className="flex flex-wrap justify-center -mx-5">
                <Link href={'/'}>
                    <h3 className="text-base md:text-lg px-5 py-4 text-gray-600 hover:text-blue-700 hover:dark:text-blue-400 ">Home</h3>
                </Link>
                <Link href={'/about'} >
                    <h3 className="text-base md:text-lg px-5 py-4 text-gray-600 hover:text-blue-700 hover:dark:text-blue-400 ">About</h3>
                </Link>
                <Link href={'/contact'} >
                    <h3 className="text-base md:text-lg px-5 py-4 text-gray-600 hover:text-blue-700 hover:dark:text-blue-400 ">Contact Us</h3>
                </Link>
            </nav>
            {/* <div className="flex justify-center mt-8 space-x-6">
                <a href={'/insta'} >
                    <h3 className="text-lg  hover:text-blue-700 hover:dark:text-blue-400 dark:text-white">
                        <FaInstagram className="text-2xl md:text-3xl" />
                    </h3>
                </a>
                <a to={'/twitter'} >
                    <h3 className="text-lg  hover:text-blue-700 hover:dark:text-blue-400 dark:text-white">
                        <FaXTwitter className="text-2xl md:text-3xl" />
                    </h3>
                </a>
                <a to={'/linkedin'} >
                    <h3 className="text-lg  hover:text-blue-700 hover:dark:text-blue-400 dark:text-white">
                        <FaLinkedinIn className="text-2xl md:text-3xl " />
                    </h3>
                </a>
            </div> */}
            <p className="py-3 text-base leading-6 text-center text-gray-400 dark:text-darkText-400">
                Alumini Portal
            </p>
        </div>
    </footer>
  )
}

export default Footer