import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Mail, BookOpen } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("Teacher Name");
  const [email, setEmail] = useState("teacher@school.com");
  const [subject, setSubject] = useState("Mathematics");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-heading text-xl font-bold text-foreground">Profile</h1>
      </header>

      <main className="max-w-lg mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <Button variant="outline" size="sm">Change Avatar</Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" /> Name
              </Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" /> Email
              </Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" /> Subject
              </Label>
              <Input id="subject" value={subject} onChange={e => setSubject(e.target.value)} />
            </div>
          </div>

          <Button className="w-full" size="lg">Save Changes</Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
