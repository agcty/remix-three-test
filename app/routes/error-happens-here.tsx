import { Box, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Index() {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.4",
        height: "100vh",
      }}
    >
      <h1>Drei example</h1>

      <Canvas>
<Stage>
<Box />
</Stage>

      </Canvas>
    </div>
  );
}
