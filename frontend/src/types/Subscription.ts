interface Subscription {
  _id: string,
  user: { email: string, companyName: string },
  solution: { name: string },
  pricingPlans: { title: string },
  autoRenew: boolean,
  status: string
  createdAt: string,
  endDate: string,
}

export default Subscription