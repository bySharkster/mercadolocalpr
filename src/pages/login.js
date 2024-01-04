import { useState } from "react";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session, status } = useSession();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newUser, setNewUser] = useState(false);

  function handleSubmit() {
    // if (newUser) {
      axios
        .post("/api/signup", {
          name: name,
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
        });
    // } else {
    //   axios
    //     .post("/api/login", {
    //       email: email,
    //       password: password,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     });
  // }

    console.log("submitted");
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center min-h-screen pt-32 font-bold">
        Hang on there...
      </div>
    );
  }

    if (!session) {
      return (
        <div className="min-h-screen bg-[#E1EFE6] grid items-center justify-center">
          <div className="grid gap-24 p-10 my-24 bg-white rounded-lg shadow-xl md:my-0 md:flex">
            <div className="">
              {!newUser ? (
                <form action="" className="form">
                  <p>
                    Welcome,<span>sign in to continue</span>
                  </p>
                  <button className="oauthButton" onClick={() => signIn()}>
                    <svg className="icon" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      ></path>
                      <path d="M1 1h22v22H1z" fill="none"></path>
                    </svg>
                    Continue with Google
                  </button>
                  <div className="separator">
                    <div></div>
                    <span>OR</span>
                    <div></div>
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                  />
                  <button className="oauthButton">
                    Continue
                    <svg
                      className="icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 17 5-5-5-5"></path>
                      <path d="m13 17 5-5-5-5"></path>
                    </svg>
                  </button>
                </form>
              ) : (
                <form action="" className="form" onSubmit={() => handleSubmit()}>
                  <p>
                    Welcome,<span>sign up to continue</span>
                  </p>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                  />
                  <button className="oauthButton" onClick={handleSubmit}>
                    Continue
                    <svg
                      className="icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 17 5-5-5-5"></path>
                      <path d="m13 17 5-5-5-5"></path>
                    </svg>
                  </button>
                </form>
              )}
              <button className="mt-4 btn" onClick={() => setNewUser(!newUser)}>
                {!newUser
                  ? "Dont have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
            <div>
              <img src="/img/login.svg" alt="login" className="w-96 h-96" />
            </div>
          </div>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-[#E1EFE6] grid items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome, {session.user.name}</h1>
      <button className="btn" onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
