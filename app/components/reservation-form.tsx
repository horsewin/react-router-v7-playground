import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import type { Pet } from "~/types/pet"

interface ReservationFormModalProps {
    pet: Pet
    isOpen: boolean
    onClose: () => void
}

export function ReservationFormModal({ pet, isOpen, onClose }: ReservationFormModalProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
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
                }),
            })
            if (response.ok) {
                alert("予約が完了しました。")
                onClose()
            } else {
                throw new Error("予約に失敗しました。")
            }
        } catch (error) {
            console.error("Error:", error)
            alert("予約に失敗しました。もう一度お試しください。")
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{pet.name} の見学予約</DialogTitle>
                    <DialogDescription>以下のフォームに必要事項を入力してください。</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            お名前
                        </Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
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
                            required
                        />
                    </div>
                    <Button type="submit" className="ml-auto">
                        予約する
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

