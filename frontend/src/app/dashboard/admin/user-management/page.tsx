import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from "next/link"
import User from "@/types/User"
import endpoints from "@/global/endpoints"
import fetchWithError from "@/global/fetchWithError"
import Pagination from "@/components/Pagination"
import { cookies } from "next/headers"

const UserManagement = async ({
  searchParams
}: {
  searchParams: any
}) => {
  const jwt = cookies().get("jwt")

  const page = searchParams?.page ?? 1
  const [data, error] = await fetchWithError(
    `${endpoints.users}?page=${page}&limit=10`,
    {
      next: {
        revalidate: 0
      },
      headers: {
        "Authorization": `Bearer ${jwt?.value}`
      }
    }
  )

  const users = data.users
  const last = data.totalPages
  
  return (
    <main className="flex flex-col gap-5 h-full">
      <p className="text-lg font-bold">User Management</p>
      {
        error &&
        <p className="text-red-600 font-bold">
          {error.message}
        </p>
      }
      {
        !error && users &&
        <>
        <div className="h-3/4 overflow-y-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead>
                Full Name
              </TableHead>
              <TableHead>
                Email
              </TableHead>
              <TableHead>
                Company
              </TableHead>
              <TableHead>
                Status
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              users.map((user: User, n: number) => (
                <TableRow key={user._id}>
                  <TableCell>{(page - 1) * 10 + n + 1}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={user.photo} />
                      <AvatarFallback>
                        {user.firstName[0]}{user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.companyName}
                  </TableCell>
                  <TableCell>
                    {user.status}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/admin/profile/${user._id}`} className="text-primary">Profile</Link>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        </div>
        <div className="flex justify-end">
          <div className="w-max">
            <Pagination
            handle="/dashboard/admin/user-management"
            last={last}
            searchParams={searchParams}
            />
          </div>
        </div>
      </>
      }
    </main>
  )
}

export default UserManagement