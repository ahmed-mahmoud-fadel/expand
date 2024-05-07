'use client'

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import User from "@/types/User";
import { useFormik } from "formik";
import ImageUpload from "./ImageUpload";
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { useRouter } from "next/navigation";
import editProfile from "@/actions/editProfile";

const UserForm = ({
  user,
  jwt,
}: {
  user: User,
  jwt: string,
}) => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      // email: user.email ?? "",
      phone: user.phone ?? "",
      companyName: user.companyName ?? "",
    },
    onSubmit: async (values) => {
      const response = await editProfile(values, jwt, user._id)

      if (!response.success) {
        setError(response.message)
      } else {
        router.refresh()
      }
    }
  })

  return (
    <div
      className="flex gap-5 flex-col"
    >
      <p className="text-lg font-bold">
        {formik.values.firstName} {formik.values.lastName}
      </p>
      <ImageUpload image={user.photo} id={user._id} jwt={jwt} />
      <form
      onSubmit={formik.handleSubmit}
      >
        {
          error &&
          <ErrorMessage message={error} />
        }
      <div className="flex gap-6">
        <div className="flex flex-col w-80">
          <label htmlFor="firstName">First name</label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="First name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col w-80">
          <label htmlFor="lastName">Last name</label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col w-80">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          name="email"
          placeholder="Email"
          value={user.email}
          disabled
          // onChange={formik.handleChange}
        />
      </div>
      <div className="flex flex-col w-80">
        <label htmlFor="phone">Phone number</label>
        <Input
          id="phone"
          name="phone"
          placeholder="Phone number"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex flex-col w-80">
        <label htmlFor="companyName">Company name</label>
        <Input
          id="companyName"
          name="companyName"
          placeholder="Company name"
          value={formik.values.companyName}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex justify-between">
        <BackButton />
        <Button className="text-white" type="submit">Save</Button>
      </div>
    </form>
    </div>
  );
}

export default UserForm;