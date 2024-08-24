

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HCLXFNEeJaP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <GraduationCapIcon className="h-6 w-6" />
          <span className="sr-only">Alumni Association</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Events
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Alumni
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Get Involved
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
        </nav>
      </header> */}
      <main className="flex-1">
        <section className="w-full py-12 bg-black text-white md:py-24 lg:py-32 bg-primary">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-6">
            <div className="space-y-2 text-center ">
              <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl">
                Welcome to the Alumni Portal
              </h1>
              <p className="max-w-[700px] text-primary-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Connect with fellow alumni, stay up-to-date on campus news, and get involved in our community.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary bg-white text-black shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Join Now
            </Link>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Upcoming Events</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out our upcoming alumni events and activities.
                </p>
              </div>
            </div>
            {/* <div className="mx-auto grid max-w-3xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Event Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Alumni Reunion</h3>
                  <p className="text-muted-foreground">Join us for our annual alumni reunion on June 15th.</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDaysIcon className="h-4 w-4" />
                    <span>June 15, 2024</span>
                  </div>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Career Networking Event</h3>
                  <p className="text-muted-foreground">
                    Connect with fellow alumni and explore new career opportunities.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDaysIcon className="h-4 w-4" />
                    <span>July 20, 2024</span>
                  </div>
                </div>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  View All Events
                </Link>
              </div>
            </div> */}
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-gray-200 lg:py-32 bg-muted">
          <div className="container  px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Alumni</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Learn more about the accomplishments and stories of our distinguished alumni.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <img
                  src="/image/profileLogo.png"
                  width="120"
                  height="120"
                  alt="Alumni Profile"
                  className="rounded-full"
                  style={{ aspectRatio: "120/120", objectFit: "cover" }}
                />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Jane Doe</h3>
                  <p className="text-muted-foreground">Class of 2010</p>
                  <p className="text-sm text-muted-foreground">CEO, Acme Inc.</p>
                </div>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow bg-black text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  View Profile
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <img
                  src="/image/profileLogo.png "
                  width="120"
                  height="120"
                  alt="Alumni Profile"
                  className="rounded-full"
                  style={{ aspectRatio: "120/120", objectFit: "cover" }}
                />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">John Smith</h3>
                  <p className="text-muted-foreground">Class of 2015</p>
                  <p className="text-sm text-muted-foreground">Software Engineer, Vercel</p>
                </div>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1   bg-black text-white focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  View Profile
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <img
                  src="/image/profileLogo.png"
                  width="120"
                  height="120"
                  alt="Alumni Profile"
                  className="rounded-full"
                  style={{ aspectRatio: "120/120", objectFit: "cover" }}
                />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Sarah Lee</h3>
                  <p className="text-muted-foreground">Class of 2018</p>
                  <p className="text-sm text-muted-foreground">Nonprofit Director, Acme Foundation</p>
                </div>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary bg-black text-white px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get Involved</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  There are many ways to get involved with the Alumni Association and support our community.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <VoteIcon className="h-12 w-12 text-primary" />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Volunteer</h3>
                  <p className="text-muted-foreground">
                    Help organize events, mentor students, or serve on a committee.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 bg-black text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <GiftIcon className="h-12 w-12 text-primary" />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Donate</h3>
                  <p className="text-muted-foreground">
                    Support scholarships, programs, and initiatives that benefit our alumni community.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm bg-black text-white font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <BadgeIcon className="h-12 w-12 text-primary" />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Mentor</h3>
                  <p className="text-muted-foreground">
                    Share your expertise and experience with current students and recent graduates.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm bg-black text-white  font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Become a Mentor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Alumni Association. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer> */}
    </div>
  )
}

function BadgeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    </svg>
  )
}


function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}


function GiftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  )
}


function GraduationCapIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  )
}


function VoteIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 12 2 2 4-4" />
      <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
      <path d="M22 19H2" />
    </svg>
  )
}