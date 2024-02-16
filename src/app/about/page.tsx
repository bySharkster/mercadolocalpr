import Image from "next/image";
import { ContactForm } from "../components/Forms/ContactForm";
import { Gearbox } from "../components/AnimatedComponents/Gearbox";

export default function About() {

    return (
      <div className="w-screen bg-white">
        <div className="p-10">
          <h1 className="py-10 text-4xl font-bold" id="nosotros">Sobre Nosotros:</h1>
          <div className="w-[50%]">
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
        </div>

        <div className="flex items-center justify-between p-10 text-right">
          <div>
            <Gearbox />
          </div>
          <div className="p-10 border-2 rounded-xl">
            <h1 className="text-4xl font-bold" id="contacto">Comuniquece:</h1>
            <ContactForm />
          </div>
        </div>
        
        <div className="flex justify-center">
          <Image
            src="/img/hero.jpg"
            alt="Picture of the author"
            width={500}
            height={500}
          />
        </div>
      </div>
    );
}
