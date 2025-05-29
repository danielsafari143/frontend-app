import React, { useState, createContext, useContext } from "react";

interface TabsContextProps {
  value: string;
  setValue: (value: string) => void;
}
const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export function Tabs({ defaultValue, className = "", children }: { defaultValue: string; className?: string; children: React.ReactNode }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, className = "", children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs");
  const isActive = ctx.value === value;
  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${isActive ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700 hover:bg-gray-50"} ${className}`}
      onClick={() => ctx.setValue(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within Tabs");
  if (ctx.value !== value) return null;
  return <div className="mt-4">{children}</div>;
} 