import { Fingerprint, Monitor, Megaphone, Video, Bot, Sparkles, Users, Printer } from "lucide-react";

export const servicesData = [
  {
    id: "brand",
    title: "Brand Identity",
    icon: Fingerprint,
    description: "We craft memorable brand identities that resonate with your audience. From logos to full style guides, we define who you are.",
    features: ["Strategy & Positioning", "Visual Identity Systems", "Tone of Voice Guidelines"],
    // NOW WITH IMAGES
    projects: [
      { title: "Neon Tech", img: "https://images.unsplash.com/photo-1626785774573-4b799314348d?w=800&q=80" },
      { title: "EcoLife", img: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=800&q=80" },
      { title: "Fintech App", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
      { title: "Minimalist", img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3a8?w=800&q=80" }
    ]
  },
  {
    id: "web",
    title: "Web Design",
    icon: Monitor,
    description: "High-performance websites designed to convert. We blend aesthetics with functionality to build your digital headquarters.",
    features: ["Custom UI/UX Design", "Responsive Development", "E-commerce Solutions"],
    projects: [
        { title: "SaaS Dashboard", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
        { title: "Fashion Store", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
        { title: "Agency Portfolio", img: "https://images.unsplash.com/photo-1545665277-5937bf04a518?w=800&q=80" },
        { title: "Crypto Landing", img: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80" }
    ]
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: Megaphone,
    description: "Data-driven campaigns that put your brand in front of the right eyes. We scale traffic and optimize for ROI.",
    features: ["Paid Social (Meta/TikTok)", "Google Ads (PPC)", "Email Automation"],
    projects: [
        { title: "Q3 Campaign", img: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80" },
        { title: "Analytics", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" }
    ]
  },
  {
    id: "content",
    title: "Content Production",
    icon: Video,
    description: "Visual storytelling that stops the scroll. We produce high-quality video and static assets for the social era.",
    features: ["Short-Form Video", "Product Photography", "Motion Graphics"],
    projects: [
        { title: "Viral Reel", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80" },
        { title: "Product Shoot", img: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&q=80" }
    ]
  },
  {
    id: "ai",
    title: "AI Creative",
    icon: Bot,
    description: "Leverage the power of Artificial Intelligence to streamline workflows and generate infinite creative variations.",
    features: ["AI Image Generation", "Custom Chatbots", "Process Automation"],
    projects: [
        { title: "AI Avatar", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80" },
        { title: "Chatbot UI", img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80" }
    ]
  },
  {
    id: "aeo",
    title: "AEO Optimization",
    icon: Sparkles,
    description: "The future of SEO. We optimize your brand to be the top answer in AI search engines like ChatGPT and Perplexity.",
    features: ["Knowledge Graph Opt", "Answer Engine Strategy", "Voice Search Prep"],
    projects: [
        { title: "Search Ranking", img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80" },
        { title: "Voice Prep", img: "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?w=800&q=80" }
    ]
  },
  {
    id: "influencer",
    title: "Influencer Marketing",
    icon: Users,
    description: "Connect with creators who already have your customers' trust. We manage end-to-end influencer campaigns.",
    features: ["Creator Discovery", "Contract Negotiation", "Campaign Management"],
    projects: [
        { title: "Beauty Collab", img: "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?w=800&q=80" },
        { title: "Tech Review", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80" }
    ]
  },
  {
    id: "print",
    title: "Print & Branding",
    icon: Printer,
    description: "Tangible assets for the real world. We design physical touchpoints that leave a lasting impression.",
    features: ["Packaging Design", "Event Signage", "Merchandise"],
    projects: [
        { title: "Coffee Bag", img: "https://images.unsplash.com/photo-1559587521-f18c44dc248d?w=800&q=80" },
        { title: "Business Card", img: "https://images.unsplash.com/photo-1589330694653-383e91131296?w=800&q=80" }
    ]
  }
];