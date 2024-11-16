export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  comments: Commentary[];
}

export interface Commentary {
  id: number;
  productId: number;
  description: string;
  date: string;
}

