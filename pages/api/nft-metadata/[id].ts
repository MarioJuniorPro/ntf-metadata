// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Chance from 'chance';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const host = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT ?? 3000}`
  const [idParam] = `${req.query.id}`.split('.');
  const id = Number(idParam);

  const chance = new Chance(id);

  // faker.seed(id);
  const avatar = `https://avatars.dicebear.com/api/personas/${id}.svg`;

  const metadata = {
    description: chance.sentence({ words: 10 }),
    external_url: `${host}/api/nft-metadata/${id}.json`,
    image: avatar,
    name: chance.name(),
    attributes: [
      {
        trait_type: 'Base',
        value: 'Starfish',
      },
      {
        trait_type: 'Eyes',
        value: 'Big',
      },
      {
        trait_type: 'Mouth',
        value: 'Surprised',
      },
      {
        trait_type: 'Level',
        value: 5,
      },
      {
        trait_type: 'Stamina',
        value: 1.4,
      },
      {
        trait_type: 'Personality',
        value: 'Sad',
      },
      {
        display_type: 'boost_number',
        trait_type: 'Aqua Power',
        value: 40,
      },
      {
        display_type: 'boost_percentage',
        trait_type: 'Stamina Increase',
        value: 10,
      },
      {
        display_type: 'number',
        trait_type: 'Generation',
        value: 2,
      },
    ],
  };
  res.status(200).json(metadata);
}
