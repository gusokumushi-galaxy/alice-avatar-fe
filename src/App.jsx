import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { Root, Container } from "@react-three/uikit";

function App() {
  return (
    <>
      <Loader />
      <Leva hidden />
      <UI />
      <div className="canvas-container">
        <Canvas
          shadows
          camera={{ position: [0, 0, 1], fov: 30 }}
        >
          <Experience />
        </Canvas>
      </div>
    </>
  );
}

export default App;
