export function HomePage() {
  return (
    <div class="container mx-auto my-20 py-24 bg-gray-200 rounded-lg text-center">
      <h3 class="text-5xl font-semibold">Muslim Friendly API</h3>
      <p class="mt-8 text-xl font-light">
        Need any information about halal and muslim friendly things in Taiwan?
        <br />
        You could use this API to provide list of data about muslim friendly
        sites.
      </p>
      <p class="mt-8">
        <a
          href="/api"
          target="_blank"
          className="py-5 px-16 text-lg bg-blue-500 hover:bg-blue-600 rounded text-white"
        >
          Swagger UI
        </a>
      </p>
    </div>
  );
}
