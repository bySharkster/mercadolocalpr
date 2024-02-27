import './styles.css';

export function SidePanel(){
  return (
      <div className="bg-white p-8 text-black">
        <h1 className="text-4xl font-bold text-center">Admin - MercadoLocalPR</h1>
        <div className="grid gap-8 pt-12 font-bold text-lg">
          <span className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Listados de usuarios</span>
          <span className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Perfiles de usuarios</span>
          <span className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Productos</span>
          <span className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Ordenes</span>
          <span className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Reportes</span>
          <span className="hover:text-md hover:bg-black hover:rounded-lg hover:p-3 transition-all hover:text-white w-[50%]">Ajustes</span>
        </div>
      </div>
  )
}
