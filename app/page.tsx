"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"
import axios from  'axios'
import {  useSetRecoilState } from "recoil";
import { signoutstate } from "./atoms";


interface SignUpFormInputs {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm(): JSX.Element {
  const router = useRouter();
  const {toast } = useToast();
  const  setSignState = useSetRecoilState(signoutstate)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {

    try {
      const response = await axios.post('https://kanban-todo-backend.onrender.com/api/v1/user/signup', {
          username: data.username,
          password: data.password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Token stored:', token);
      
      console.log('Response:', response.data);

      toast({
        description:"Sign Up Success",
        duration: 5000
      });
      setSignState(true)
      router.push("/tasklist")
  } catch (error) {
      console.error('Error during signup:', error);
  }
    console.log(data);
  };

  const signinClickHandler = (): void => {
    router.push('/signin'); 
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="p-8 border rounded shadow-lg bg-white w-full max-w-xs md:w-3/12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-2"
        >
          <div className="font-bold bg-black-600 flex justify-center ">
            <h3>Sign Up</h3>
          </div>
          <div className="flex justify-center  ">
            <Input
              unusedproperty=""
              type="email"
              placeholder="Email"
              {...register("username", { required: "Email is required" })}
              className="w-full"
            />
          </div>
          <div className="flex justify-center">
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>
          <div className="flex justify-center">
            <Input
            unusedproperty=""
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full"
            />
          </div>
          <div className="flex justify-center">
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="flex justify-center">
            <Input
            unusedproperty=""
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              className="w-full"
            />
          </div>
          <div className="flex justify-center">
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="justify-center w-9/12">
              Sign Up
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <p className="text-xs">Already have an account?</p>
          <Button variant="link" className="underline text-xs" onClick={signinClickHandler}>Sign in</Button>
        </div>
      </div>
    </div>
  );
}