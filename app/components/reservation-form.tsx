import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
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
  const [date, setDate] = useState<Date>();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    date: "",
  });

  const validateForm = () => {
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
          reservationDatetime: date?.toISOString(),
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
              required
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm col-start-2 col-span-3">
              {errors.name}
            </p>
          )}

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
              required
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm col-start-2 col-span-3">
              {errors.email}
            </p>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">見学予定日時</Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP", { locale: ja })
                    ) : (
                      <span>日付を選択</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {errors.date && (
            <p className="text-red-500 text-sm col-start-2 col-span-3">
              {errors.date}
            </p>
          )}

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
