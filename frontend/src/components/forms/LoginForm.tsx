"use client"

import { useFormik } from "formik";
import * as yup from 'yup'
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "@/global/cookie";
import login from "@/actions/login";
import Link from "next/link";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required().label("Email"),
      password: yup.string().required().label("Password"),
    }),
    onSubmit: async (values) => {
      const response = await login(values)

      if (!response.valid) {
        setError(response.message)
      } else {
        setCookie("jwt", response.data.token, { expires: response.data.exp, path: "/" })
        setCookie("id", response.data.id, { expires: response.data.exp, path: "/" })

        router.push('/dashboard')
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <Card className="p-4 flex flex-col items-center gap-3">
        <div className="flex flex-col gap-1 w-full">
          <Input  
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            id="email"
            type="text"
          />
          {
            formik.errors.email && formik.touched.email &&
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
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
        {
          error && 
          <p className="text-red-500 text-sm">{error}</p>
        }
        <Button type="submit" className="text-white w-full">Log in</Button>
        <div className="py-5 flex gap-1">
          Don&apos;t have an account?
          <Link href="/signup" className="text-primary">Create an account now</Link>
        </div>
      </Card>
    </form>
  );
}
 
export default LoginForm;