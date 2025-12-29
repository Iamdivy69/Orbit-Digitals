"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export const ThreeDMarquee = ({
    images,
    className,
}: {
    images: string[];
    className?: string;
}) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Close on Escape key
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedImage(null);
            }
        };
        if (selectedImage) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", onKeyDown);
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [selectedImage]);

    // Split the images array into 4 equal parts
    const chunkSize = Math.ceil(images.length / 5);
    const chunks = Array.from({ length: 5 }, (_, colIndex) => {
        const start = colIndex * chunkSize;
        return images.slice(start, start + chunkSize);
    });

    return (
        <>
            <div
                className={cn(
                    "mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-100",
                    className,
                )}
            >
                <div className="flex size-full items-center justify-center">
                    <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
                        <div
                            style={{
                                transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
                            }}
                            className="relative top-96 right-[73%] grid size-full origin-top-left grid-cols-5 gap-8 transform-3d"
                        >
                            {chunks.map((subarray, colIndex) => {
                                const doubledSubarray = [...subarray, ...subarray, ...subarray, ...subarray];
                                return (
                                    <motion.div
                                        animate={{
                                            y: colIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
                                        }}
                                        transition={{
                                            duration: 100,
                                            ease: "linear",
                                            repeat: Infinity,
                                        }}
                                        key={colIndex + "marquee"}
                                        className="flex flex-col items-start gap-8"
                                    >
                                        <GridLineVertical className="-left-4" offset="80px" />
                                        {doubledSubarray.map((image, imageIndex) => (
                                            <div className="relative w-full" key={`${colIndex}-${imageIndex}-${image}`}>
                                                <GridLineHorizontal className="-top-4" offset="20px" />
                                                <motion.img
                                                    whileHover={{
                                                        scale: 1.05,
                                                        zIndex: 10,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: "easeInOut",
                                                    }}
                                                    onClick={() => setSelectedImage(image)}
                                                    src={image}
                                                    alt={`Image ${imageIndex + 1}`}
                                                    className="w-full h-auto rounded-lg object-contain ring ring-gray-950/5 hover:shadow-2xl bg-[#02060C]/60 cursor-pointer"
                                                />
                                            </div>
                                        ))}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-4 sm:p-8 cursor-zoom-out"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={24} />
                        </button>
                        <motion.img
                            layoutId={`img-${selectedImage}`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            alt="Full screen view"
                            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const GridLineHorizontal = ({
    className,
    offset,
}: {
    className?: string;
    offset?: string;
}) => {
    return (
        <div
            style={
                {
                    "--background": "#ffffff",
                    "--color": "rgba(0, 0, 0, 0.2)",
                    "--height": "1px",
                    "--width": "5px",
                    "--fade-stop": "90%",
                    "--offset": offset || "200px", //-100px if you want to keep the line inside
                    "--color-dark": "rgba(255, 255, 255, 0.2)",
                    maskComposite: "exclude",
                } as React.CSSProperties
            }
            className={cn(
                "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
                "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
                "[background-size:var(--width)_var(--height)]",
                "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
                "[mask-composite:exclude]",
                "z-30",
                "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
                className,
            )}
        ></div>
    );
};

const GridLineVertical = ({
    className,
    offset,
}: {
    className?: string;
    offset?: string;
}) => {
    return (
        <div
            style={
                {
                    "--background": "#ffffff",
                    "--color": "rgba(0, 0, 0, 0.2)",
                    "--height": "5px",
                    "--width": "1px",
                    "--fade-stop": "90%",
                    "--offset": offset || "150px", //-100px if you want to keep the line inside
                    "--color-dark": "rgba(255, 255, 255, 0.2)",
                    maskComposite: "exclude",
                } as React.CSSProperties
            }
            className={cn(
                "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
                "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
                "[background-size:var(--width)_var(--height)]",
                "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
                "[mask-composite:exclude]",
                "z-30",
                "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
                className,
            )}
        ></div>
    );
};
