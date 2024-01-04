import { Request, Response } from "express";
import primavera from "../services/primavera.service";
import { Customer } from "../types/customer";

export const isValidCustomer = (customer?: Customer) => {
  if (!customer) return false;

  return Object.values(customer).every(Boolean);
};

export const getCustomerByTaxId = async (taxId: number, token: string) => {
  try {
    return await primavera.get(`/salescore/customerParties/${taxId}`, token);
  } catch {
    return null;
  }
};

export const createCustomer = async (customer: Customer, token: string) => {
  try {
    return await primavera.post(
      `/salescore/customerParties`,
      {
        partyKey: customer.taxId,
        name: customer.name,
        isExternallyManaged: false,
        currency: "EUR",
        isPerson: true,
        country: "PT",
        companyTaxID: customer.taxId,
        electronicMail: customer.email,
        telephone: customer.phone,
        streetName: customer.street,
        buildingNumber: customer.door,
        postalZone: customer.postal_code,
        cityName: customer.city,
      },
      token
    );
  } catch (e: any) {
    console.log(e.response.data);
    return null;
  }
};

export const getOrCreateCustomer = async (
  customer: Customer,
  token: string
): Promise<any> =>
  (await getCustomerByTaxId(customer.taxId, token)) ||
  (await createCustomer(customer, token));

const getAll = async (_: Request, res: Response) => {
  const token = res.locals.token;

  const response = await primavera.get("/salesCore/customerParties", token);

  return res.json(response);
};

const create = async (req: Request, res: Response) => {
  const token = res.locals.token;
  const { body } = req;

  if (!isValidCustomer(body.customer)) {
    return res.status(400).json("Invalid customer provided");
  }

  const customer = await getOrCreateCustomer(body.customer, token);

  if (!customer) {
    return res.status(400).json("Failed to create customer");
  }

  return res.json(req.body);
};

export default { getAll, create };
