import Image from "next/image";

export default function About() {

    return (
      <div className="w-screen bg-white">
        <h1 className="py-10 text-2xl text-center" id="nosotros">Sobre Nosotros:</h1>
        <div className="divider" style={{ color: "black" }} />
        <div className="py-10 mx-10">
          MercadolocalPR es una plataforma de compra y venta en línea enfocada
          en Puerto Rico. Puede ser mejor que OfferUp o Clasificados Online PR
          debido a su enfoque en solo productos y servicios locales, lo que
          aumenta las posibilidades de encontrar artículos únicos y específicos
          de la región. También puede tener una interfaz más intuitiva y fácil
          de usar, así como una mayor seguridad en las transacciones debido a su
          enfoque en la comunidad local. Además, puede tener un sistema de
          calificaciones de vendedores y compradores para ayudar a los usuarios
          a tomar decisiones informadas sobre quienes comprar y vender. En
          resumen MercadolocalPR es una plataforma que se enfoca en la comunidad
          local, seguridad y facilidad de uso, lo que la hace una opción
          atractiva para aquellos que buscan comprar o vender productos o
          servicios en Puerto Rico.
        </div>

        <div className="divider" style={{ color: "black" }} />

        <div>
          <h1 className="py-10 text-2xl text-center" id="contacto">Contactece:</h1>
          <div className="py-10 mx-10">
            <div className="flex flex-col">
              <div className="flex justify-around">
                <div>
                  <h1>Greg</h1>
                  <p>Full Stack Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider" style={{ color: "black" }} />
        
        <div className="flex justify-center">
          {/* <Image
            src="/img/hero.jpg"
            alt="Picture of the author"
            width={500}
            height={500}
          /> */}
        </div>
      </div>
    );
}
