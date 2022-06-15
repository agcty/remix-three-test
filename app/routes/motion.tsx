import { Box } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
// import React, { useRef, useState } from 'react'
import DreiBox from "~/components/DreiBox";
// import snapshot from "@snapshot-labs/snapshot.js"
import { useRef, useState } from "react";

// function Box(props) {
//   // This reference gives us direct access to the THREE.Mesh object
//   const ref = useRef();
//   // Hold state for hovered and clicked events
//   const [hovered, hover] = useState(false);
//   const [clicked, click] = useState(false);
//   // Subscribe this component to the render-loop, rotate the mesh every frame
//   useFrame((state, delta) => (ref.current.rotation.x += 0.01));
//   // Return the view, these are regular Threejs elements expressed in JSX
//   return (
//     <mesh
//       {...props}
//       ref={ref}
//       scale={clicked ? 1.5 : 1}
//       onClick={(event) => click(!clicked)}
//       onPointerOver={(event) => hover(true)}
//       onPointerOut={(event) => hover(false)}
//     >
//       <boxGeometry args={[3, 3, 3]} />
//       <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
//     </mesh>
//   );
// }

// const hub = "https://hub.snapshot.org"; // or https://testnet.snapshot.org for testnet
// const client = new snapshot.Client712(hub);

// console.log(client)

// export default function Index() {
//   return (
//     <div
//       style={{
//         fontFamily: "system-ui, sans-serif",
//         lineHeight: "1.4",
//         height: "100vh",
//       }}
//     >
//       <h1>Fiber example ss</h1>

//       <Canvas>
//         <Box />
//       </Canvas>
//     </div>
//   );
// }
