import { useForm } from "react-hook-form";
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
  email: string;
  password: string;
  repeatPassword: string;
  role: string;
};

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateAccountFormInputs>();

  const handleCreateAccount = async (data: CreateAccountFormInputs) => {
    if (data.password !== data.repeatPassword) {
      setError("repeatPassword", {
        type: "mismatch",
        message: "Passwords do not match",
      });
      return;
    }
    console.log("Creating account...");
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateAccount)}
      className="mx-auto max-w-sm"
    >
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle 
          className="text-2xl font-bold">Create Account  
          </CardTitle> 
          <CardDescription>
            Enter your email, password, and account type to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                {...register("email", { required: true })}
                placeholder="Email"
                required
                type="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">Email is required</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password<span className="text-red-500">*</span></Label>
              <Input
                id="password"
                {...register("password", { required: true })}
                type="password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">Password is required</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="repeatPassword">Repeat Password<span className="text-red-500">*</span></Label>
              <Input
                id="repeatPassword"
                {...register("repeatPassword", { required: true })}
                type="password"
              />
              {errors.repeatPassword && (
                <p className="text-red-500 text-xs">{errors.repeatPassword.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role<span className="text-red-500">*</span></Label>
              <Select
                id="role"
                {...register("role", { required: true })}
              >
                <option value="">Select...</option>
                <option value="manager">Manager</option>
                <option value="model">Model</option>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-xs">Role is required</p>
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