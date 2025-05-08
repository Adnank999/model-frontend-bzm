'use client'
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  step: string | null;
}

export function TextArea({ prompt, setPrompt, onGenerate,step}: TextAreaProps) {
  return (
    <div className="grid grid-cols-8 w-full gap-2">
      <Textarea
        className="col-span-7"
        placeholder="Type your prompt here."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button className="col-span-1" onClick={onGenerate} disabled={step !== "idle" && step !== "done"}>
        Generate Image
      </Button>
    </div>
  );
}
