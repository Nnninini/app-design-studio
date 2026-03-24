import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", studentCode: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/test-code");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <button onClick={() => navigate("/")} className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Student Login</h1>
        <p className="text-muted-foreground mb-8">Enter your details to continue</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="Enter first name" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Enter last name" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentCode">Student Code</Label>
            <Input id="studentCode" placeholder="Enter student code" value={form.studentCode} onChange={e => setForm({...form, studentCode: e.target.value})} required />
          </div>
          <Button type="submit" size="lg" className="w-full text-base py-6">
            Enter
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
