"use client";

import { ReactNode, useEffect, useState } from "react";
import Header from "./header";

type BaseLayoutProps = {
  children: ReactNode;
};

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b">
      {/* 헤더 영역 */}
      <Header />

      {/* 콘텐츠 영역 */}
      <main className="flex justify-center items-center pt-20 p-6">
        {children}
      </main>
    </div>
  );
};
