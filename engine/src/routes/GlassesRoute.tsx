import { useSearchParams } from "react-router-dom";
import GlassesSolution from "../solutions/GlassesSolution";

const GlassesRoute = () => {
  const [searchParams] = useSearchParams()

  return (
    <>
      {
        !searchParams.get('model') &&
        "Please specify a model."
      }
      {
        searchParams.get('model') &&
        <GlassesSolution
          path={`/models/glasses/${searchParams.get('model')!}`}
        />
      }
    </>
  );
}

export default GlassesRoute;