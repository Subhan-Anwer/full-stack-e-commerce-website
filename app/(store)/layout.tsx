import type { Metadata } from "next";

import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "../../components/Header"
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftmode } from "@/components/DisableDraftmode";

export const metadata: Metadata = {
  title: "Shopit ",
  description: "Developed by Subhan Anwer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className="min-h-screen">
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftmode />
              <VisualEditing />
            </>
          )}
          <main>
            <Header />
            {children}
          </main>

          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
