import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to My Expense Tracker
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Track your expenses and manage your finances with ease.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Track Expenses
              </h2>
              <p className="text-gray-600">
                Easily log and categorize your daily expenses.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                View Reports
              </h2>
              <p className="text-gray-600">
                Get insights into your spending patterns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Set Budgets
              </h2>
              <p className="text-gray-600">
                Create and manage budgets for different categories.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
