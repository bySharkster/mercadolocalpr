import Link from "next/link";

  const categories = [
    {
      id: 1,
      category: "Bienes-Raices",
      icon: "/svgs/house.svg",
    },
    {
      id: 2,
      category: "Alquiler-o-vacaciones",
      icon: "/svgs/rental.svg",
    },
    {
      id: 3,
      category: "Automoviles",
      icon: "/svgs/car.svg",
    },
    {
      id: 4,
      category: "Mascotas",
      icon: "/svgs/pet.svg",
    },
    {
      id: 5,
      category: "Articulos",
      icon: "/svgs/couch.svg",
    },
    {
      id: 6,
      category: "Empleos",
      icon: "/svgs/users.svg",
    },
    {
      id: 7,
      category: "Servicios",
      icon: "/svgs/services.svg",
    },
  ];

export const NavLinks = () => {
    return (
      <ul className="grid gap-10">
        {categories.map((category) => (
            <li key={category.id} className="transition-all hover:bg-black hover:text-white rounded-2xl hover:p-3">
              <Link className="my-5 active:bg-slate-500" href={`/category/${category.category}`}>
                {category.category}
              </Link>
            </li>
        ))}
      </ul>
    );
}