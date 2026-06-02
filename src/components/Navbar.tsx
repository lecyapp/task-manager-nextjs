"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1">
            <Link href="/" className="text-2xl font-bold">
              TaskMaster
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {status === "loading" ? (
              <div className="text-sm">Loading...</div>
            ) : session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hover:text-indigo-200 transition"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-sm">{session.user.name}</span>
                  <button
                    onClick={handleSignOut}
                    className="bg-indigo-700 hover:bg-indigo-800 px-3 py-1 rounded transition"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hover:text-indigo-200 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-700 hover:bg-indigo-800 px-3 py-1 rounded transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
