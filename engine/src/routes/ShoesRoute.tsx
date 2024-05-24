import { useSearchParams } from "react-router-dom";
import ShoesSolution from "../solutions/ShoesSolution";

const ShoesRoute = () => {
  const [searchParams] = useSearchParams()

  return (
    <>
      {
        !searchParams.get('model') &&
        "Please specify a model."
      }
      {
        searchParams.get('model') &&
        <ShoesSolution
          path={`/models/shoes/${searchParams.get('model')!}`}
        />
      }
    </>
  );
}

export default ShoesRoute;