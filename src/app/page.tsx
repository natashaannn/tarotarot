import Link from "next/link";

import { CreatePost } from "@/app/_components/create-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <div className="bg-gray-100 min-h-screen">
    <nav className="bg-white shadow-lg">
      <div className="max-w-screen-lg mx-auto py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tarotarot</h1>
        <div>
          <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="text-blue-500 hover:underline"
          >
          {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>
    </nav>

    <main className="max-w-screen-lg mx-auto p-8 bg-white rounded shadow-md mt-8">
      <h1 className="text-4xl font-bold text-center mb-6">Your Gateway to Mystical Wisdom</h1>
      <p className="text-gray-600 text-center mb-8">
        Tarotarot connects you with experienced psychics for insightful readings.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link 
        href="/readings" 
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 px-4 text-center"
        >
        Get a Reading
        </Link>

        <Link 
        href="/about" 
        className="bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg py-3 px-4 text-center"
        >
        About Us
        </Link>

        <CrudShowcase />
      </div>
    </main>
  </div>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}