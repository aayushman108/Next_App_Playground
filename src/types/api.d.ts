declare namespace Api {
  type IProduct = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: ICategory;
    images: string[];
  };
  interface ICategory {
    id: number;
    name: string;
    image: string;
  }
}
