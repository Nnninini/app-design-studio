import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Plus } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-2">
          <span className="inline-block rounded-full bg-primary/10 p-4 mb-4">
            <BookOpen className="h-10 w-10 text-primary" />
          </span>
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground mb-2">
          QuizFlow
        </h1>
        <p className="text-muted-foreground mb-10 text-lg">
          The smarter way to learn & teach
        </p>

        <div className="flex gap-4 justify-center mb-6">
          <Button
            size="lg"
            className="flex-1 gap-2 text-base py-6"
            onClick={() => navigate("/login/student")}
          >
            <GraduationCap className="h-5 w-5" />
            Student
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 gap-2 text-base py-6"
            onClick={() => navigate("/login/teacher")}
          >
            <BookOpen className="h-5 w-5" />
            Teacher
          </Button>
        </div>

        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground"
          onClick={() => navigate("/create-account")}
        >
          <Plus className="h-4 w-4" />
          Create Account
        </Button>
      </motion.div>
    </div>
  );
};

export default Index;
