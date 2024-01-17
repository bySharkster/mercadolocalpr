import {CatPosts} from "../components/CatPosts/CatPosts";
import { useRouter } from "next/router";

// export async function getServerSideProps(context) {
//   const posts = await prisma.Post.findMany();

//   return {
//     props: {
//       posts,
//     },
//   };
// }


export default function Category() {
  const router = useRouter();
  const Categoria = router.query.category;
  // console.log(posts);
  const posts = [
    {
      id: 1,
      title: "Casa en venta",
      description: "Casa en venta en el centro de la ciudad",
      price: 100000,
      category: "Casa",
      area: "Centro",
      images: [
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ],
    },
    {
      id: 2,
      title: "Casa en venta",
      description: "Casa en venta en el centro de la ciudad",
      price: 100000,
      category: "Casa",
      area: "Centro",
      images: [
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ],
    },
    {
      id: 3,
      title: "Casa en venta",
      description: "Casa en venta en el centro de la ciudad",
      price: 100000,
      category: "Casa",
      area: "Centro",
      images: [
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ],
    },
    {
      id: 4,
      title: "Casa en venta",
      description: "Casa en venta en el centro de la ciudad",
      price: 100000,
      category: "Casa",
      area: "Centro",
      images: [
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ],
    },
    {
      id: 5,
      title: "Casa en venta",
      description: "Casa en venta en el centro de la ciudad",
      price: 100000,
      category: "Casa",
      area: "Centro",
      images: [
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ],
    },
    {
      id: 6,
      title: "Casa en venta",
      description: "Casa en venta en el centro de la ciudad",
      price: 100000,
      category: "Casa",
      area: "Centro",
      images: [
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ],
    },
    {
      id: 7,
      title: "Casa en venta",
      description: "Casa en venta en el centro de la ciudad",
      price: 100000,
      category: "Casa",
      area: "Centro",
      images: [
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ],
    },
    {
      id: 8,
      title: "Casa en venta",
      description: "Casa en venta en el centro de la ciudad",
      price: 100000,
      category: "Casa",
      area: "Centro",
      images: [
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      ],
    },
  ];

  return (
    <div className="min-h-screen text-black bg-white">
      <h1 className="p-10 text-4xl font-bold text-center">{Categoria}</h1>
      <div className="divider"></div>
      <div className="grid justify-center gap-10 p-10 md:justify-between md:flex bg-slate-100">
        <div className="grid gap-4 p-10 border-2 rounded-md">
          <input
            type="text"
            placeholder="Keywords"
            className="w-full max-w-xs bg-white border-2 border-black input input-bordered"
          />
          <span>Sales or Rent:</span>
          <div className="flex gap-4">
            <span className="font-bold">Sales:</span>
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">Rent:</span>
            <input type="checkbox" className="checkbox" />
          </div>
          <span>With images or not:</span>
          <div className="flex gap-4">
            <span className="font-bold">Images:</span>
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">No images:</span>
            <input type="checkbox" className="checkbox" />
          </div>
          <span className="">Categories:</span>
          <div className="flex justify-between gap-4">
            <input type="checkbox" className="checkbox" />
            <input type="checkbox" className="checkbox" />
            <input type="checkbox" className="checkbox" />
            <input type="checkbox" className="checkbox" />
            <input type="checkbox" className="checkbox" />
          </div>
          <span className="">Area:</span>
          <div className="flex gap-4">
            <span className="font-bold">East:</span>
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">West:</span>
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">North:</span>
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="flex gap-4">
            <span className="font-bold">South:</span>
            <input type="checkbox" className="checkbox" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          <CatPosts posts={posts}/>
        </div>
      </div>
    </div>
  );
}
