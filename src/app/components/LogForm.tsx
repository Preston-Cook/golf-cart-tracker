"use client";

import { useState } from "react";
import { FormEvent } from "react";
import Spinner from "./Spinner";
import { toast, ToastContainer } from "react-toastify";
import { Monoton } from "next/font/google";
import Link from "next/link";

const monoton = Monoton({ weight: "400", subsets: ["latin"] });

function showSuccessMessage() {
  toast.success("Golf Cart Booked!", {
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

export default function LogForm() {
  const [first, setFirst] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [golfCart, setGolfCart] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);

    // Prevent form submission
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.currentTarget);

    const firstName = formData.get("first");
    const lastName = formData.get("last");
    const phone = formData.get("phone");
    const golfCart = formData.get("golfCart");

    // Pull fields from form data
    const res = await fetch("/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phone,
        golfCart,
      }),
    });

    if (res.status == 201) {
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
            Book Golf Cart
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 grid-cols-2">
              <div className="w-full">
                <label
                  htmlFor="first"
                  className="block mb-2 text-sm font-medium text-[#5A3E2B]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="first"
                  id="first"
                  className="bg-[#FEE9B8] border-[#5A3E2B] text-[#5A3E2B] placeholder:text-[#5A3E2B] text-sm rounded-full block w-full p-2.5 border-transparent focus:border-transparent focus:ring-0"
                  placeholder="First Name"
                  onChange={(e) => setFirst(e.target.value)}
                  value={first}
                  required={true}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="last"
                  className="block mb-2 text-sm font-medium text-[#5A3E2B]"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="last"
                  id="last"
                  className="bg-[#FEE9B8] border-[#5A3E2B] text-[#5A3E2B] placeholder:text-[#5A3E2B] text-sm rounded-full block w-full p-2.5 border-transparent focus:border-transparent focus:ring-0 "
                  placeholder="Last Name"
                  onChange={(e) => setLast(e.target.value)}
                  value={last}
                  required={true}
                />
              </div>
            </div>
            <div className="w-full my-4">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-[#5A3E2B]"
              >
                Phone Number
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                name="phone"
                id="phone"
                className="bg-[#FEE9B8] border-[#5A3E2B] text-[#5A3E2B] placeholder:text-[#5A3E2B] text-sm rounded-full block w-full p-2.5 border-transparent focus:border-transparent focus:ring-0"
                placeholder="Phone Number"
                required={true}
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-[#5A3E2B]"
              >
                Golf Cart
              </label>
              <select
                required={true}
                name="golfCart"
                value={golfCart}
                onChange={(e) => setGolfCart(e.target.value)}
                id="golf-cart"
                className="bg-[#FEE9B8] border-[#5A3E2B] text-[#5A3E2B] text-sm rounded-full block w-full p-2.5 border-transparent focus:border-transparent focus:ring-0"
              >
                <option value={""}>Select Golf Cart </option>
                <option value="1">Golf Cart 1</option>
                <option value="2">Golf Cart 2</option>
              </select>
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
