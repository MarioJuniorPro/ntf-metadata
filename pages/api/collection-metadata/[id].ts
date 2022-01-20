// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Chance from 'chance';

type Data = {
  image: string;
  name: string;
  description: string;
  external_link: string;
  seller_fee_basis_points: number;
  fee_recipient: string;
  id: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const host = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT ?? 3000}`
  const [idParam] = `${req.query.id}`.split('.');
  const id = Number(idParam);
  const chance = new Chance(id);

  const params = Object.assign({}, {
    image: `https://avatars.dicebear.com/api/personas/${id}.svg`,
    name: `${chance.animal({ type: 'pet' })} Collection`,
    description: chance.paragraph(),
    external_link: `${host}/api/collection-metadata/${id}`,
    seller_fee_basis_points: 250, //Indicates a 2.5% seller fee.
    fee_recipient: "0x0000000000000000000000000000000000000000"
  }, req.query, { id });

  const metadata: Data = {
    ...params,
    seller_fee_basis_points: Number(params.seller_fee_basis_points)
  };
  res.status(200).json(metadata);
}
