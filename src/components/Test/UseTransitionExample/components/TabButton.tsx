import { useTransition } from 'react';
import Button from "@/components/Button";

export default function TabButton({ 
  action, 
  children, 
  isActive 
}: {
  isActive: boolean;
  children: React.ReactNode;
  action: () => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();
  
  if (isActive) {
    return <b>{children}</b>
  }
  if (isPending) {
    return <b className="text-gray-500">{children}</b>;
  }
  return (
    <Button onClick={() => {
      startTransition(async () => {
        await action();
      });
    }}>
      {children}
    </Button>
  );
}
