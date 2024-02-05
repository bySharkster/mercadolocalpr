import Link from "next/link";

  const categories = [
    {
      id: 1,
      name: "Bienes Raices",
      link: "/category/Bienes-Raices",
    },
    {
      id: 2,
      name: "Alquiler o Vacaciones",
      link: "/category/Alquiler-o-vacaciones",
    },
    {
      id: 3,
      name: "Vehiculos",
      link: "/category/Vehiculos",
    },
    {
      id: 4,
      name: "Mascotas",
      link: "/category/Mascotas",
    },
    {
      id: 5,
      name: "Articulos",
      link: "/category/Articulos",
    },
    {
      id: 6,
      name: "Empleos",
      link: "/category/Empleos",
    },
    {
      id: 7,
      name: "Servicios",
      link: "/category/Servicios",
    },
    {
      id: 8,
      name: "Otros",
      link: "/category/Otros",
    },
    // {
    //   id: 9,
    //   name: "Todos",
    //   link: "/category/Todos",
    // },

    {
      id: 9,
      name: "contactece",
      link: "/about#contacto",
    },
  ];

export const NavLinks = () => {
  return (
    <ul className="flex justify-between gap-10 overflow-x-auto">
      {categories.map((category) => (
        <li
          key={category.id}
          // onClick={"handleClick"}
        >
          <Link
            className="font-mono text-lg text-black transition-all hover:text-gray-500" style={{textWrap: "nowrap"}}
            href={`${category.link}`}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};