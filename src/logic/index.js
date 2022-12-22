import { DepthAlgorithm } from "./depthAlgorithm.js";
import { World } from "./world";

let newWorld = new World();
newWorld.fillWorld();
const algorithm = new DepthAlgorithm(newWorld, 1);
const solution = algorithm.start();
