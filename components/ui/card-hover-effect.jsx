import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({
    items,
    className
}) => {
    let [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        (<div
            className={cn("grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10", className)}>
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className="relative group  block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}>
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }} />
                        )}
                    </AnimatePresence>
                    <Card>
                        <h1 className='border-2 p-2 w-fit rounded-full border-[#0BA5EC] mb-2'>{item.logo}</h1>
                        <h2 className=' text-white font-semibold text-lg'>{item.text}</h2>
                        <p className='text-[#9C9D9F] text-sm lg:w-[14vw] '>{item.para}</p>
                    </Card>
                </div>
            ))}
        </div>)
    );
};

export const Card = ({
    className,
    children
}) => {
    return (
        (<div
            className={cn(
                "rounded-2xl h-full w-full p-4 overflow-hidden bg-[#07090F] cursor-pointer border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
                className
            )}>
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>)
    );
};
export const CardTitle = ({
    className,
    children
}) => {
    return (
        (<h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
            {children}
        </h4>)
    );
};
export const CardDescription = ({
    className,
    children
}) => {
    return (
        (<p
            className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
            {children}
        </p>)
    );
};
