"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export default function ThreeDMarqueeDemo() {
    const images = [
        "/portfolio/portfolio-01.jpg",
        "/portfolio/portfolio-02.jpg",
        "/portfolio/portfolio-03.jpg",
        "/portfolio/portfolio-04.jpg",
        "/portfolio/portfolio-05.jpg",
        "/portfolio/portfolio-06.jpg",
        "/portfolio/portfolio-07.jpg",
        "/portfolio/portfolio-08.jpg",
        "/portfolio/portfolio-09.jpg",
        "/portfolio/portfolio-10.jpg",
        "/portfolio/portfolio-11.jpg",
        "/portfolio/portfolio-12.jpg",
        "/portfolio/portfolio-13.jpg",
        "/portfolio/portfolio-14.jpg",
        "/portfolio/portfolio-15.jpg",
        "/portfolio/portfolio-16.jpg",
        "/portfolio/portfolio-17.jpg",
        "/portfolio/portfolio-18.jpg",
        "/portfolio/portfolio-19.jpg",
        "/portfolio/portfolio-20.jpg",
        "/portfolio/portfolio-21.jpg",
        "/portfolio/portfolio-22.jpg",
        "/portfolio/portfolio-23.jpg",
        "/portfolio/portfolio-24.jpg",
        "/portfolio/portfolio-25.jpg",
    ];
    return (
        <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
            <ThreeDMarquee images={images} />
        </div>
    );
}
