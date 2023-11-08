import { useState } from "react";

export default function UserSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically update the user's settings in your database
    console.log(`Saving changes for user: ${name}, ${email}`);
  };

  return (
    <div className="min-h-screen bg-[#E1EFE6] flex items-center justify-center">
      <div className="grid gap-24 p-10 my-24 bg-white rounded-lg shadow-xl md:my-0 md:flex">
        <form onSubmit={handleSubmit} className="form">
          <p>User Settings</p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="oauthButton">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
