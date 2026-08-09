"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp } from "@/lib/animations";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedSection({
  children,
  className,
}: AnimatedSectionProps) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.section>
  );
}