import { number } from "yup";
import { Pagination as Container, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

const reduceParams = (url: string, searchParams: any) => {
  return (
    url + Object.keys(searchParams)
      .reduce((p, c) => `${p}${c}=${searchParams[c]}&`, "?")
  )
}

const Pagination = ({
  last,
  handle,
  searchParams,
}: {
  last: number,
  handle: string,
  searchParams?: any,
}) => {
  const page = parseInt(searchParams?.page ?? 1)

  return (
    <div className="w-max">
      <Container>
        <PaginationContent>
          {
            page > 1 &&
            <>
              <PaginationItem>
                <PaginationPrevious href={
                  reduceParams(handle, { ...searchParams, page: page - 1 })
                } />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={
                  reduceParams(handle, { ...searchParams, page: page - 1 })
                }>
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            </>
          }
          <PaginationItem>
            <PaginationLink href={
              reduceParams(handle, { ...searchParams, page: page })
            } isActive>
              {page}
            </PaginationLink>
          </PaginationItem>
          {
            page < last &&
            <>
              <PaginationItem>
                <PaginationLink href={
                  reduceParams(handle, { ...searchParams, page: page + 1 })
                }>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
              {
                page + 1 < last &&
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink href={
                      reduceParams(handle, { ...searchParams, page: last })
                    }>
                      {last}
                    </PaginationLink>
                  </PaginationItem>
                </>
              }
              <PaginationItem>
                <PaginationNext href={
                  reduceParams(handle, { ...searchParams, page: page + 1 })
                } />
              </PaginationItem>
            </>
          }
        </PaginationContent>
      </Container>
    </div>
  );
}

export default Pagination;