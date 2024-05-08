import LoginForm from "./login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-between items-center w-screen h-screen">
      <header className="w-full text-center py-4 bg-blue-500 text-white text-3xl font-bold">
        Er du Model? 😍
      </header>
      <div className="flex flex-col justify-center items-center flex-grow">
        <LoginForm />
      </div>
      <footer className="w-full text-center py-2 text-sm">
        © 2024 ModelManagement™
      </footer>
    </div>
  );
}
