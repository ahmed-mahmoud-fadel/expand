"use client"

import { useFormik } from "formik";
import * as yup from 'yup'
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import endpoints from "@/global/endpoints";
import { useState } from "react";
import { useRouter } from "next/navigation";
import signup from "@/actions/signup";
import login from "@/actions/login";
import { setCookie } from "@/global/cookie";

const SignupForm = () => {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      companyName: "",
      email: "",
      password: "",
      confPassword: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required().trim().label("First name"),
      lastName: yup.string().required().trim().label("Last name"),
      username: yup.string().required().trim().label("Username"),
      companyName: yup.string().required().trim().label("Comapny name"),
      email: yup.string().email().required().label("Company email"),
      password: yup.string().required().label("Password").min(8),
      confPassword: yup.string().required().label("Confirm password"),
    }),
    validate: (values) => {
      if (values.password !== values.confPassword)
      return {
        confPassword: "Password does not match."
      }
    },
    onSubmit: async (values) => {
      const signupResopnse = await signup(values)

      if (!signupResopnse.success) {
        setError(signupResopnse.message)
        return
      }

      const loginResponse = await login({
        email: values.email,
        password: values.password,
      })

      if (!loginResponse.valid) {
        setError(loginResponse.message)
        return 
      }

      setCookie("jwt", loginResponse.data.token, { expires: loginResponse.data.exp, path: "/" })
      setCookie("id", loginResponse.data.id, { expires: loginResponse.data.exp, path: "/" })

      router.push('/dashboard')
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <Card className="p-4 flex flex-col items-center gap-3">
        <div className="flex flex-col gap-1 w-full">
          <Input
            placeholder="First name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            name="firstName"
            id="firstName"
            type="text"
          />
          {
            formik.errors.firstName && formik.touched.firstName &&
            <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
          }
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Input
            placeholder="Last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            name="lastName"
            id="lastName"
            type="text"
          />
          {
            formik.errors.lastName && formik.touched.lastName &&
            <p className="text-red-500 text-sm w-full">{formik.errors.lastName}</p>
          }
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Input
            placeholder="Company name"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            name="companyName"
            id="companyName"
            type="text"
          />
          {
            formik.errors.lastName && formik.touched.companyName &&
            <p className="text-red-500 text-sm w-full">{formik.errors.companyName}</p>
          }
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Input
            placeholder="Company email"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            id="email"
            type="email"
          />
          {
            formik.errors.email && formik.touched.email &&
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          }
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Input
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            name="username"
            id="username"
            type="text"
          />
          {
            formik.errors.email && formik.touched.username &&
            <p className="text-red-500 text-sm">{formik.errors.username}</p>
          }
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Input
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            id="password"
            type="password"
          />
          {
            formik.errors.password && formik.touched.password &&
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          }
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Input
            placeholder="Confirm password"
            value={formik.values.confPassword}
            onChange={formik.handleChange}
            name="confPassword"
            id="confPassword"
            type="password"
          />
          {
            formik.errors.confPassword && formik.touched.confPassword &&
            <p className="text-red-500 text-sm">{formik.errors.confPassword}</p>
          }
        </div>
        {
          error && 
          <p className="text-red-500 text-sm">{error}</p>
        }
        <Button type="submit" className="text-white w-full">Sign up</Button>
      </Card>
    </form>
  );
}
 
export default SignupForm;


// TODO:

// 1. COMPANY_ID
// 2. Strong password validation