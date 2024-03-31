import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="z-10 max-w-5xl w-full text-center font-mono text-sm">
        <h1 className="mb-8 text-2xl font-bold">How to Use the API</h1>

        <p className="mb-4 text-lg">
          {` Below is an example query to retrieve a user by address. This query
          requires the address as a parameter and returns the user's ID (fid),
          username, profile picture URL (pfp_url), and associated addresses
          including protocol and address details.`}
         
        </p>

        <div className="w-full overflow-x-auto bg-gray-800 rounded-lg">
          <pre className="p-4 text-left text-sm text-gray-200">
            {`query GetUsersByAddresses($address: String!) {
              getUserByAddress(address: $address) {
                fid
                username
                pfp_url
              }
            }`}
          </pre>
        </div>

        <p className="mt-4 text-lg">{`
          Copy and paste the query into your GraphQL client to execute it, and
          you'll receive a response in JSON format with the user's details.`}
        </p>
      </div>
      <footer className="p-20 text-green-100 text-center">
        <div className="flex justify-center items-center space-x-4">
          <Link legacyBehavior href="https://github.com/developerfred/far-users">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </Link>

          <Link legacyBehavior href="https://twitter.com/codingsh">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Twitter
            </a>
          </Link>

          <Link legacyBehavior href="https://warpcast.com/codingsh">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              WarpCast
            </a>
          </Link>
        </div>
        <p className="text-xs mt-2">
          © {new Date().getFullYear()} Developed by codingsh.eth
        </p>
      </footer>
    </main>
  );
}
