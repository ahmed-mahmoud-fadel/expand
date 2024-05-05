import { FaClock, FaDownload, FaUser, FaChartLine, FaSmile } from "react-icons/fa";
import IconCard from "./widgets/IconCard";
import fetchWithError from "@/global/fetchWithError";
import endpoints from "@/global/endpoints";
import TrafficGraph from "./widgets/TrafficGraph";
import UserActivity from "./widgets/UserActivity";
import dashboardRouting from "../routing";

const AdminHome = async ({
  searchParams
}: {
  searchParams?: any,
}) => {
  const [analytics, analyticsError] = await fetchWithError(
    endpoints.analytics,
    {
      next: {
        revalidate: 0
      }
    }
  )

  const [users, usersError] = await fetchWithError(
    `${endpoints.users}?_page=${searchParams?.page ?? 1}&_limit=5`,
    {
      next: {
        revalidate: 0
      }
    }
  )

  const last = 20

  return (
    <main className="flex flex-col gap-5 h-full">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Hello, Admin</p>
        <div className="flex gap-2">
          <div className="rounded-xl duration-200 bg-secondary px-3 py-2 text-sm gap-1 flex items-center">
            <FaClock />
            <p>{new Date(Date.now()).toDateString()}</p>
          </div>
          <button className="hover:bg-gray-300 duration-200 rounded-xl bg-secondary px-3 py-2 gap-1 text-sm flex items-center">
            <FaDownload />
            <p>Download</p>
          </button>
        </div>
      </div>
      <div className="flex gap-4 h-full">
        <div className="w-full">
          {
            analyticsError &&
            <p className="text-red-600 font-bold">
              {analyticsError?.message ?? analyticsError.toString()}
            </p>
          }
          {
            !analyticsError && analytics &&
            <div className="grid grid-cols-3 grid-rows-3 gap-4">
              <IconCard
                data={analytics.subscriberCount}
                icon={<FaUser />}
                title="Number of subscibers"
              />
              <IconCard
                data={analytics.requestCount}
                icon={<FaChartLine />}
                title="Number of requests"
              />
              <IconCard
                data={analytics.totalVisits}
                icon={<FaSmile />}
                title="Total visits"
              />
              <div className="row-span-2 col-span-3">
                <TrafficGraph data={analytics.traffic} />
              </div>
            </div>
          }
        </div>
        <div className="w-max border-l h-full pl-4">
        {
          usersError &&
          <p className="text-red-600 font-bold text-nowrap">
            {usersError?.message ?? usersError.toString()}
          </p>
        }
        {
          !usersError && users &&
          <UserActivity
          users={users.slice(0, 5)}
          last={last}
          searchParams={searchParams}
          />
        }
        </div>
      </div>
    </main>
  );
}

export default AdminHome;