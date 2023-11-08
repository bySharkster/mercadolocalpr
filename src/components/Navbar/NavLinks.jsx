import Link from "next/link";

  const categories = [
    {
      id: 1,
      name: "categorias",
      link: "/category",
    },
    {
      id: 2,
      name: "pueblos",
      link: "/pueblos",
    },
    {
      id: 3,
      name: "contactece",
      link: "/about#contacto",
    },
  ];

export const NavLinks = ({ isOpen, setIsOpen }) => {
  return (
    <ul className="grid gap-10">
      {categories.map((category) => (
        <li
          key={category.id}
          className="transition-all hover:bg-black hover:text-white rounded-2xl hover:p-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Link
            className="my-5 active:bg-slate-500"
            href={`${category.link}`}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};