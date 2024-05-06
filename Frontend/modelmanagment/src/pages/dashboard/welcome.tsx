
import { useAuthStore } from "@/state/authStore";
import React from "react";



// Decode the JWT to display welcome message!

export const Welcome = () => {
  const token = useAuthStore(state => state.getToken());
  const [email, setEmail] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      console.log(decoded);
      setEmail(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
    }
  }, [token]);

  return (
    <div>
      <h1>Welcome, {email}!</h1>
    </div>
  );
};