import { FaClock, FaDownload, FaUser, FaChartLine, FaSmile } from "react-icons/fa";
import IconCard from "./widgets/IconCard";
import TrafficGraph from "./widgets/TrafficGraph";
import fetchWithError from "@/global/fetchWithError";
import { cookies } from "next/headers";
import endpoints from "@/global/endpoints";

const AdminHome = async () => {
  const jwt = cookies().get('jwt')
  const [userCount, userCountError] = await fetchWithError(`${endpoints.analytics}/user-count`, {
    headers: {
      "Authorization": `Bearer ${jwt?.value}`,
    },
    next: {
      revalidate: 0,
    },
  })
  const [activeSubscriptions, activeSubscriptionsError] = await fetchWithError(`${endpoints.analytics}/active-subscriptions`, {
    headers: {
      "Authorization": `Bearer ${jwt?.value}`,
    },
    next: {
      revalidate: 0,
    },
  })
  const [solutionCount, solutionCountError] = await fetchWithError(`${endpoints.analytics}/solution-count`, {
    headers: {
      "Authorization": `Bearer ${jwt?.value}`,
    },
    next: {
      revalidate: 0,
    },
  })

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
            userCountError &&
            <p className="text-red-600 font-bold">
              {userCountError?.message ?? userCountError.toString()}
            </p>
          }
          {
            activeSubscriptionsError &&
            <p className="text-red-600 font-bold">
              {activeSubscriptionsError?.message ?? activeSubscriptionsError.toString()}
            </p>
          }
          {
            solutionCountError &&
            <p className="text-red-600 font-bold">
              {solutionCountError?.message ?? solutionCountError.toString()}
            </p>
          }
          {
            !(userCountError || activeSubscriptionsError || solutionCountError) &&
            <div className="grid grid-cols-3 grid-rows-3 gap-4">
              <IconCard
                data={userCount.count}
                icon={<FaUser />}
                title="Number of subscibers"
              />
              <IconCard
                data={activeSubscriptions.count}
                icon={<FaChartLine />}
                title="Number of requests"
              />
              <IconCard
                data={solutionCount.count}
                icon={<FaSmile />}
                title="Total visits"
              />
              <div className="row-span-2 col-span-3">
                <TrafficGraph data={[
                  105,
                  174,
                  195,
                  260,
                ]} />
              </div>
            </div>
          }
        </div>
        {/* <div className="w-max border-l h-full pl-4">
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
        </div> */}
      </div>
    </main>
  );
}

export default AdminHome;