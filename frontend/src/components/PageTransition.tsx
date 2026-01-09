import { motion } from "framer-motion"
import { ReactNode } from "react"
import { useSettings } from "../context/SettingsContext"

export default function PageTransition({
  children
}: {
  children: ReactNode
}) {
  const { reduceMotion } = useSettings()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={reduceMotion ? false : { opacity: 1, y: 0 }}
      exit={reduceMotion ? false : { opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  )
}
