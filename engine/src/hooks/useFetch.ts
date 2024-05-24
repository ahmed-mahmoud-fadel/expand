import { useEffect, useState } from "react";

const useFetch = ({
  url,
  init,
}: {
  url: string | URL | Request,
  init?: RequestInit,
}) => {
  const [response, setResponse] = useState<Response | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    fetch(url, init)
    .then(res => setResponse(res))
    .catch(err => setError(err))
    .finally(() => setIsLoading(false))
  }, [])

  return {
    response,
    isLoading,
    error,
  }
}
 
export default useFetch;