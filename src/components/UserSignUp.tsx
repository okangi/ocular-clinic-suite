import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function UserSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("receptionist");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = ["admin", "optometrist", "technician", "receptionist"];

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: role,
          },
        },
      });

     if (signUpError) {
      console.error(signUpError);
      setError(signUpError?.message || "Sign up failed. Please try again.");
      setLoading(false);
      return;
    }
     if (data?.user) {
       setSuccess(true);
       setEmail("");
       setPassword("");
       setFirstName("");
       setLastName("");
       setRole("receptionist");
    }
    } catch (err) {
      setError("Unexpected error occurred during sign up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4 max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold">Sign Up New User</h2>
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">User signed up successfully! Please check your email to confirm.</p>}
      <div>
        <label htmlFor="email" className="block font-medium">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label htmlFor="password" className="block font-medium">Password</label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label htmlFor="firstName" className="block font-medium">First Name</label>
        <input
          id="firstName"
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block font-medium">Last Name</label>
        <input
          id="lastName"
          type="text"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label htmlFor="role" className="block font-medium">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          {roles.map((r) => (
            <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
}
