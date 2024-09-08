import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Categories
  const restaurantCategory = await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Restaurant",
    },
  });

  const prayerRoomCategory = await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Prayer Room",
    },
  });

  const tourismCategory = await prisma.category.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Tourism",
    },
  });

  const muslimCommunityCategory = await prisma.category.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Muslim Community",
    },
  });

  // Create Contacts and Sites for Restaurant
  const restaurant1Contact = await prisma.contact.create({
    data: {
      name: "Chang's Beef Noodles (Halal Certified)",
      address: "No. 123, Sec 1, Taipei City",
      phone: "0912345678",
    },
  });

  const restaurant2Contact = await prisma.contact.create({
    data: {
      name: "Safranbolu Turkish Restaurant",
      address: "No. 456, Sec 2, Taipei City",
      phone: "0912345679",
    },
  });

  const restaurant3Contact = await prisma.contact.create({
    data: {
      name: "Halal Chinese Beef Noodle",
      address: "No. 789, Sec 3, Taipei City",
      phone: "0912345680",
    },
  });

  await prisma.site.createMany({
    data: [
      {
        name: "Chang's Beef Noodles (Halal Certified)",
        description:
          "Famous Halal-certified beef noodle restaurant offering traditional Chinese dishes.",
        categoryId: restaurantCategory.id,
        contactId: restaurant1Contact.id,
      },
      {
        name: "Safranbolu Turkish Restaurant",
        description:
          "Authentic Turkish cuisine with Halal certification in the heart of Taipei.",
        categoryId: restaurantCategory.id,
        contactId: restaurant2Contact.id,
      },
      {
        name: "Halal Chinese Beef Noodle",
        description:
          "A Halal-certified Chinese restaurant offering a range of local Taiwanese beef noodle dishes.",
        categoryId: restaurantCategory.id,
        contactId: restaurant3Contact.id,
      },
    ],
  });

  // Create Contacts and Sites for Prayer Room
  const prayerRoom1Contact = await prisma.contact.create({
    data: {
      name: "Taipei Main Station Prayer Room",
      address: "Taipei Main Station, Taipei City",
      phone: "0912345681",
    },
  });

  const prayerRoom2Contact = await prisma.contact.create({
    data: {
      name: "Taipei Grand Mosque",
      address: "No. 62, Section 2, Xinsheng S Rd, Da’an District, Taipei City",
      phone: "0912345682",
    },
  });

  const prayerRoom3Contact = await prisma.contact.create({
    data: {
      name: "National Taiwan University Hospital Prayer Room",
      address: "No. 7, Zhongshan S Rd, Zhongzheng District, Taipei City",
      phone: "0912345683",
    },
  });

  await prisma.site.createMany({
    data: [
      {
        name: "Taipei Main Station Prayer Room",
        description:
          "A clean and accessible prayer room located inside Taipei Main Station for Muslim travelers.",
        categoryId: prayerRoomCategory.id,
        contactId: prayerRoom1Contact.id,
      },
      {
        name: "Taipei Grand Mosque",
        description:
          "Taiwan’s largest mosque, open for prayers and religious gatherings for the Muslim community.",
        categoryId: prayerRoomCategory.id,
        contactId: prayerRoom2Contact.id,
      },
      {
        name: "National Taiwan University Hospital Prayer Room",
        description:
          "A prayer room located within the hospital grounds for patients, visitors, and staff.",
        categoryId: prayerRoomCategory.id,
        contactId: prayerRoom3Contact.id,
      },
    ],
  });

  // Create Contacts and Sites for Tourism
  const tourism1Contact = await prisma.contact.create({
    data: {
      name: "Taipei 101 (Halal Restaurants Nearby)",
      address: "No. 7, Sec 5, Xinyi Rd, Xinyi District, Taipei City",
      phone: "0912345684",
    },
  });

  const tourism2Contact = await prisma.contact.create({
    data: {
      name: "Chiang Kai-shek Memorial Hall (Prayer Space Available)",
      address: "No. 21, Zhongshan S Rd, Zhongzheng District, Taipei City",
      phone: "0912345685",
    },
  });

  const tourism3Contact = await prisma.contact.create({
    data: {
      name: "Elephant Mountain Hiking Trail (Halal Snacks Available)",
      address: "Xinyi District, Taipei City",
      phone: "0912345686",
    },
  });

  await prisma.site.createMany({
    data: [
      {
        name: "Taipei 101 (Halal Restaurants Nearby)",
        description:
          "The famous Taipei 101 building with Halal restaurants and amenities for Muslim tourists nearby.",
        categoryId: tourismCategory.id,
        contactId: tourism1Contact.id,
      },
      {
        name: "Chiang Kai-shek Memorial Hall (Prayer Space Available)",
        description:
          "A famous historical landmark with designated prayer spaces for Muslim visitors.",
        categoryId: tourismCategory.id,
        contactId: tourism2Contact.id,
      },
      {
        name: "Elephant Mountain Hiking Trail (Halal Snacks Available)",
        description:
          "Popular hiking trail with scenic views and Halal snacks available for Muslim travelers.",
        categoryId: tourismCategory.id,
        contactId: tourism3Contact.id,
      },
    ],
  });

  // Create Contacts and Sites for Muslim Community
  const community1Contact = await prisma.contact.create({
    data: {
      name: "Taipei Grand Mosque Community",
      address: "No. 62, Section 2, Xinsheng S Rd, Da’an District, Taipei City",
      phone: "0912345687",
    },
  });

  const community2Contact = await prisma.contact.create({
    data: {
      name: "Taiwan Halal Integrity Development Association",
      address: "No. 15, Alley 5, Lane 36, Taipei City",
      phone: "0912345688",
    },
  });

  const community3Contact = await prisma.contact.create({
    data: {
      name: "PCIM Taiwan / PCINU Taiwan",
      address: "No. 123, Community St, Taipei City",
      phone: "0912345689",
    },
  });

  await prisma.site.createMany({
    data: [
      {
        name: "Taipei Grand Mosque Community",
        description:
          "The main community hub for Muslims in Taipei, organizing events and services.",
        categoryId: muslimCommunityCategory.id,
        contactId: community1Contact.id,
      },
      {
        name: "Taiwan Halal Integrity Development Association",
        description:
          "An organization supporting Halal integrity and certification services across Taiwan.",
        categoryId: muslimCommunityCategory.id,
        contactId: community2Contact.id,
      },
      {
        name: "PCIM Taiwan / PCINU Taiwan",
        description:
          "A community group for Muslims living in Taiwan, focusing on social and religious activities.",
        categoryId: muslimCommunityCategory.id,
        contactId: community3Contact.id,
      },
    ],
  });

  console.log("Data seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
