interface User {
  _id: string,
  photo: string,
  firstName: string,
  lastName: string,
  email: string,
  companyName: string,
  occupation: string,
  status: "inactive" | "active",
  joinDate: Date,
  phone: string,
  gender: "male" | "female",
}

export default User