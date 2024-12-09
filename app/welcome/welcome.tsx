import umaAraiOld from "./uma-arai-old.png";
import {Button} from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import React from "react";
import { Checkbox } from "~/components/ui/checkbox"
import { Label } from "~/components/ui/label"

function NextStep() {
  return (
      <div className="flex flex-col space-y-2 mt-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="step1"/>
          <Label htmlFor="step1">バックエンドと接続してAPI応答を取得</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="step2"/>
          <Label htmlFor="step2">データベースと接続してログイン可能にする</Label>
        </div>
      </div>
  )
}


export function Welcome({message}: { message?: string }) {
  return (
      <main className="flex items-center justify-center pt-16 pb-4">
        <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={umaAraiOld}
              alt="v2"
              className="block w-full"
            />
            {/* <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            /> */}
          </div>
        </header>
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 space-y-4">
            <p className="leading-6 text-gray-700 text-center">{message}</p>
            <AlertDialog>
              <AlertDialogTrigger><Button className="w-full mx-auto">ログイン</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>おめでとうございます &#x1f389; </AlertDialogTitle>
                  <AlertDialogDescription>
                    ここまで無事うごきましたか？引き続きハンズオンを進めてみましょう。
                    <NextStep />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>閉じる</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </nav>
        </div>
      </div>
    </main>
  );
}
