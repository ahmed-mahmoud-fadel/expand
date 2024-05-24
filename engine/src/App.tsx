import { useSearchParams } from "react-router-dom";
import GlassesSolution from "./solutions/GlassesSolution";
import ShoesSolution from "./solutions/ShoesSolution";
import WatchesSolution from "./solutions/WatchesSolution";

const solutions = [
  {
    name: "glasses",
    solution: GlassesSolution,
  },
  {
    name: "watches",
    solution: WatchesSolution,
  },
  {
    name: "shoes",
    solution: ShoesSolution,
  },
]

const App = () => {
  const [searchParams] = useSearchParams()

  const solution = searchParams.get('solution')
  const product = searchParams.get('product')
  
  if (!solution || !solutions.find(v => v.name === solution))
    return <p>Please provide a valid soltuion.</p>

  if (!product)
    return <p>Please provide a valid product ID.</p>
  
  const Solution = solutions.find(v => v.name === solution)?.solution!

  return (
    <Solution path={import.meta.env.BASE_URL + `model/${product}`}/>
  );
}
 
export default App;