import { useForm } from "react-hook-form";
import axios from "axios";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

type CreateAccountFormInputs = {
  FirstName: string;
  LastName: string;
  PhoneNo: string;
  Email: string;
  Password: string;
  RepeatPassword: string;
  role: string;
  IsManager: boolean;
};

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<CreateAccountFormInputs>();

  const role = watch("role");
  const isManager = role === "manager";

  const handleCreateAccount = async (data: CreateAccountFormInputs) => {
    if (data.Password !== data.RepeatPassword) {
      setError("RepeatPassword", {
        type: "mismatch",
        message: "Passwords do not match",
      });
      return;
    }
    data.IsManager = isManager;
    const response = await axios.post(
      "http://localhost:7181/api/account/create",
      data
    );
    console.log("Creating account...");
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateAccount)}
      className="mx-auto max-w-sm"
    >
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Enter your Email, Password, and account type to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">
                Role<span className="text-red-500">*</span>
              </Label>
              <Select id="role" {...register("role", { required: true })}>
                <option value="model">Model</option>
                <option value="manager">Manager</option>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-xs">Role is required</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="First name">
                    First name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="First name"
                    {...register("FirstName", { required: true })}
                    placeholder="John"
                    required
                    type="FirstName"
                  />
                  {errors.FirstName && (
                    <p className="text-red-500 text-xs">
                      First name is required
                    </p>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="Last name">
                    Last name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="Last name"
                    {...register("LastName", { required: true })}
                    placeholder="Smith"
                    required
                    type="LastName"
                  />
                  {errors.LastName && (
                    <p className="text-red-500 text-xs">
                      Last name is required
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="Email">
                Email<span className="text-red-500">*</span>
              </Label>
              <Input
                id="Email"
                {...register("Email", { required: true })}
                placeholder="Email"
                required
                type="Email"
              />
              {errors.Email && (
                <p className="text-red-500 text-xs">Email is required</p>
              )}
            </div>

            {!isManager && (
              <div className="space-y-2">
                <Label htmlFor="PhoneNo">
                  Phone Number<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="PhoneNo"
                  {...register("PhoneNo", { required: true })}
                  placeholder="Phone Number"
                  required
                  type="PhoneNo"
                />
                {errors.PhoneNo && (
                  <p className="text-red-500 text-xs">
                    Phone Number is required
                  </p>
                )}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="Password">
                Password<span className="text-red-500">*</span>
              </Label>
              <Input
                id="Password"
                {...register("Password", { required: true })}
                type="Password"
              />
              {errors.Password && (
                <p className="text-red-500 text-xs">Password is required</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="RepeatPassword">
                Repeat Password<span className="text-red-500">*</span>
              </Label>
              <Input
                id="RepeatPassword"
                {...register("RepeatPassword", { required: true })}
                type="Password"
              />
              {errors.RepeatPassword && (
                <p className="text-red-500 text-xs">
                  {errors.RepeatPassword.message}
                </p>
              )}
            </div>

            <Button className="w-full" type="submit">
              Create Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
