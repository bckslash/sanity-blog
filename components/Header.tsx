import Link from "next/link";

function Header() {
    return (
        <header className="flex flex-wrap items-center justify-between p-5 md:mx-20 lg:mx-40 xl:mx-60">
            <div className="flex items-center space-x-5">
                <Link href="/">
                    <h1 className="cursor-pointer text-xl font-bold text-gray-900">
                        Robert Smrek
                    </h1>
                </Link>
            </div>
            <div className="flex items-center space-x-5 text-green-600">
                <Link href="/about">
                    <h3 className="cursor-pointer">About Me</h3>
                </Link>
                <Link href="/">
                    <h3 className=" cursor-pointer rounded-full border border-green-600 px-4">
                        Blog
                    </h3>
                </Link>
            </div>
        </header>
    );
}

export default Header;
