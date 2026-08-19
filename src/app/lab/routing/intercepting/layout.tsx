import type { ReactNode } from "react";

export default function InterceptingLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div className="space-y-4">
      {children}
      {modal}
    </div>
  );
}
