import { Request, Response } from "express";
import primavera from "../services/primavera.service";
import { Product } from "../types/products";

const calculateStock = (product: any) =>
  product.materialsItemWarehouses?.reduce(
    (accumulator: number, current: any) => accumulator + current.stockBalance,
    0
  ) || 0;

const calculateUnitPrice = (product: any, sales: any[]) =>
  sales.find((sale) => sale.itemKey === product.itemKey).priceListLines[0]
    .priceAmount.amount;

const getAll = async (_: Request, res: Response) => {
  const token = res.locals.token;

  const sales = await primavera.get("/salescore/salesitems", token);
  const materials = await primavera.get("/materialscore/materialsitems", token);

  const products: Product[] = materials?.map((material: any) => ({
    id: material.itemKey,
    brand: material.brand,
    name: material.description,
    description: material.complementaryDescription,
    stock: calculateStock(material),
    price: calculateUnitPrice(material, sales),
  }));

  return res.json(products);
};

export default { getAll };
