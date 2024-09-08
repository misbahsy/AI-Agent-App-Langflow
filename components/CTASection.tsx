import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 text-center">
      <h2 className="text-4xl font-bold mb-8">Ready to Get Started?</h2>
      <p className="text-xl mb-12">Join our platform today and experience the power of AI-driven development!</p>
      <div className="flex justify-center space-x-4">
        <Link href="/sign-up" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg">
          Sign Up Now
        </Link>
        <Link href="/sign-in" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-lg">
          Sign In
        </Link>
      </div>
    </section>
  )
}