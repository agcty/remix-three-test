import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ClientOnly } from "remix-utils";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>

      <ClientOnly>
        {() => (
          <Canvas>
            <Box args={[3, 3, 3]}></Box>
          </Canvas>
        )}
      </ClientOnly>
    </div>
  );
}
