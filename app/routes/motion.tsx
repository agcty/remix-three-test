import { motion } from "framer-motion";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Motion example</h1>

      <motion.div>Test</motion.div>
    </div>
  );
}
