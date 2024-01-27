"use client";

import { motion, AnimatePresence } from "framer-motion";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25, duration: 1.6 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </>
);
