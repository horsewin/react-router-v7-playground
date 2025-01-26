import { Heart } from "lucide-react";
import { useState } from "react";
import { PetDetailsModal } from "~/components/pet-details-modal";
import { ReservationFormModal } from "~/components/reservation-form";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import type { Pet } from "~/types/pet";

interface PetCardProps {
  pet: Pet;
  onToggleLike: (id: string) => void;
}

export function PetCard({ pet, onToggleLike }: PetCardProps) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const formattedPrice = new Intl.NumberFormat("ja-JP").format(pet.price);

  return (
    <TooltipProvider>
      <Card className="group relative">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="relative overflow-hidden">
            <img
              src={pet.imageUrl || "/placeholder.svg"}
              alt={`${pet.breed} - ${pet.gender}`}
              className="w-full h-40 object-cover rounded-t-lg img-hover-ease-in-out-110"
            />
            <ImageHoverEffect />
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

          <div className="flex-grow p-4 space-y-4">
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

              <div className="flex flex-wrap gap-2 ">
                {pet.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 hover:bg-orange-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-2 p-4 pt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDetailsModalOpen(true)}
              className="w-full lg:w-auto"
            >
              詳細を見る
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  onClick={() => setIsReservationModalOpen(true)}
                  className="w-full lg:w-auto"
                >
                  見学予約
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs text-gray-600">
                  この子の見学予約フォームが表示されます
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>

        <PetDetailsModal
          pet={pet}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        />

        <ReservationFormModal
          pet={pet}
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
        />
      </Card>
    </TooltipProvider>
  );
}

// 親コンポーネントに薄い黒のエフェクトをかけるコンポーネント
const ImageHoverEffect = () => (
  <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
);
