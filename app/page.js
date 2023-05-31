"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  async function sendQuery() {
    setResult("");
    setQuery("");
    setLoading(true);
    if (!query) return;
    try {
      const result = await fetch("/api/read", {
        method: "POST",
        body: JSON.stringify(query),
      });

      const json = await result.json();
      console.log(json);
      setResult(json);
      setLoading(false);
    } catch (err) {
      console.log("err:", err);
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-between p-24 bg-green-400">
      <input
        className="text-black px-8 py-3 w-64 h-12"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="px-7 py-1 rounded-2xl bg-white text-black mt-2 mb-2"
        onClick={sendQuery}
      >
        Ask Superbot
      </button>
      <div className="rounded-lg bg-white p-4 max-w-xs">
        {loading && (
          <p className="rounded-lg bg-green-100 p-2">Superbot responding ...</p>
        )}
        {result && <p className="rounded-lg bg-white p-2">{result}</p>}
      </div>
    </main>
  );
}
