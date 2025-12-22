import { Fingerprint, Megaphone, Video, Bot, Sparkles, Printer } from "lucide-react";

export const servicesData = [
  {
    id: "brand",
    title: "Brand Identity",
    icon: Fingerprint,
    cardImage: "/service-icons/brand.png",
    description: "We craft memorable brand identities that resonate with your audience. From logos to full style guides, we define who you are.",
    features: ["Strategy & Positioning", "Visual Identity Systems", "Tone of Voice Guidelines"],
    pdf: "/pdfs/branding.pdf",
    projects: [
      { title: "Neon Tech", img: "https://images.unsplash.com/photo-1626785774573-4b799314348d?w=800&q=80" },
      { title: "EcoLife", img: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=800&q=80" },
      { title: "Fintech App", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
      { title: "Minimalist", img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3a8?w=800&q=80" }
    ]
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: Megaphone,
    cardImage: "/digital-marketing.jpg",
    description: "Data-driven campaigns that put your brand in front of the right eyes. We scale traffic and optimize for ROI.",
    features: ["Paid Social (Meta/TikTok)", "Google Ads (PPC)", "Email Automation"],
    pdf: "/pdfs/marketing.pdf",
    projects: [
      { title: "Q3 Campaign", img: "ABD.jpg" },
      { title: "Analytics", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" }
    ]
  },
  {
    id: "content",
    title: "Content Production",
    icon: Video,
    cardImage: "/service-icons/content.png",
    description: "Visual storytelling that stops the scroll. We produce high-quality video and static assets for the social era.",
    features: ["Short-Form Video", "Product Photography", "Motion Graphics"],
    pdf: "/pdfs/content.pdf",
    projects: [
      // UPDATED: Points to "Viral reel.mp4" in the public root folder
      {
        title: "Viral Reel",
        video: "/vid/videos/Viral reel.mp4",
        img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80"
      },
      { title: "Product Shoot", img: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&q=80" }
    ]
  },
  {
    id: "ai",
    title: "AI Creative",
    icon: Bot,
    cardImage: "/service-icons/ai.png",
    description: "Leverage the power of Artificial Intelligence to streamline workflows and generate infinite creative variations.",
    features: ["AI Image Generation", "Custom Chatbots", "Process Automation"],
    pdf: "/pdfs/ai.pdf",
    projects: [
      { title: "AI Avatar", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80" },
      { title: "Chatbot UI", img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80" }
    ]
  },
  {
    id: "aeo",
    title: "AEO Optimization",
    icon: Sparkles,
    cardImage: "/service-icons/aeo.png",
    description: "The future of SEO. We optimize your brand to be the top answer in AI search engines like ChatGPT and Perplexity.",
    features: ["Knowledge Graph Opt", "Answer Engine Strategy", "Voice Search Prep"],
    pdf: "/pdfs/aeo.pdf",
    projects: [
      { title: "Search Ranking", img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80" },
      { title: "Voice Prep", img: "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?w=800&q=80" }
    ]
  },
  {
    id: "print",
    title: "Print & Branding",
    icon: Printer,
    cardImage: "/service-icons/print.png",
    description: "Tangible assets for the real world. We design physical touchpoints that leave a lasting impression.",
    features: ["Packaging Design", "Event Signage", "Merchandise"],
    pdf: "/pdfs/print.pdf",
    projects: [
      { title: "Coffee Bag", img: "https://images.unsplash.com/photo-1559587521-f18c44dc248d?w=800&q=80" },
      { title: "Business Card", img: "https://images.unsplash.com/photo-1589330694653-383e91131296?w=800&q=80" }
    ]
  }
];