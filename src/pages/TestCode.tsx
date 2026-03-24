import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

const TestCode = () => {
  const navigate = useNavigate();
  const [testCode, setTestCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to test (future page)
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm text-center"
      >
        <button onClick={() => navigate("/login/student")} className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Enter Test Code</h1>
        <p className="text-muted-foreground mb-8">Ask your teacher for the code</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2 text-left">
            <Label htmlFor="testCode">Test Code</Label>
            <Input id="testCode" placeholder="e.g. ABC-1234" className="text-center text-lg tracking-widest" value={testCode} onChange={e => setTestCode(e.target.value)} required />
          </div>
          <Button type="submit" size="lg" className="w-full text-base py-6">
            Enter
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default TestCode;
