/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";

type CampaignInput = {
  goal: string;
  audience: string;
  focus: string;
  tone: string;
  keyOffer: string;
  startDate: string;
  durationWeeks: number;
  platforms: string[];
};

type PlatformPlan = {
  platform: string;
  cadence: string;
  positioning: string;
  callToAction: string;
  contentIdeas: string[];
};

type Automation = {
  title: string;
  description: string;
  active: boolean;
};

type ReportingMetric = {
  metric: string;
  baseline: string;
  target: string;
  note: string;
};

type ActionItem = {
  label: string;
  owner: string;
  due: string;
  status: "queued" | "in-progress" | "done";
};

type CampaignPlan = {
  strategySummary: string;
  voicePrinciples: string[];
  contentPillars: string[];
  narrativeHooks: string[];
  platformPlans: PlatformPlan[];
  automations: Automation[];
  reporting: ReportingMetric[];
  actions: ActionItem[];
};

type CalendarEvent = {
  date: string;
  platform: string;
  angle: string;
  format: string;
  status: "draft" | "review" | "scheduled";
};

const platformConfigurations: Record<
  string,
  {
    cadence: string;
    positioning: string;
    callToAction: string;
    formats: string[];
    focusAngles: string[];
  }
> = {
  Instagram: {
    cadence: "4 reels • 3 stories • 2 carousels / week",
    positioning: "Transform preventive care into a lifestyle ritual for young professionals.",
    callToAction: "Swipe up to pre-book your Bharat Life Care prevention pack.",
    formats: ["Reel", "Story", "Carousel"],
    focusAngles: [
      "Monday morning micro-habit series sponsored by Bharat Life Care doctors.",
      "Behind the scenes of diagnostic labs emphasising hygiene & speed.",
      "Wellness transformations from Bharat Life Care subscribers.",
    ],
  },
  LinkedIn: {
    cadence: "3 long-form posts • 1 leadership video / week",
    positioning: "Position Bharat Life Care as India’s most trusted preventive health partner for enterprises.",
    callToAction: "Book an executive wellness audit with Bharat Life Care consultants.",
    formats: ["Thought leadership post", "Video", "Slide deck"],
    focusAngles: [
      "Data-backed breakdown of rising lifestyle disorders in Indian metro cities.",
      "Founder POV on building accessible preventive care in Bharat.",
      "Case study showcasing corporate partnership outcomes.",
    ],
  },
  Facebook: {
    cadence: "3 community posts • 2 live Q&As / week",
    positioning: "Build family-first trust through patient testimonials & service walk-throughs.",
    callToAction: "Send us a WhatsApp message to schedule your family screening.",
    formats: ["Community post", "Live Q&A", "Testimonial"],
    focusAngles: [
      "Weekend wellness workshop invites featuring Bharat Life Care doctors.",
      "Family health journey diaries that highlight preventive wins.",
      "Clinic virtual tour establishing credibility for first-time visitors.",
    ],
  },
  YouTube: {
    cadence: "1 flagship video • 2 shorts / week",
    positioning: "Own preventive health education with Bharat Life Care specialists.",
    callToAction: "Click the description link to access the Bharat Life Care health planner.",
    formats: ["Explainer video", "Short", "Clinic walkthrough"],
    focusAngles: [
      "Doctor explainers on preventive tests relevant to the target audience.",
      "Fast-paced myth-busting shorts co-created with Bharat life coaches.",
      "Behind-the-scenes footage from virtual consultations.",
    ],
  },
  WhatsApp: {
    cadence: "3 conversational nudges / week",
    positioning: "High-touch concierge follow-ups reinforcing trust & urgency.",
    callToAction: "Reply YES to secure your preferred health check slot.",
    formats: ["Broadcast message", "Personal follow-up", "Interactive checklist"],
    focusAngles: [
      "Morning routine reminder linked to Bharat Life Care’s preventive package.",
      "Doctor availability updates and quick-response promise.",
      "Mini health challenges that loop back into consultation bookings.",
    ],
  },
  Twitter: {
    cadence: "5 insights threads • 3 quick tips / week",
    positioning: "Act as the most responsive voice in preventive care conversations.",
    callToAction: "DM us for a micro-consultation with Bharat Life Care experts.",
    formats: ["Thread", "Tip", "Community reply"],
    focusAngles: [
      "Real-time commentary on national health news with actionable advice.",
      "Daily preventive micro-task prompts that tie back to Bharat Life Care services.",
      "Rapid-fire myth busting with doctor co-signatures.",
    ],
  },
};

const platformOptions = Object.keys(platformConfigurations);

const weekdayLabels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const defaultInput: CampaignInput = {
  goal: "Increase qualified leads for Bharat Life Care’s preventive health memberships.",
  audience: "Working professionals in Tier-1 Indian cities (ages 28-45).",
  focus: "Preventive diagnostics, at-home sample collection, and telemedicine advisory.",
  tone: "Empathetic, authoritative, and culturally rooted in Bharat values.",
  keyOffer: "Annual Health Guardian Plan with quarterly doctor consults.",
  startDate: new Date().toISOString().split("T")[0],
  durationWeeks: 6,
  platforms: ["Instagram", "LinkedIn", "Facebook", "YouTube", "WhatsApp"],
};

function generatePlan(input: CampaignInput): CampaignPlan {
  const voicePrinciples = [
    "Lead every message with preventive empowerment over fear.",
    `Celebrate Bharat Life Care clinicians as guardians for ${input.audience.toLowerCase()}.`,
    "Keep CTA copy crisp with direct next-step prompts.",
  ];

  const basePillars = [
    `Lifestyle design for ${input.audience.toLowerCase()}`,
    "Doctor-backed myth busting for preventive care hesitations",
    "Impact narratives from Bharat Life Care subscribers",
    "Operational excellence of Bharat Life Care labs & telemedicine",
    `Micro-rituals that prime audiences for ${input.keyOffer.toLowerCase()}`,
  ];

  const uniquePillars = Array.from(new Set(basePillars));

  const narrativeHooks = [
    `“Healthy tomorrow starts with 30 minutes today” series anchored by Bharat Life Care experts.`,
    `“Decoding preventive health reports” interactive breakdown leveraging Bharat Life Care diagnostics.`,
    `“From alert to action” case files showing Bharat Life Care’s rapid concierge response.`,
  ];

  const platformPlans: PlatformPlan[] = input.platforms.map((platform) => {
    const config = platformConfigurations[platform];
    const contentIdeas =
      config?.focusAngles.map((angle, index) => {
        const format = config.formats[index % config.formats.length];
        return `${format}: ${angle.replace(
          "Bharat",
          "Bharat"
        )} • CTA → ${config.callToAction}`;
      }) ?? [];

    return {
      platform,
      cadence: config?.cadence ?? "Custom cadence determined post discovery.",
      positioning:
        config?.positioning ??
        "Craft hyper-relevant conversations that pull audiences into the Bharat Life Care ecosystem.",
      callToAction:
        config?.callToAction ??
        "Reach our care team to choose the right diagnostic pathway.",
      contentIdeas,
    };
  });

  const automations: Automation[] = [
    {
      title: "Sentiment-aware inbox triage",
      description:
        "Auto-tags inbound DMs and comments, routing medical questions to doctors and sales-ready leads to concierge within 15 minutes.",
      active: true,
    },
    {
      title: "Creator co-pilot briefing",
      description:
        "Generates weekly creative briefs aligned to approved content pillars and pushes to Notion + Slack.",
      active: true,
    },
    {
      title: "Compliance guardrails",
      description:
        "Scans all scheduled copies for medical compliance phrases and flags risky statements before publishing.",
      active: true,
    },
    {
      title: "WhatsApp retention loop",
      description:
        "Triggers follow-up automations 48 hours after first consultation reminder with contextual nudges.",
      active: true,
    },
  ];

  const reporting: ReportingMetric[] = [
    {
      metric: "Leads → Consultation Conversion",
      baseline: "18%",
      target: "28% within 6 weeks",
      note: "Measure uplift in WhatsApp concierge funnel.",
    },
    {
      metric: "Preventive Plan Sign-ups",
      baseline: "210 / month",
      target: "325 / month",
      note: "Track Instagram & LinkedIn assisted conversions.",
    },
    {
      metric: "Average Response Time",
      baseline: "2h 40m",
      target: "<45m across all social touchpoints",
      note: "Automations should handle triage + first reply.",
    },
    {
      metric: "Doctor-led Live Engagement",
      baseline: "8% attendance",
      target: "15% with improved reminder cadence",
      note: "Use WhatsApp + email synergy.",
    },
  ];

  const actionOwners = ["Growth Team", "Medical Ops", "Creative Studio", "CX Desk"];
  const actions: ActionItem[] = [
    {
      label: "Finalize 6-week omnichannel narrative map",
      owner: "Growth Team",
      due: "Day 2",
      status: "in-progress",
    },
    {
      label: "Record doctor myth-busting series batch",
      owner: "Medical Ops",
      due: "Day 4",
      status: "queued",
    },
    {
      label: "Deploy compliance guardrails checklist inside Asana",
      owner: "Creative Studio",
      due: "Day 3",
      status: "in-progress",
    },
    {
      label: "Configure WhatsApp concierge routing tree",
      owner: "CX Desk",
      due: "Day 5",
      status: "queued",
    },
    {
      label: "Publish founding physician leadership story on LinkedIn",
      owner: "Growth Team",
      due: "Day 7",
      status: "queued",
    },
    {
      label: "Launch preventative health webinar funnel",
      owner:
        actionOwners[
          (input.durationWeeks + input.goal.length) % actionOwners.length
        ],
      due: "Day 11",
      status: "queued",
    },
  ];

  const strategySummary = [
    `Deliver ${input.goal.toLowerCase()}`,
    `Land Bharat Life Care as the default preventive partner for ${input.audience.toLowerCase()}`,
    `Bake ${input.keyOffer.toLowerCase()} into every CTA with ${input.tone.toLowerCase()} storytelling`,
  ].join(" • ");

  return {
    strategySummary,
    voicePrinciples,
    contentPillars: uniquePillars,
    narrativeHooks,
    platformPlans,
    automations,
    reporting,
    actions,
  };
}

function addDays(base: string, days: number) {
  const date = new Date(base);
  date.setDate(date.getDate() + days);
  return date;
}

function formatDateLabel(value: string) {
  const date = new Date(value);
  return `${weekdayLabels[date.getDay()]}, ${date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  })}`;
}

function buildCalendar(
  input: CampaignInput,
  plan: CampaignPlan
): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const start = input.startDate;

  plan.platformPlans.forEach((platformPlan, platformIndex) => {
    const ideaLoop = platformPlan.contentIdeas.length
      ? platformPlan.contentIdeas
      : [
          `${platformPlan.platform} deep dive on Bharat Life Care experience.`,
        ];

    for (let week = 0; week < input.durationWeeks; week += 1) {
      const baseDayOffset = week * 5;
      const stagger = platformIndex % 5;
      const publishDate = addDays(start, baseDayOffset + stagger);
      const format =
        platformConfigurations[platformPlan.platform]?.formats[
          week % platformConfigurations[platformPlan.platform].formats.length
        ] ?? "Content Drop";

      const status: CalendarEvent["status"] =
        week === 0
          ? "draft"
          : week === 1
            ? "review"
            : week % 2 === 0
              ? "scheduled"
              : "draft";

      events.push({
        date: publishDate.toISOString().split("T")[0],
        platform: platformPlan.platform,
        angle: ideaLoop[week % ideaLoop.length],
        format,
        status,
      });
    }
  });

  return events.sort((a, b) => a.date.localeCompare(b.date));
}

function bucketEventsByWeek(events: CalendarEvent[]) {
  return events.reduce((acc, event) => {
    const date = new Date(event.date);
    const weekKey = `Week ${Math.ceil(date.getDate() / 7)}`;
    if (!acc[weekKey]) {
      acc[weekKey] = [];
    }
    acc[weekKey].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);
}

function statusColor(status: CalendarEvent["status"]) {
  switch (status) {
    case "draft":
      return "bg-amber-500/20 text-amber-200 ring-1 ring-amber-500/40";
    case "review":
      return "bg-sky-500/20 text-sky-200 ring-1 ring-sky-500/40";
    case "scheduled":
      return "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-500/40";
    default:
      return "bg-slate-500/20 text-slate-200 ring-1 ring-slate-500/40";
  }
}

function actionStatusStyles(status: ActionItem["status"]) {
  if (status === "done") {
    return "bg-emerald-500/20 text-emerald-100 ring-1 ring-emerald-500/40";
  }
  if (status === "in-progress") {
    return "bg-sky-500/20 text-sky-100 ring-1 ring-sky-500/40";
  }
  return "bg-slate-500/20 text-slate-100 ring-1 ring-slate-500/30";
}

export default function Home() {
  const [form, setForm] = useState<CampaignInput>(defaultInput);
  const [plan, setPlan] = useState<CampaignPlan>(() => generatePlan(form));
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() =>
    buildCalendar(form, plan)
  );

  const weekBuckets = useMemo(
    () => bucketEventsByWeek(calendarEvents),
    [calendarEvents]
  );

  const today = useMemo(
    () => new Date().toLocaleDateString("en-IN", { dateStyle: "full" }),
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-slate-100">
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-emerald-500/20 blur-3xl" />
        <header className="mx-auto max-w-7xl px-6 pb-12 pt-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                Bharat Life Care · Social Media Command Center
              </span>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                AI Agent orchestrating end-to-end social media growth for Bharat
                Life Care.
              </h1>
              <p className="text-lg text-slate-300">
                Centralize workflows, content intelligence, compliance guardrails,
                and performance loops across every Bharat Life Care touchpoint.
                The agent plans, creates, approves, schedules, and optimizes —
                you stay in control of the mission.
              </p>
            </div>
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-300">
                Today · {today}
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-sm text-slate-400">Primary Outcome</p>
                  <p className="text-lg font-semibold text-emerald-200">
                    320+ preventive plan sign-ups / month
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <MetricPill label="Channels live" value={form.platforms.length.toString()} />
                  <MetricPill label="Agent automations" value={plan.automations.length.toString()} />
                  <MetricPill label="Campaign sprint" value={`${form.durationWeeks} weeks`} />
                  <MetricPill label="Compliance reviews" value="Active" />
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      <main className="mx-auto mt-14 grid max-w-7xl gap-10 px-6 xl:grid-cols-[1.15fr,0.85fr] xl:items-start">
        <section className="space-y-8">
          <Card className="bg-white/5">
            <div className="flex flex-col gap-8 lg:flex-row">
              <form
                className="w-full space-y-6 lg:w-3/5"
                onSubmit={(event) => {
                  event.preventDefault();
                  const nextPlan = generatePlan(form);
                  setPlan(nextPlan);
                  setCalendarEvents(buildCalendar(form, nextPlan));
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-white">
                    Configure Bharat Life Care mission brief
                  </h2>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
                  >
                    Regenerate Agent Strategy
                  </button>
                </div>
                <div className="grid gap-4">
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                      Campaign goal
                    </span>
                    <textarea
                      value={form.goal}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          goal: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      rows={2}
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                      Core audience
                    </span>
                    <textarea
                      value={form.audience}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          audience: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      rows={2}
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                      Strategic focus
                    </span>
                    <textarea
                      value={form.focus}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          focus: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      rows={2}
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Brand tone
                      </span>
                      <input
                        type="text"
                        value={form.tone}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,
                            tone: event.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Flagship offer
                      </span>
                      <input
                        type="text"
                        value={form.keyOffer}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,
                            keyOffer: event.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Kick-off
                      </span>
                      <input
                        type="date"
                        value={form.startDate}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,
                            startDate: event.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Sprint duration (weeks)
                      </span>
                      <input
                        type="number"
                        min={2}
                        max={12}
                        value={form.durationWeeks}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,
                            durationWeeks: Number(event.target.value),
                          }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      />
                    </label>
                    <div className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Platforms in play
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {platformOptions.map((platform) => {
                          const active = form.platforms.includes(platform);
                          return (
                            <button
                              key={platform}
                              type="button"
                              onClick={() =>
                                setForm((prev) => {
                                  const exists = prev.platforms.includes(
                                    platform
                                  );
                                  return {
                                    ...prev,
                                    platforms: exists
                                      ? prev.platforms.filter(
                                          (item) => item !== platform
                                        )
                                      : [...prev.platforms, platform],
                                  };
                                })
                              }
                              className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                                active
                                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                                  : "border-white/10 bg-white/5 text-slate-200 hover:border-emerald-400/60 hover:text-emerald-100"
                              }`}
                            >
                              {platform}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <aside className="w-full space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-inner lg:w-2/5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                      Agent summary
                    </p>
                    <p className="mt-2 text-base text-slate-300">
                      {plan.strategySummary}
                    </p>
                  </div>
                  <img
                    src="https://avatars.dicebear.com/api/initials/Bharat%20AI.svg"
                    alt="Bharat Life Care Agent"
                    className="h-10 w-10 rounded-full border border-emerald-500/50 bg-emerald-500/10"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Voice & Tone Anchors
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {plan.voicePrinciples.map((principle) => (
                      <li key={principle} className="flex gap-3">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span>{principle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Narrative hooks curated
                  </h3>
                  <div className="mt-3 grid gap-2">
                    {plan.narrativeHooks.map((hook) => (
                      <div
                        key={hook}
                        className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
                      >
                        {hook}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </Card>

          <Card className="bg-white/5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-white">
                Platform-by-platform execution matrix
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                AI-aligned with Bharat Life Care guardrails
              </span>
            </div>
            <div className="mt-8 grid gap-6">
              {plan.platformPlans.map((platformPlan) => (
                <div
                  key={platformPlan.platform}
                  className="rounded-3xl border border-white/10 bg-slate-900/60 p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {platformPlan.platform}
                      </h3>
                      <p className="mt-1 text-sm text-slate-300">
                        {platformPlan.positioning}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-300">
                      <span className="rounded-full border border-emerald-400/50 bg-emerald-500/20 px-4 py-1 text-emerald-100">
                        {platformPlan.cadence}
                      </span>
                      <span className="rounded-full border border-white/10 px-4 py-1 text-slate-200">
                        CTA · {platformPlan.callToAction}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 text-sm text-slate-200 lg:grid-cols-2">
                    {platformPlan.contentIdeas.map((idea) => (
                      <div
                        key={idea}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                      >
                        {idea}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white/5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-white">
                Bharat Life Care Ops Workflow
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Agent ensures SLA adherence
              </span>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-4">
              {plan.contentPillars.map((pillar, index) => {
                const laneOwners = ["Growth", "Creative", "Medical", "CX"];
                const owner = laneOwners[index % laneOwners.length];
                return (
                <div
                  key={pillar}
                  className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-4"
                >
                  <h3 className="text-sm font-semibold text-emerald-200">
                    {pillar}
                  </h3>
                  <p className="mt-3 text-xs text-slate-400">
                    Agent pairs this with sentiment tracking & creator briefs.
                  </p>
                  <div className="mt-6 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Owner</span>
                    <span className="font-semibold text-slate-200">{owner}</span>
                  </div>
                </div>
              );
              })}
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
                <h3 className="text-sm font-semibold text-emerald-100">
                  Integrated approvals lane
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-emerald-50">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                    <span>Draft → Medical QA → Compliance QA → Schedulable</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                    <span>Agent notifies doctor leads for clinical validation.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                    <span>Slack handoff includes tracked CTA + asset links.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                <h3 className="text-sm font-semibold text-white">
                  Daily agent ritual
                </h3>
                <ol className="mt-4 space-y-3 text-sm text-slate-200">
                  <li>07:30 · Pull overnight sentiment & escalate anomalies.</li>
                  <li>10:00 · Sync creative queue + doctor availability.</li>
                  <li>14:00 · Update WhatsApp concierge pipeline health.</li>
                  <li>19:30 · Push day-end pulse report to leadership.</li>
                </ol>
              </div>
            </div>
          </Card>
        </section>

        <aside className="space-y-8">
          <Card className="bg-white/5">
            <h2 className="text-xl font-semibold text-white">
              Smart calendar · 360° content spread
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Agent keeps the calendar balanced across audience intent, platform
              cadence, and compliance checkpoints. Drill into upcoming drops.
            </p>
            <div className="mt-6 space-y-5">
              {Object.entries(weekBuckets).map(([week, events]) => (
                <div key={week} className="rounded-3xl border border-white/10 bg-slate-900/70 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">
                      {week}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {events.length} drops
                    </span>
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-slate-200">
                    {events.map((event) => (
                      <div
                        key={`${event.date}-${event.platform}`}
                        className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-wide text-slate-400">
                            {formatDateLabel(event.date)}
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(event.status)}`}
                          >
                            {event.status}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-white">
                          {event.platform} · {event.format}
                        </p>
                        <p className="text-xs text-slate-300">{event.angle}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white/5">
            <h2 className="text-xl font-semibold text-white">
              Automations supervising Bharat Life Care pipeline
            </h2>
            <div className="mt-6 space-y-4">
              {plan.automations.map((automation) => (
                <div
                  key={automation.title}
                  className="flex items-start gap-3 rounded-3xl border border-white/10 bg-slate-900/70 p-4"
                >
                  <div className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold text-emerald-100">
                        {automation.title}
                      </p>
                      <span className="rounded-full border border-emerald-400/50 bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100">
                        {automation.active ? "Live" : "Standby"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {automation.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white/5">
            <h2 className="text-xl font-semibold text-white">
              Mission control · Actions & escalations
            </h2>
            <div className="mt-6 space-y-4">
              {plan.actions.map((action) => (
                <div
                  key={action.label}
                  className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {action.label}
                    </p>
                    <p className="text-xs text-slate-400">
                      {action.owner} · Due {action.due}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] ${actionStatusStyles(action.status)}`}
                  >
                    {action.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white/5">
            <h2 className="text-xl font-semibold text-white">
              Performance telemetry
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              The agent monitors leading indicators daily, surfacing actions when
              Bharat Life Care slips below threshold.
            </p>
            <div className="mt-6 space-y-3">
              {plan.reporting.map((metric) => (
                <div
                  key={metric.metric}
                  className="rounded-3xl border border-white/10 bg-slate-900/70 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">
                      {metric.metric}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Target · {metric.target}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Baseline · {metric.baseline}
                  </p>
                  <p className="mt-3 text-sm text-slate-200">{metric.note}</p>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </main>
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[32px] border border-white/10 p-8 shadow-[0_30px_80px_-40px_rgba(16,185,129,0.35)] ${className}`}
    >
      {children}
    </section>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
    </div>
  );
}
