// app/not-found.tsx

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-lg text-gray-600">Page not found.</p>
      <Link href={"/"} className="text-blue-600 hover:text-blue-800">
        Go back home
      </Link>
    </div>
  );
}
