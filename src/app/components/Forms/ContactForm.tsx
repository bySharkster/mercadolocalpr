"use client"

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
export const ContactForm = () => {
//   const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { target } = e;
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        process.env.SERVICE_ID!,
        process.env.TEMPLATE_ID!,
        {
          from_name: form.name,
          to_name: "Gregor Rodriguez",
          from_email: form.email,
          to_email: "gregorrodriguez@protonmail.com",
          message: form.message,
        },
        process.env.PUBLIC_KEY!
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Message sent successfully!");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          toast.error("Something went wrong. Please try again later.");
        }
      );
  };

  return (
    <div className="flex justify-end">
        <div className="mt-4 border-t border-white">
            <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-8 w-[30vw]"
            >
            <label className="mt-4">Your Name</label>
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Dope"
                className="border-2 border-gray-300 p-2"
            />

            <label className="mt-4">Your email</label>
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@gmail.com"
                className="border-2 border-gray-300 p-2"
            />

            <label className="mt-4">Your Message</label>
            <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Hi Gregor!"
                className="border-2 border-gray-300 p-2"
            />

            <div className="my-4">
                <button
                type="submit"
                className="w-full bg-gray-300 p-2"
                >
                {loading ? "Sending..." : "Send"}
                </button>
            </div>
            </form>
        </div>
    </div>
  );
};