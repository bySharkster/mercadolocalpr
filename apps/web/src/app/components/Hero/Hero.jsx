import { GoogleAdsComp } from "../Ads/GoogleAdsComp";

export const Hero = () => {

    return (
      <div className="min-h-[80vh] bg-[#E1DEE3]">
        <div className="grid lg:flex justify-center lg:justify-between gap-10 p-10">
          <div className="w-[100%] lg:w-[50vw] h-[45vh] bg-white p-3 rounded-lg shadow-xl border-2 border-gray-300">
            <div className="carousel w-full h-[100%]">
              <div id="slide1" className="carousel-item relative w-full">
                <img
                  src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
                  className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide4" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide2" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide2" className="carousel-item relative w-full">
                <img
                  src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
                  className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide1" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide3" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide3" className="carousel-item relative w-full">
                <img
                  src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
                  className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide2" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide4" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide4" className="carousel-item relative w-full">
                <img
                  src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
                  className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide3" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide1" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] lg:w-[50vw] h-[45vh] bg-white p-3 rounded-lg shadow-xl border-2 border-gray-300">
            <div className="carousel w-full h-[100%]">
              <div id="slide1" className="carousel-item relative w-full">
                <img
                  src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10 p-10 overflow-x-auto md:justify-between">
          <div className="w-[50vw] lg:w-[25vw] h-[25vh] bg-white p-3 rounded-lg shadow-xl border-2 border-gray-300"></div>
          <div className="w-[50vw] lg:w-[25vw] h-[25vh] bg-white p-3 rounded-lg shadow-xl border-2 border-gray-300"></div>
          <div className="w-[50vw] lg:w-[25vw] h-[25vh] bg-white p-3 rounded-lg shadow-xl border-2 border-gray-300"></div>
          <div className="w-[50vw] lg:w-[25vw] h-[25vh] bg-white p-3 rounded-lg shadow-xl border-2 border-gray-300"></div>
        </div>
      </div>
    );
}