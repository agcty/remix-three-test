import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { useSpring } from "react-spring";
// import React, { useRef, useState } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'

// if you comment out the drei import, the whole dev build should work again, production builds seem to always work

console.log(Box)
// function Box(props) {
//   // This reference gives us direct access to the THREE.Mesh object
//   const ref = useRef()
//   // Hold state for hovered and clicked events
//   const [hovered, hover] = useState(false)
//   const [clicked, click] = useState(false)
//   // Subscribe this component to the render-loop, rotate the mesh every frame
//   useFrame((state, delta) => (ref.current.rotation.x += 0.01))
//   // Return the view, these are regular Threejs elements expressed in JSX
//   return (
//     <mesh
//       {...props}
//       ref={ref}
//       scale={clicked ? 1.5 : 1}
//       onClick={(event) => click(!clicked)}
//       onPointerOver={(event) => hover(true)}
//       onPointerOut={(event) => hover(false)}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//     </mesh>
//   )
// }

export default function Index() {
  const spring = useSpring({ to: 200, from: 0, config: { duration: 1000 } });
  console.log(spring);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      test canvas hereasdfasbhb
      <Canvas>
        <Box args={[3, 3, 3]}></Box>
        {/* <Box></Box> */}
      </Canvas>
    </div>
  );
}
