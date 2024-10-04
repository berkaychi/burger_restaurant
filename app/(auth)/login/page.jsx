"use client";

import React, { useState } from "react";
import { UseRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [info, setInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function handleInput(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!info.email || !info.password) {
      setError("Must provide all the credentials.");
    }

    console.log(info);

    try {
      setPending(true);
      const res = await signIn("credentials", {
        username: info.username,
        password: info.password,
        redirect: false,
      });
      if (res.error) {
        setError("Invalid Credentials.");
        setPending(false);
        return;
      }
      router.replace("/");
    } catch (error) {
      setPending(false);
      setError("Something went wrong.");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <label className="relative block cursor-text">
            <input
              type="text"
              className="h-14 w-full border border-primary outline-none px-4 peer rounded-xl"
              require
            />
            <span className="absolute top-0 left-0 px-4 text-sm flex h-full peer-focus:placeholder:hidden"></span>
          </label>
        </div>
      </form>
    </div>
  );
};
