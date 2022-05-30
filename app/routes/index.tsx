import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>

      <Canvas>
        <Box args={[3, 3, 3]}></Box>
      </Canvas>
    </div>
  );
}
