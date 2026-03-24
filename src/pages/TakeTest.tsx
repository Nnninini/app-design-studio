import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

const MOCK_QUESTIONS = [
  { id: 1, text: "What is the value of x in 2x + 4 = 10?", options: ["2", "3", "4", "5"] },
  { id: 2, text: "Simplify: 3(x + 2) - x", options: ["2x + 6", "4x + 6", "2x + 2", "3x + 6"] },
  { id: 3, text: "What is 15% of 200?", options: ["25", "30", "35", "20"] },
  { id: 4, text: "Solve: x² = 49", options: ["x = 7", "x = ±7", "x = 49", "x = ±49"] },
  { id: 5, text: "What is the slope of y = 3x + 1?", options: ["1", "3", "-3", "0"] },
];

const TakeTest = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const selectAnswer = (qIdx: number, optIdx: number) => {
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const q = MOCK_QUESTIONS[currentQ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="border-b px-6 py-3 flex items-center justify-between bg-card">
        <h1 className="font-heading font-bold text-foreground">Math Quiz</h1>
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Clock className="h-4 w-4" />
          <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Question navigation sidebar */}
        <aside className="w-20 border-r bg-card p-3 flex flex-col gap-2 overflow-y-auto">
          {MOCK_QUESTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={`h-10 w-full rounded-lg text-sm font-semibold transition-colors ${
                currentQ === i
                  ? "bg-primary text-primary-foreground"
                  : answers[i] !== undefined
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </aside>

        {/* Question area */}
        <main className="flex-1 p-8 flex flex-col">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <p className="text-sm text-muted-foreground mb-2">
              Question {currentQ + 1} of {MOCK_QUESTIONS.length}
            </p>
            <h2 className="text-xl font-semibold text-foreground mb-8">{q.text}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              {q.options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => selectAnswer(currentQ, oIdx)}
                  className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                    answers[currentQ] === oIdx
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      answers[currentQ] === oIdx
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="text-foreground">{opt}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <div className="flex items-center justify-between pt-6 border-t mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
              disabled={currentQ === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>

            {currentQ === MOCK_QUESTIONS.length - 1 ? (
              <Button onClick={() => setShowSubmitDialog(true)}>Submit Test</Button>
            ) : (
              <Button
                onClick={() => setCurrentQ(prev => Math.min(MOCK_QUESTIONS.length - 1, prev + 1))}
                className="gap-2"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </main>
      </div>

      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit test?</AlertDialogTitle>
            <AlertDialogDescription>
              You've answered {Object.keys(answers).length} of {MOCK_QUESTIONS.length} questions.
              Are you sure you want to submit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go Back</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/")}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TakeTest;
