export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "wake-a-time",
    title: "The Science Behind Wake-A-Time",
    date: "2026-05-12",
    excerpt:
      "Why a silent, haptic alarm on your wrist is harder — and more interesting — than it sounds.",
    content: [
      "Everyone shares a bedroom with someone at some point. Roommates, siblings, partners, dorm mates. The problem I kept running into was simple: my alarm woke people who didn't need to be awake.",
      "Wake-A-Time is my answer. It's a wrist-worn device with a tuned vibration motor, a small microcontroller, and just enough logic to feel like an alarm — not a notification.",
      "The interesting engineering is in the haptics. A too-gentle buzz gets ignored by a sleeping brain. Too aggressive and it feels like an anxiety attack. I've been sweeping through frequencies and pulse patterns to find something that feels like a shoulder tap from a friend.",
      "Still in progress. Next up: better battery life and a strap that doesn't feel like a hospital bracelet.",
    ],
  },
  {
    slug: "home-harvest",
    title: "From Seed to State: The Home Harvest MESA Journey",
    date: "2026-04-02",
    excerpt:
      "How an ESP32, some soil sensors, and a lot of failed prototypes turned into a State Finalist project.",
    content: [
      "Home Harvest started as a question: why is growing food indoors still hard in 2026? The answer, mostly, is that the plant doesn't care about your schedule.",
      "We built an ESP32-based system that handles the boring parts — grow lights on a real photoperiod, soil moisture sensing, and scheduled watering. The user just picks what they're growing.",
      "We took 1st at MESA prelims, 1st at regionals, and made it to State Finals. What I actually learned wasn't about firmware — it was about presenting a project to judges who've seen everything.",
      "Big takeaway: the demo has to work. Twice. In a room you've never been in.",
    ],
  },
  {
    slug: "grant-frc",
    title: "Why Grant Union Needs an FRC Robotics Team",
    date: "2026-03-15",
    excerpt:
      "The vision behind founding Grant Union High School's first FIRST Robotics Competition team.",
    content: [
      "I grew up in the 916. I know exactly what it looks like when a talented kid doesn't have the right room to walk into. FIRST Robotics is one of those rooms.",
      "Grant Union doesn't have an FRC team yet. That's what I'm trying to change. FRC isn't just about building a robot — it's about learning to lead, source parts, write grants, and stay calm when your drivetrain fails 30 seconds before your match.",
      "I'm working on sponsors, mentors, and a real curriculum plan. If you're in Sacramento and want to help — a company sponsor, a mentor with CAD or electrical experience, or just a lead on a workspace — please reach out.",
      "Kids in North Sac deserve the same shot at engineering that kids in the suburbs get by default.",
    ],
  },
  {
    slug: "what-mechatronics-means-to-me",
    title: "What Mechatronics Means to Me",
    date: "2026-02-20",
    excerpt:
      "The word 'mechatronics' does a lot of heavy lifting. Here's what it actually means when I say it.",
    content: [
      "Mechatronics is the seam between mechanical, electrical, and software engineering. In practice it means being the person who can look at a broken robot and know whether the problem is a motor, a driver, a sensor, or a bad line of code.",
      "I want to work on machines that move through the world. Legged robots, drones, prosthetics — the things that require all three disciplines to cooperate. Boston Dynamics is the obvious north star, but honestly any team building embodied intelligence is where I want to be.",
      "For now, that means learning as much as I can, one project at a time. Wake-A-Time teaches me haptics and firmware. Home Harvest taught me sensors and control loops. Solar Car taught me that mechanical is not something you handwave.",
      "The plan is to keep stacking those layers until they add up to something real.",
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
