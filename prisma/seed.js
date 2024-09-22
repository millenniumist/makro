require('dotenv').config();
const prisma = require('../config/prisma');

async function main() {
      // Create Users
  const user1 = await prisma.user.create({
    data: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      password: 'password123',
      member_id: 'MEM001'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
      phone: '0987654321',
      password: 'password456',
      member_id: 'MEM002'
    }
  });
  // Create Categories
  const category1 = await prisma.category.create({
    data: { name: 'Electronics' }
  });

  const category2 = await prisma.category.create({
    data: { name: 'Clothing' }
  });
  // Create Products
  const product1 = await prisma.product.create({
    data: {
      name: 'Smartphone',
      price: 599.99,
      stock: 100,
      detail: 'Latest model smartphone',
      categoryId: category1.id
    }
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'T-Shirt',
      price: 19.99,
      stock: 200,
      detail: 'Cotton t-shirt',
      categoryId: category2.id
    }
  });
  // Create Product Images
  await prisma.product_Image.create({
    data: {
      url: 'https://example.com/smartphone.jpg',
      productId: product1.id
    }
  });

  await prisma.product_Image.create({
    data: {
      url: 'https://example.com/tshirt.jpg',
      productId: product2.id
    }
  });
  // Create Orders and Order Products
  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      total: 619.98,
      is_paid: true,
      status: 'DELIVERED',
      payment_method: 'CREDIT_CARD'
    }
  });

  await prisma.order_Product.create({
    data: {
      orderId: order1.id,
      productId: product1.id,
      quantity: 1
    }
  });
  // Create Addresses
  await prisma.address.create({
    data: {
      userId: user1.id,
      name: 'Home',
      phone: '1234567890',
      email: 'john@example.com',
      address: '123 Main St',
      district: 'Downtown',
      provice: 'State',
      postal: '12345',
      is_main: true
    }
  });
  await prisma.$disconnect();
  }

  main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
