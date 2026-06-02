import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-slate-600">TaskMaster</span>
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Your personal task management solution. Stay organized, track your
              progress, and achieve your goals with ease.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/register"
                className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="bg-white hover:bg-slate-50 text-slate-700 px-8 py-3 rounded-lg font-semibold border-2 border-slate-300 transition"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-slate-600 text-3xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Organize Tasks
              </h3>
              <p className="text-gray-500">
                Create, categorize, and organize your tasks by priority and due
                dates.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-slate-600 text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Track Progress
              </h3>
              <p className="text-gray-500">
                Monitor your task completion with intuitive status tracking and
                statistics.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-slate-600 text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Stay Secure
              </h3>
              <p className="text-gray-500">
                Your data is safe with secure authentication and encrypted
                storage.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Start Your Productivity Journey Today
          </h2>
          <Link
            href="/register"
            className="inline-block bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Create Your Account
          </Link>
        </section>
      </main>
    </div>
  );
}
