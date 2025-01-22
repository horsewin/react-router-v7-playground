export interface Pet {
  id: string;
  name: string;
  color: string;
  breed: string;
  gender: "Female" | "Male";
  price: number;
  imageUrl: string;
  likes: number;
  // TODO: マッピングが必要
  shop: {
    name: string;
    location: string;
  };
  birthDate: string;
  referenceNumber: string;
  tags: string[];
}
