import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );
};

export { Loading };
