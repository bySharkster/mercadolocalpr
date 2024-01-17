import React from 'react'
export const CatPosts = ({posts}) => {
  const [clicked, setClicked] = React.useState(false)
  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="w-[38w] md:w-[25vw] lg:w-[15vw] h-[50vh] p-2 bg-white border rounded-md"
        >
          <img
            className="w-full h-[20vh] object-cover border rounded-md"
            src={post.productimage}
            alt={post.title}
          />
          <div className="relative left-0 text-right bottom-40">
            <button className="p-2 border-2 rounded-full" onClick={() => setClicked(!clicked)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={clicked ? 'red' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
          <div className="p-2">
            <h2>{post.title}</h2>
            {/* <h4>{post.createdat}</h4> */}
            <p>{post.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};
