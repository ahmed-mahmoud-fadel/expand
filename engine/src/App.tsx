import WatchesRoute from "./routes/WatchesRoute";
import GlassesRoute from './routes/GlassesRoute';
import { useSearchParams } from "react-router-dom";
import ShoesRoute from "./routes/ShoesRoute";

const solutions = [
  {
    name: "glasses",
    route: GlassesRoute,
  },
  {
    name: "watches",
    route: WatchesRoute,
  },
  {
    name: "shoes",
    route: ShoesRoute,
  },
]

const App = () => {
  const [searchParams] = useSearchParams()

  const solution = searchParams.get('solution') 

  if (!solution || !solutions.find(v => v.name === solution))
    return <p>Please provide a valid soltuion.</p>

  const Route = solutions.find(v => v.name === solution)?.route!

  return (
    <Route />
  );
}
 
export default App;