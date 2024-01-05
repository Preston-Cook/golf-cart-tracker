"use client";

import { toast, ToastContainer } from "react-toastify";
import { FormEvent } from "react";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { Monoton } from "next/font/google";

const monoton = Monoton({ weight: "400", subsets: ["latin"] });

function showSuccessMessage() {
  toast.success("Message Sent!", {
    position: toast.POSITION.TOP_CENTER,
    progress: undefined,
    theme: "colored",
    autoClose: 2000,
  });
}

function showErrorMessage() {
  toast.error("Something Went Wrong :(", {
    position: toast.POSITION.TOP_CENTER,
    progress: undefined,
    theme: "colored",
    autoClose: 2000,
  });
}

export default function Contact() {
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // Prevent form submission
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    // Post data to server
    const res = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (res.status === 201) {
      showSuccessMessage();
    } else {
      showErrorMessage();
    }

    setIsLoading(false);
  }

  return (
    <div className="mt-auto">
      <section className="bg-[#d38e31] border-2 border-white w-[92%] md:w-[80%] mx-auto my-5 rounded-xl">
        <ToastContainer
          toastStyle={{
            backgroundColor: "#77C7AE",
          }}
        />
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2
            className={`mb-2 font-bold  text-[#5A3E2B] text-center text-2xl bg-[#77C7AE] rounded-full py-2 ${monoton.className}`}
          >
            Contact&nbsp; Me
          </h2>
          <p className="text-[#5A3E2B] text-center mb-4">
            Got a bug? I want to know about it!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <div className="w-full my-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-[#5A3E2B]"
                >
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-[#FEE9B8] border-[#5A3E2B] text-[#5A3E2B] placeholder:text-[#5A3E2B] text-sm rounded-full block w-full p-2.5 border-transparent focus:border-transparent focus:ring-0"
                  placeholder="Email"
                  required={true}
                />
              </div>
            </div>
            <div className="my-4">
              <div className="w-full my-4">
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-[#5A3E2B]"
                >
                  Subject
                </label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  type="text"
                  name="subject"
                  id="subject"
                  className="bg-[#FEE9B8] border-[#5A3E2B] text-[#5A3E2B] placeholder:text-[#5A3E2B] text-sm rounded-full block w-full p-2.5 border-transparent focus:border-transparent focus:ring-0"
                  placeholder="Subject"
                  required={true}
                />
              </div>
            </div>
            <div className="my-4">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-[#5A3E2B]"
              >
                Message
              </label>
              <textarea
                className="placeholder:text-[#5A3E2B] h-[100%] w-[100%] box-border rounded-2xl outline-none border-transparent bg-[#FEE9B8] text-[#5A3E2B] text-sm focus:border-transparent focus:ring-0"
                name="message"
                id="message"
                placeholder="Message here..."
                rows={5}
              ></textarea>
            </div>
            <div className="flex mt-6">
              <button
                type="submit"
                className="text-[#5A3E2B] bg-[#77C7AE] rounded-full w-[60%] px-7 py-2 text-lg mx-auto"
              >
                <div
                  className={`mx-auto w-fit font-semibold ${monoton.className}`}
                >
                  {isLoading ? <Spinner /> : "Submit"}
                </div>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
