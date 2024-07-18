import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col p-5vw">
      {/* Container styles applied directly to div */}
      <div className="text-primary opacity-80">
        {/* ErrorMessage styles applied directly */}
        <h1 className="text-6xl mb-4">404</h1>
        {/* Replaced Typography variant="h1" with h1 tag and Tailwind classes */}
      </div>
      <p className="mb-4">Oops, we can't find the page you're looking for.</p>
      <p className="mb-4">
        Return{" "}
        <Link href="/" className="text-inherit hover:text-primary">
          home
        </Link>
        .{/* Applied link styling directly to a tag within Link component */}
      </p>
    </div>
  )
}
