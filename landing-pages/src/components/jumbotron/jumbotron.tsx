import {
  BookOpenIcon,
  BrainIcon,
  HandshakeIcon,
  LayersIcon,
  MessageCircleIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  { title: "Problem Solving", icon: BrainIcon },
  { title: "Live chat", icon: MessageCircleIcon },
  { title: "Group Reading", icon: BookOpenIcon },
  { title: "10k Courses", icon: LayersIcon },
  { title: "Hand-on activities", icon: HandshakeIcon },
];

export function Jumbotron() {
  return (
    <section className="w-full pb-16 pt-12">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-linear-to-br from-emerald-50 via-white to-sky-50 p-6 shadow-xl sm:p-10 lg:px-12 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-600 shadow">
                  Quality Education
                </p>
                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                  Quality <span className="text-emerald-600">Education</span>
                  <br />
                  By Any Means
                  <br />
                  Necessary.
                </h1>
                <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                  Learn from best instructors around the globe with immersive
                  classes, live sessions, and hands-on activities tailored for
                  every learner.
                </p>
              </div>
              <Button className="rounded-full bg-emerald-500 px-8 py-5 text-base font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-500/90 cursor-pointer">
                Get Started
              </Button>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                <div className="aspect-4/5 overflow-hidden rounded-[40px] border border-white/50 bg-linear-to-br from-white via-emerald-50 to-sky-50 shadow-2xl">
                  <img
                    src="/images/jumbotron.jpg"
                    alt="Student ready to learn"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute -left-6 top-10 hidden w-40 rounded-2xl bg-white p-4 text-sm font-semibold text-gray-900 shadow-lg shadow-emerald-200 sm:block">
                  Learn from best{" "}
                  <span className="text-emerald-600">instructors</span> around
                  the globe
                  <div className="mt-4 flex -space-x-2">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white bg-emerald-100 text-sm font-semibold text-emerald-700">
                        {index + 1}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute -right-8 bottom-10 hidden w-36 rounded-2xl bg-white p-4 text-center text-sm shadow-lg shadow-sky-200 sm:block">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                    15k
                  </div>
                  <p className="mt-3 text-xs font-medium text-muted-foreground">
                    Amazing students around the globe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {features.map(({ title, icon: Icon }) => (
            <div
              key={title}
              className="group flex items-center gap-3 rounded-2xl border border-transparent bg-linear-to-br from-emerald-50 to-white p-4 text-sm font-semibold text-emerald-700 shadow-sm  hover:shadow-md">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow ">
                <Icon className="h-5 w-5" />
              </span>
              <span>{title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
