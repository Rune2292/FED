import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuthStore } from '@/state/authStore'; 

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors }} = useForm<LoginFormInputs>();
  const setToken = useAuthStore(state => state.setToken);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post("http://localhost:7181/api/account/login", data);
      console.log("Token received: ", response.data.JWT);
      setToken(response.data.JWT);  // Store token in Zustand store
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-sm">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email", { required: true })} placeholder="ViErSeje@example.com" required type="email" />
              {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" {...register("password", { required: true })} type="password" />
              {errors.password && <p className="text-red-500 text-xs">Password is required</p>}
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
