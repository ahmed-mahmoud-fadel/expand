import User from "@/types/User";
import Card from "./Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "@/components/Pagination";

const UserActivity = ({
  users,
  last,
  searchParams,
}: {
  users: User[],
  last: number,
  searchParams?: any,
}) => {
  return (
    <Card>
      <div className="h-full text-nowrap flex flex-col gap-4 w-[26rem]">
        <p className="font-semibold text-lg">User activity</p>
        <div className="flex-1 overflow-y-scroll">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                users.map(user => (
                  <TableRow key={user._id}>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full" style={{
                          backgroundColor: user.status === "active"
                          ? "green" : "red",
                        }}></div>
                        <p>{user.status}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
        <div className="flex w-full justify-end">
          <div className="w-max">
            <Pagination
            handle="/dashboard/admin"
            last={last}
            searchParams={searchParams}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
 
export default UserActivity;