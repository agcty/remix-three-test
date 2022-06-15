import { Box } from "@react-three/drei";
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
      <h1>Error reproduction of certain libraries not working if remix compile doesn't minify</h1>

      <Canvas>
        <Box />
      </Canvas>
    </div>
  );
}
