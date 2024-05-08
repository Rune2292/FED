/** @format */

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
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { EfModel } from "@/types/efModel";

type CreateAccountFormInputs = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNo?: string;
  addresLine1?: string;
  addresLine2?: string;
  zip?: string;
  city?: string;
  country?: string;
  birthDate: Date;
  nationality?: string;
  height: number;
  shoeSize: number;
  hairColor?: string;
  eyeColor?: string;
  comments?: string;
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

  const navigate = useNavigate();

  const role = watch("role");
  const isManager = role === "manager";

  const { toast } = useToast();

  const handleCreateAccount = async (data: CreateAccountFormInputs) => {
    if (data.Password !== data.RepeatPassword) {
      setError("RepeatPassword", {
        type: "mismatch",
        message: "Passwords do not match",
      });
      return;
    }
    if (isManager) {
      const response = await axios.post(
        "http://localhost:7181/api/managers",
        data
      );
      console.log(response);
      console.log("Creating manager account...");
    }
    if (!isManager) {
      const response = await axios.post(
        "http://localhost:7181/api/models",
        data
      );
      console.log(response);
      console.log("Creating model account...");
    }

    toast({
      title: "Account Created",
      description: "Account has been created successfully",
      variant: "default",
      duration: 5000,
    });
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateAccount)}
      className="mx-auto w-4/5"
    >
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>

          <CardDescription>
            Enter your Email, Password, and account type to create a new account
          </CardDescription>
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
        </CardHeader>
        <CardContent>
          <div className="flex gap-8">
            {!isManager && (
              <div className="space-y-2 flex-1">
                <Label htmlFor="Phone number">
                  Phone number<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="Phone number"
                  {...register("phoneNo", { required: true })}
                  placeholder="12345678"
                  required
                  type="phoneNo"
                />
                {errors.phoneNo && (
                  <p className="text-red-500 text-xs">
                    Phone number is required
                  </p>
                )}
                <Label htmlFor="Address line 1">
                  Address line 1<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="Address line 1"
                  {...register("addresLine1", { required: true })}
                  placeholder="Street 1"
                  required
                  type="addresLine1"
                />
                {errors.addresLine1 && (
                  <p className="text-red-500 text-xs">
                    Address line 1 is required
                  </p>
                )}
                <Label htmlFor="Address line 2">Address line 2</Label>
                <Input
                  id="Address line 2"
                  {...register("addresLine2", { required: false })}
                  placeholder="Street 2"
                  type="addresLine2"
                />
                <Label htmlFor="Zip">
                  Zip<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="Zip"
                  {...register("zip", { required: true })}
                  placeholder="Zip"
                  required
                  type="zip"
                />
                {errors.zip && (
                  <p className="text-red-500 text-xs">Zip is required</p>
                )}
                <Label htmlFor="City">
                  City<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="City"
                  {...register("city", { required: true })}
                  placeholder="City"
                  required
                  type="city"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs">City is required</p>
                )}
                <Label htmlFor="Country">
                  Country<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="Country"
                  {...register("country", { required: true })}
                  placeholder="Country"
                  required
                  type="country"
                />
                {errors.country && (
                  <p className="text-red-500 text-xs">Country is required</p>
                )}
                <Label htmlFor="Birth date">
                  Birth date<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="Birth date"
                  {...register("birthDate", { required: true })}
                  type="date"
                />
                {errors.birthDate && (
                  <p className="text-red-500 text-xs">Birth date is required</p>
                )}
                <Label htmlFor="Nationality">
                  Nationality<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="Nationality"
                  {...register("nationality", { required: true })}
                  placeholder="Denmark"
                  required
                  type="nationality"
                />
                {errors.nationality && (
                  <p className="text-red-500 text-xs">
                    Nationality is required
                  </p>
                )}
                <Label htmlFor="Height">
                  Height<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="Height"
                  {...register("height", { required: true })}
                  placeholder="180"
                  required
                  type="height"
                />
                {errors.height && (
                  <p className="text-red-500 text-xs">Height is required</p>
                )}
                <Label htmlFor="Shoe size">
                  Shoe size<span className="text-red-500">*</span>
                </Label>

                <Input
                  id="Shoe size"
                  {...register("shoeSize", { required: true })}
                  placeholder="42"
                  required
                  type="shoeSize"
                />
                {errors.shoeSize && (
                  <p className="text-red-500 text-xs">Shoe size is required</p>
                )}
                <Label htmlFor="Hair color">
                  Hair color<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="Hair color"
                  {...register("hairColor", { required: true })}
                  placeholder="Black"
                  required
                  type="hairColor"
                />
                {errors.hairColor && (
                  <p className="text-red-500 text-xs">Hair color is required</p>
                )}
                <Label htmlFor="Eye color">
                  Eye color<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="Eye color"
                  {...register("eyeColor", { required: true })}
                  placeholder="Brown"
                  required
                  type="eyeColor"
                />
                {errors.eyeColor && (
                  <p className="text-red-500 text-xs">Eye color is required</p>
                )}
                <Label htmlFor="Comments">Comments</Label>
                <Input
                  id="Comments"
                  {...register("comments", { required: false })}
                  placeholder="Comments"
                  type="comments"
                />
                {errors.comments && (
                  <p className="text-red-500 text-xs">Comments is required</p>
                )}
              </div>
            )}
            <div className="flex-1">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="First name">
                        First name<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="first name"
                        {...register("firstName", { required: true })}
                        placeholder="John"
                        required
                        type="firstName"
                      />
                      {errors.firstName && (
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
                        {...register("lastName", { required: true })}
                        placeholder="Smith"
                        required
                        type="lastName"
                      />
                      {errors.lastName && (
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
                    {...register("email", { required: true })}
                    placeholder="Email@mail.dk"
                    required
                    type="email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">Email is required</p>
                  )}
                </div>

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
              </div>
            </div>
          </div>

          <Button className="w-full mt-6" type="submit">
            Create Account
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
