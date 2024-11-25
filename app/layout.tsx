"use client";

import { Montserrat } from "next/font/google";
import { createContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import "./globals.css";

const inter = Montserrat({ subsets: ["latin"] });

export const AuthContext = createContext<{ user: User | null, loading: boolean }>({
  user: null,
  loading: true
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('Auth state changed:', user);
        setUser(user);
        setLoading(false);
      }, (error) => {
        console.error('Auth error:', error);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Firebase initialization error:', error);
      setLoading(false);
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext.Provider value={{ user, loading }}>
          <main className="flex flex-col h-[100dvh] w-full bg-gray-100 py-10 px-5 md:px-10 lg:px-[450px]">
            <div className="flex-1 p-1 w-full overflow-hidden bg-gradient-to-br from-[#EF953F] to-[#567CDD] rounded-[28px] shadow-md shadow-gray-200">
              {children}
            </div>
          </main>
        </AuthContext.Provider>
      </body>
    </html>
  );
}