import Link from "next/link";

export const CategorySection = () => {
  
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
  
  return (
    <section id="categories" className="bg-[#E1EFE6] p-10">
      <h1 className="text-4xl font-semibold text-black">Navega por categoria</h1>
      <div className="grid justify-between grid-cols-2 gap-12 my-24 justify-items-center md:gap-10 md:flex md:flex-wrap">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.category}`}>
            <div className="grid items-center justify-center w-32 h-48 p-10 bg-white border-2 border-black md:w-48 md:h-48 rounded-2xl" style={{boxShadow: "0px 5px 0px #000"}}>
              <div className="flex items-center justify-center">
                <img
                  src={category.icon}
                  alt="category icon"
                  className="w-20 h-20 bg-white cat-img rounded-2xl"
                />
              </div>
              <span className="font-bold text-center text-black text-md md:text-xl">
                {category.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}