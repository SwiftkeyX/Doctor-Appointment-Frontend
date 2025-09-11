"use client";
import { LoginForm } from "@/components/authen/LoginForm";
import { RegisterForm } from "@/components/authen/RegisterForm";
import React, { act, useState } from "react";

const Authentication = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

    const handleSubmit = (data: any) => {
    console.log(`${activeTab} form submitted:`, data);

    if (activeTab === "login") {
        // fetch("/api/auth/login", { method: "POST", body: JSON.stringify(data) })
    } else {
        // fetch("/api/auth/register", { method: "POST", body: JSON.stringify(data) })
    }
    };

  return (
    <main className="flex p-8 justify-center">
      <div className="flex flex-col w-full items-center gap-4 py-10">
        <div className="w-1/3 p-8 bg-[#E5E5E5] rounded-md shadow-md space-y-6">
          {/* Toggle Tabs */}
          <div className="flex justify-center text-2xl font-semibold text-center rounded-md overflow-hidden">
            <button
              className={`w-1/2 p-2 ${
                activeTab === "login"
                  ? "bg-white text-blue-600"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`w-1/2 p-2 ${
                activeTab === "register"
                  ? "bg-white text-blue-600"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <div>
            <div className="text-2xl font-semibold">
              {activeTab === "login" ? "Sign In" : "Register"}
            </div>

            {activeTab === "login" ? (
                <LoginForm onSubmit={(data) => handleSubmit(data)} />
            ) : (
                <RegisterForm onSubmit={(data) => handleSubmit(data)} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Authentication;
