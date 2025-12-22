"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Sparkles, Fingerprint, Megaphone, Video, Bot, Printer, Loader2, ArrowRight } from "lucide-react";

// Map categories to icons
const iconMap: Record<string, any> = {
    "Identity": Fingerprint,
    "Brand Identity": Fingerprint,
    "Marketing": Megaphone,
    "Digital Marketing": Megaphone,
    "Content": Video,
    "Content Production": Video,
    "AI": Bot,
    "AI Creative": Bot,
    "AEO": Sparkles,
    "AEO Optimization": Sparkles,
    "Print": Printer,
    "Print & Branding": Printer,
};

export default function Services({ onSelect, id }: { onSelect: (service: any) => void, id: string }) {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data, error } = await supabase
                .from("services")
                .select("*")
                .order("created_at", { ascending: true });

            if (error) throw error;

            // Transform data to match existing UI expectations
            const formattedData = (data || []).map(item => ({
                ...item,
                // Map icon or default to Sparkles
                icon: iconMap[item.title] || iconMap[item.category] || Sparkles,
                // Use Supabase image_url, fallback to placeholder if needed
                // ensure features/projects exist to prevent crashes
                features: ["Project Strategy", "Professional Management", "24/7 Support"],
                projects: item.image_urls && item.image_urls.length > 0
                    ? item.image_urls.map((url: string, index: number) => ({ title: `Project ${index + 1}`, img: url }))
                    : item.image_url
                        ? [{ title: "Preview", img: item.image_url }]
                        : [],
                pdf: null, // No PDF in DB schema yet
            }));

            setServices(formattedData);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20 text-gray-500">
                <Loader2 className="animate-spin mr-2" /> Loading services...
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
                <ServiceCard
                    key={service.id}
                    id={id}
                    service={service}
                    onClick={() => onSelect(service)}
                />
            ))}
        </div>
    );
}

import Image from "next/image"; // Add import

// ...

function ServiceCard({ service, id, onClick }: { service: any, id: string, onClick: () => void }) {
    const Icon = service.icon;

    return (
        <motion.div
            layoutId={`card-${service.title}-${id}`}
            onClick={onClick}
            className="cursor-pointer glass-panel p-8 rounded-3xl border border-white/10 hover:border-[#3CB7FF]/60 transition-all duration-300 group flex flex-col h-full hover:shadow-[0_0_40px_-15px_rgba(60,183,255,0.3)] relative overflow-hidden"
        >
            {/* Background Image - Only if exists */}
            {service.image_url && (
                <>
                    <Image
                        src={service.image_url}
                        alt={service.title}
                        fill
                        className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 absolute inset-0 -z-10"
                    />
                    {/* Gradient Overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02060C] via-[#02060C]/80 to-transparent -z-10" />
                </>
            )}

            <motion.div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 flex justify-between items-start">
                    <motion.div
                        layoutId={`icon-${service.title}-${id}`}
                        className="w-16 h-16 bg-[#3CB7FF]/10 border border-[#3CB7FF]/20 rounded-2xl flex items-center justify-center text-[#3CB7FF] group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_-5px_rgba(60,183,255,0.2)]"
                    >
                        <Icon size={32} />
                    </motion.div>
                </div>

                <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-[#3CB7FF] transition-colors shadow-black drop-shadow-md">
                    {service.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed flex-grow drop-shadow-md">
                    {service.description}
                </p>

                <motion.div className="mt-6 flex items-center text-xs font-bold text-[#3CB7FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Projects <ArrowRight size={14} className="ml-1" />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
