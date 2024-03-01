import { Card } from "@repo/ui/card";
import { LineChart } from "./components/Charts/line-chart";
export default function Page(): JSX.Element {

  return (
    <main className="min-h-screen">
      <div className="flex justify-around py-12">
        <div className="w-[25%] h-[30vh] bg-[#3A5A40] border-2 border-[#588157] rounded-xl">
         {/* <Doughnut data={...} /> */}
        </div>
        <div className="w-[25%] h-[30vh] bg-[#3A5A40] border-2 border-[#588157] rounded-xl">
          {/* <LineChart/> */}
        </div>
        <div className="w-[25%] h-[30vh] bg-[#3A5A40] border-2 border-[#588157] rounded-xl">
1
        </div>
      </div>
      <div className="flex justify-around gap-10 mx-14">
        <div className="w-[50%] h-[25vh] bg-[#3A5A40] border-2 border-[#588157] rounded-xl">1</div>
        <div className="w-[50%] h-[25vh] bg-[#3A5A40] border-2 border-[#588157] rounded-xl">1</div>
      </div>
    </main>
  );
}
