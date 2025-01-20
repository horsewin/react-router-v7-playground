import { useState } from "react"
import { Heart, Maximize2 } from "lucide-react"
import { Card, CardContent } from "~/components/ui/card"
import { Checkbox } from "~/components/ui/checkbox"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { PetDetailsModal } from "~/components/pet-details-modal"
import { ReservationFormModal } from "~/components/reservation-form"
import type { Pet } from "~/types/pet"

interface PetCardProps {
    pet: Pet
    onToggleCompare: (id: string) => void
    onToggleLike: (id: string) => void
}

export function PetCard({ pet, onToggleCompare, onToggleLike }: PetCardProps) {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
    const formattedPrice = new Intl.NumberFormat("ja-JP").format(pet.price)

    return (
        <Card className="group relative">
            <CardContent className="p-0">
                <div className="relative">
                    <img
                        src={pet.imageUrl}
                        alt={`${pet.breed} - ${pet.gender}`}
                        className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white/80 backdrop-blur-sm"
                            onClick={() => onToggleLike(pet.id)}
                        >
                            <Heart className={pet.likes > 0 ? "fill-current" : ""} />
                            <span>{pet.likes}</span>
                        </Button>
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-bold">{pet.breed}</h3>
                                <span className="text-base">{pet.gender}</span>
                            </div>
                            <p className="text-lg font-bold">¥{formattedPrice}</p>
                        </div>

                        <p className="text-xs text-gray-600">
                            {pet.shop.name}（{pet.shop.location}）
                        </p>
                        <p className="text-xs text-gray-600">{pet.birthDate}生まれ</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-600">お問い合わせ番号</p>
                            <p className="text-xs font-mono">{pet.referenceNumber}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {pet.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={`compare-${pet.id}`}
                            checked={pet.isComparable}
                            onCheckedChange={() => onToggleCompare(pet.id)}
                        />
                        <label
                            htmlFor={`compare-${pet.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            比較する
                        </label>
                    </div>

                    <div className="flex justify-between mt-2">
                        <Button variant="outline" size="sm" onClick={() => setIsDetailsModalOpen(true)}>
                            詳細を見る
                        </Button>
                        <Button size="sm" onClick={() => setIsReservationModalOpen(true)}>
                            見学予約
                        </Button>
                    </div>
                </div>
            </CardContent>

            <PetDetailsModal pet={pet} isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} />

            <ReservationFormModal
                pet={pet}
                isOpen={isReservationModalOpen}
                onClose={() => setIsReservationModalOpen(false)}
            />
        </Card>
    )
}

