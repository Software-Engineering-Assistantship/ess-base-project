import prisma from "../database";
import { Prisma } from "@prisma/client";

async function seed() {
  const user = await prisma.user.create({
    data: {
      name: 'Ric',
      phone: '81999999999',
      cpf: '11111111111',
      email: 'ric@ric.com',
      password: '123456'
    }
  });

  const itemsToCreate: Prisma.ItemCreateInput[] = [
    {
      name: 'Blusa1',
      description: 'Cadeira de escritório',
      category: 'Blusa',
      price: 50,
      image: 'https://www.google.com.br',
      colors: 'Azul, Vermelho, Preto',
      sizes: 'P, M, G',
      amount: 10,
    },
    {
      name: 'Blusa2',
      description: 'Cadeira de escritório',
      category: 'Blusa',
      price: 50,
      image: 'https://www.google.com.br',
      colors: 'Azul, Vermelho, Preto',
      sizes: 'P, M, G',
      amount: 10,
    },
    {
      name: 'Blusa3',
      description: 'Cadeira de escritório',
      category: 'Blusa',
      price: 50,
      image: 'https://www.google.com.br',
      colors: 'Azul, Vermelho, Preto',
      sizes: 'P, M, G',
      amount: 10,
    },
  ]

  const itemsId: number[] = [];

  itemsToCreate.forEach(async (item) => {
    const createdItem = await prisma.item.create({
      data: item
    });

    itemsId.push(createdItem.id);
  });

  const deliveries: Prisma.DeliveryCreateInput[] = [
    {
      item: {
        connect: [{ id: itemsId[0] }, { id: itemsId[1] }]
      }
    },
    {
      item: {
        connect: [{ id: itemsId[2] }]
      }
    },
    {
      item: {
        connect: itemsId.map((id) => ({ id }))
      }
    }
  ];

  const deliveriesId: number[] = [];

  deliveries.forEach(async (delivery) => {
    const createdDelivery = await prisma.delivery.create({
      data: delivery
    });

    deliveriesId.push(createdDelivery.id);
  });

  const rating = prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Muito bom',
      item: {
        connect: { id: itemsId[0] }
      },
      delivery: {
        connect: { id: deliveriesId[0] }
      },
    },
  });
  
  const deliveryPerson = await prisma.deliveryPerson.create({
    data: {
      name: 'João',
      cpf: '22222222222',
      phone: '81999999999',
      email: 'joao@joao.root.com',
      status: 'active',
      address: {
        create: {
          postalCode: '50740-560',
          street: 'Av. Jornalista Aníbal Fernandes',
          number: 's/n',
          district: 'Cidade Universitária',
          city: 'Recife',
          state: 'PE',
        }
      }
    },
  });

  await prisma.delivery.update({
    where: { id: deliveriesId[0] },
    data: {
      deliveryPerson: {
        connect: { id: deliveryPerson.id }
      }
    }
  });

  const notification = await prisma.notification.create({
    data: {
      category: 'new-delivery',
      title: `Nova entrega ${deliveriesId[0]} solicitada`,
      deliveryId: deliveriesId[0]
    },
  });

  await prisma.cupom.create({
    data: {
      name: 'CUPOM10',
      discount: '0,9',
      start_date: new Date('2023-03-01').toISOString(),
      end_date: new Date('2023-03-31').toISOString(),
    }
  });
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })