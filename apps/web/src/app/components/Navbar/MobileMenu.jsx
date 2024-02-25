import Link from 'next/link';
import {useState} from 'react'

export const MobileMenu = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex border-2 rounded-full p-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      {isOpen ? (
        <div className="absolute bg-white min-h-screen w-[50vw] rounded-l-md right-0 pl-8 grid">
          {/* close btn */}
          <div className="relative top-0 left-[80%]">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          <div className="grid gap-10">
            {isLoggedIn ? (
            <>
                <Link href={"#"}>Crear publicacion</Link>
                <Link href={"#"}>Settings</Link>
            </>
            ) : (
            ""
            )}
            <Link href={"#"}>Sobre nosotros</Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
