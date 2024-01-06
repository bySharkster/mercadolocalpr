 
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { Spinner } from "./Spinner"
import { ReactSortable } from "react-sortablejs"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductForm ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategoires] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategoires(result.data);
    });
  }

  async function saveProduct(ev) {
    ev.preventDefault();
    if (!title || !description || !price || !images || !category) {
      toast.error("Please fill all fields");
      return;
    }
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties
    };

  try {
    
    if(data.category == null) {
      data.category = "0";
      return (
        <div className="flex items-center h-24">
          <Spinner />
        </div>
      )
    }

    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  } catch (error) {
    toast.error("An error occurred while saving the product");
  }
}

  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setImages(oldImages => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function setProductProp(propName, value) {
    setProductProperties(oldProps => {
      const newProductProps = { ...oldProps };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    if (catInfo) {
      propertiesToFill.push(...catInfo.properties);
      while (catInfo?.parent?.id) {
        const parentCat = categories.find(
          ({ _id }) => _id === catInfo?.parent?.id
        );
        if (parentCat) {
          propertiesToFill.push(...parentCat.properties);
          catInfo = parentCat;
        } else {
          break;
        }
      }
    }
  }

  return (
    <>
      <form onSubmit={saveProduct}>
        <label>Product name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label>Category</label>
        <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
          <option value="0">Uncategorized</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p) => (
            <div key={p.name} className="">
              <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
              <div>
                <select
                  value={productProperties[p.name]}
                  onChange={(ev) => setProductProp(p.name, ev.target.value)}
                >
                  {p.values.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        <label>Photos</label>
        {!!images?.length && (
          <div className="h-8 text-lg">
            <div className="text-gray-500">Drag to reorder</div>
          </div>
        )}
        <div className="flex flex-wrap gap-1 mb-2">
          <ReactSortable
            list={images}
            className="flex flex-wrap gap-1"
            setList={updateImagesOrder}
          >
            {!!images?.length &&
              images.map((link) => (
                <div
                  key={link}
                  className="h-24 p-4 bg-white border border-gray-200 rounded-md shadow-sm"
                >
                  <img src={link} alt="" className="rounded-lg" />
                </div>
              ))}
          </ReactSortable>

          {isUploading && (
            <div className="flex items-center h-24">
              <Spinner />
            </div>
          )}
          <label className="flex items-center justify-center w-24 h-24 gap-1 text-sm text-center bg-white border rounded-lg shadow-md text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
              />
            </svg>
            <div>Upload</div>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
        </div>
        <label>Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>
        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button className="btn-primary" type="submit">
          Save
        </button>
      </form>
      <ToastContainer />
    </>
  );
};
