"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    if (!form.name || !form.email || !form.message) {
      setLoading(false);
      return toast.error("All fields are required.");
    } else {
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
          process.env.PUBLIC_KEY,
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
          },
        );
    }
  };

  return (
    <div className="flex justify-end">
      <div className="mt-4 border-t border-white">
        <form onSubmit={handleSubmit} className="flex flex-col mt-8 w-[30vw]">
          <label className="my-4">Nombre</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ingrese su nombre"
            className="p-3 bg-white border-2 rounded-md"
          />

          <label className="my-4">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@gmail.com"
            className="p-3 bg-white border-2 rounded-md"
          />

          <label className="my-4">Your Message</label>
          <textarea
            rows={7}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Hi Gregor!"
            className="p-3 bg-white border-2 rounded-md"
          />

          <div className="my-4">
            <button
              type="submit"
              className="w-full p-2 bg-[#3A4F41] rounded-md text-white font-bold"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
