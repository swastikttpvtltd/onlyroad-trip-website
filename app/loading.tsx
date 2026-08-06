export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Loading...
        </p>
      </div>
    </div>
  );
}