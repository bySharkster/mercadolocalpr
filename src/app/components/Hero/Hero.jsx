export const Hero = () => {

    return (
      <div className="min-h-[80vh] bg-[#E1DEE3]">
        <div className="flex justify-between gap-10 p-10">
          <div className="w-[50vw] h-[25vh] bg-white p-3 rounded-lg shadow-xl border-2 border-gray-300"></div>
          <div className="w-[50vw] h-[25vh] bg-white p-3 rounded-lg shadow-xl border-2 border-gray-300"></div>
        </div>
        <div className="flex overflow-x-auto lg:grid gap-10 p-10 md:justify-between">
          <div className="w-[50vw] lg:w-[25vw] h-[25vh] bg-white p-3 rounded-lg shadow-xl border-2 border-gray-300"></div>
          <div className="w-[50vw] lg:w-[25vw] h-[25vh] bg-white p-3 rounded-lg shadow-xl border-2 border-gray-300"></div>
          <div className="w-[50vw] lg:w-[25vw] h-[25vh] bg-white p-3 rounded-lg shadow-xl border-2 border-gray-300"></div>
          <div className="w-[50vw] lg:w-[25vw] h-[25vh] bg-white p-3 rounded-lg shadow-xl border-2 border-gray-300"></div>
        </div>
      </div>
    );
}