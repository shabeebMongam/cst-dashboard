"use client"
import { SignedOut } from "@clerk/nextjs";
import Header from "./_components/Header";
import React from "react";
import { useWidgets } from "@/context/WidgetContext";


export default function Home() {
  const { widgets, loading, error } = useWidgets();

  return (
    <div className="w-screen h-[100dvh] ">
      <div className="fixed w-full">
        <Header />
      </div>
      <SignedOut>
        <div className="flex items-center justify-center h-screen">
          <h1>Welcome to dashboard</h1>
        </div>
      </SignedOut>
      <section className="mx-5 ">
        <div className="h-[60px]"></div>
        <div className="border w-full rounded-md p-3">
          {loading ? (
            <div className="animate-pulse h-32 bg-gray-100 rounded-md" />
          ) : error ? (
            <div className="text-red-500 text-center">
              </div>
          ) : widgets.length > 0 ? (
            widgets.map((widget) => (
              <div key={widget.id} className="mb-4">
                <widget.component />
              </div>
            ))
          ) : (
            <div className="flex justify-center">
              <h1>No widgets</h1>
            </div>
          )}
        </div>
      </section>
    </div>
  )



}
