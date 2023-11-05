import { FaArrowRight, FaFeatherAlt, FaFileAlt, FaLaptopCode, FaPager, FaRegFolder } from "react-icons/fa";
// import { CardItem } from "../components/Card/CardItem";

export default function Empleos() {
  
  const empleos = [
    {
      id: 1,
      title: "Diseño",
      icon: <FaFeatherAlt color="white" />,
      color:
        "p-2 rounded-md bg-gradient-to-br from-indigo-400 via-yellow-900 to-pink-500",
      positions: 4,
    },
    {
      id: 2,
      title: "Desarrollo",
      icon: <FaLaptopCode color="black" />,
      color:
        "p-2 rounded-md bg-gradient-to-br from-cyan-400 via-sky-300 to-indigo-500",
      positions: 4,
    },
    {
      id: 3,
      title: "Marketing",
      icon: <FaPager color="white" />,
      color:
        "p-2 rounded-md bg-gradient-to-br from-yellow-400 via-amber-600 to-orange-500",
      positions: 4,
    },
    {
      id: 4,
      title: "Finanzas",
      icon: <FaFileAlt color="white" />,
      color:
        "p-2 rounded-md bg-gradient-to-br from-yellow-400 via-neutral-400 to-cyan-500",
      positions: 4,
    },
    {
      id: 5,
      title: "Educacion",
      icon: <FaFileAlt color="white" />,
      color:
        "p-2 rounded-md bg-gradient-to-br from-yellow-400 via-neutral-400 to-cyan-500",
      positions: 4,
    },
    {
      id: 6,
      title: "Administracion",
      icon: <FaFileAlt color="white" />,
      color:
        "p-2 rounded-md bg-gradient-to-br from-yellow-400 via-neutral-400 to-cyan-500",
      positions: 4,
    }
  ];

  const oportunidades = [
    {
      id: 1,
      title: "Ingeniero de sistemas",
      img: "/img/job.jpg",
      Pueblo: "Lajas",
      Region: "Oeste",
    },
    {
      id: 2,
      title: "Ingeniero en Informatica",
      img: "/img/job.jpg",
      Pueblo: "Lajas",
      Region: "Oeste",
    },
    {
      id: 3,
      title: "Mecanico",
      img: "/img/job.jpg",
      Pueblo: "Lajas",
      Region: "Oeste",
    }
  ]
  
  
  return (
    <>
      <div className="flex flex-wrap bg-white sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:justify-items-center place-content-center">
        {empleos.map((empleo, idx) => (
          <div key={idx} className="p-12 w-96">
            <div
              className="p-10 bg-white card"
              style={{
                borderRadius: "50px",
                background: "#ffffff",
                boxShadow:
                  "inset 20px 20px 60px #d9d9d9, inset -20px -20px 60px #ffffff",
              }}
            >
              <div className="card-body ">
                <div className="flex gap-1 justify-evenly">
                  <div className={empleo.color}>{empleo.icon}</div>
                  <h2 className="text-black card-title">{empleo.title}</h2>
                </div>
                <br />
                <a
                  href="#"
                  className="text-black bg-transparent btn hover:bg-transparent"
                >
                  {empleo.positions} Vacantes
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white place-content-center">
        <div className="flex justify-around p-10 text-black">
          <p className="text-xl font-bold">Recien Publicados:</p>
          <div className="flex justify-around gap-10 text-black">
            <h3 className="text-white btn">Ver todas</h3>
            <button className="btn">
              <FaRegFolder color="white" />
            </button>
          </div>
        </div>
        {/* <div className="divider" style={{ color: "black" }} /> */}
        {/* <div className="flex flex-wrap sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:justify-items-center place-content-center">
          {oportunidades.map((oportunidad, idx) => (
            <CardItem key={idx} Objeto={oportunidad} />
          ))}
        </div> */}
        <br />
        <br />
      </div>
    </>
  );
}
