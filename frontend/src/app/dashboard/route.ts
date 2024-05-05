import dashboardRouting from "./routing";

export async function GET() {
  await dashboardRouting()
}