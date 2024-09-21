"use client"
import ButtonTaskList from '@/components/buttons_taskList';
// app/signin/layout.tsx
import React from 'react';

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <ButtonTaskList/>
      </div>
      {children}
    </div>
  );
}