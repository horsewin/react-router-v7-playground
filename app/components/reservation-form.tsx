import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Pet } from "~/types/pet";

interface ReservationFormModalProps {
  pet: Pet;
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationFormModal({
  pet,
  isOpen,
  onClose,
}: ReservationFormModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(
    new Date()
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replaceAll("/", ""),
  );
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    date: "",
  });

  const validateForm = () => {
    console.log("validateForm");
    let isValid = true;
    const newErrors = { name: "", email: "", date: "" };

    if (!name.trim()) {
      newErrors.name = "氏名は必須です";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "メールアドレスは必須です";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
      isValid = false;
    }

    if (!date) {
      newErrors.date = "見学予定日時は必須です";
      isValid = false;
    } else if (new Date(date) < new Date()) {
      newErrors.date = "過去の日時は選択できません";
      isValid = false;
    }
    // yyyymmdd形式になっているか
    else if (!/^\d{8}$/.test(date)) {
      newErrors.date =
        "日時の形式が正しくありません。20250101のように入力してください";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petId: pet.id,
          name,
          email,
          reservationDatetime: date,
        }),
      });
      if (response.ok) {
        alert("予約が完了しました。");
        onClose();
      } else {
        throw new Error("予約に失敗しました。");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("予約に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{pet.name} の見学予約</DialogTitle>
          <DialogDescription>
            以下のフォームに必要事項を入力してください。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              お名前
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
            {errors.name && (
              <p className="text-red-500 text-sm col-start-2 col-span-3">
                {errors.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              メールアドレス
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
            {errors.email && (
              <p className="text-red-500 text-sm col-start-2 col-span-3">
                {errors.email}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">見学予定日時</Label>
            <Input
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="col-span-3"
            />
            {errors.date && (
              <p className="text-red-500 text-sm col-start-2 col-span-3">
                {errors.date}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit">予約する</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
