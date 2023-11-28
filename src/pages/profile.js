export default function Profile() {
    return (
      <div className="bg-[#E1EFE6]">
        <div className="p-10">
          <div className="relative w-32 h-32 bg-black border-2 border-black rounded-full top-16 left-32"></div>
          <div className="flex justify-between gap-10">
            <div className="flex flex-col">
              <div className="text-2xl font-bold">Nombre</div>
              <div className="text-sm">@usuario</div>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm">Publicaciones</div>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm">Seguidores</div>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm">Siguiendo</div>
            </div>
          </div>
        </div>
      </div>
    );
}