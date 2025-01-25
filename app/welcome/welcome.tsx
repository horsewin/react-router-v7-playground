import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import umaArai from "./uma-arai.png";

function NextStep() {
  return (
    <div className="flex flex-col space-y-2 mt-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="step1" />
        <Label htmlFor="step1">バックエンドと接続してAPI応答を取得</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="step2" />
        <Label htmlFor="step2">データベースと接続してログイン可能にする</Label>
      </div>
    </div>
  );
}

export function Welcome({ message }: { message?: string }) {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center min-h-0">
        <div className="max-w-[100vw] p-4">
          <img src={umaArai} alt="v2" className="block w-full" />
        </div>
        <div className="max-w-[300px] w-full px-4">
          <nav className="flex flex-col gap-6 rounded-3xl border border-gray-200 p-6">
            <p className="leading-6 text-gray-700 text-center">{message}</p>
            <AlertDialog>
              <AlertDialogTrigger className="w-full mx-auto">
                <Button className="w-full">ログイン</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    おめでとうございます &#x1f389;{" "}
                  </AlertDialogTitle>
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
