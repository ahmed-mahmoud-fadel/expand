const handle = process.env.NEXT_PUBLIC_API_HANDLE

const endpoints = {
  login: `${handle}/user/auth/login`,
  logout: `${handle}/user/auth/logout`,
  signup: `${handle}/user/auth/register`,
  users: `${handle}/user`,
  solutions: `${handle}/solution`,
  subscriptions: `${handle}/subscription`,
  analytics: `${handle}/analytics`,
  posts: `${handle}/blog`,
  plans: `${handle}/pricingPlans`,
  messages: `${handle}/contact`,
  products: `${handle}/product`,
  engine: `${handle}/engine`,
  verify: `${handle}/user/auth/verify-email`
}

export default endpoints