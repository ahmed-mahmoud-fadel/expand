import { useSearchParams } from "react-router-dom";
import WatchesSolution from "../solutions/WatchesSolution";

const WatchesRoute = () => {
  const [searchParams] = useSearchParams()

  return (
    <>
      {
        !searchParams.get('model') &&
        "Please specify a model."
      }
      {
        searchParams.get('model') &&
        <WatchesSolution
          path={`/models/watches/${searchParams.get('model')!}`}
        />
      }
    </>
  );
}

export default WatchesRoute;