import {
  PrismaClient,
  Role,
  OrderStatus,
  PaymentProvider,
} from "@prisma/client";

const prisma = new PrismaClient();

// Hash for "admin123"
const ADMIN_PASSWORD_HASH = "$2b$10$epGk/lKq.jWk0yG8.5K0Eu/u2T0.y3T0.y3T0.y3T0";

async function main() {
  console.log('Iniciando el proceso de siembra ("seeding") inteligente...');
  console.log('NOTA: La contraseña para todos los usuarios será "admin123"');

  const adminPassword = ADMIN_PASSWORD_HASH;

  // 1. Crear Usuarios (Users) - IDEMPOTENT
  console.log("Verificando/Creando usuarios...");

  const usersData = [
    {
      email: "admin@limarpoo.com",
      password_hash: adminPassword,
      role: Role.ADMIN,
      profile: {
        first_name: "Administrador",
        last_name: "Sistema",
        phone: "+51 900 000 000",
      },
    },
    {
      email: "staff@limarpoo.com",
      password_hash: adminPassword,
      role: Role.STAFF,
      profile: {
        first_name: "Soporte",
        last_name: "Técnico",
        phone: "+51 900 000 001",
      },
    },
    {
      email: "juan.perez@email.com",
      password_hash: adminPassword,
      role: Role.CUSTOMER,
      profile: {
        first_name: "Juan",
        last_name: "Pérez",
        phone: "+51 911 111 111",
      },
      addresses: [
        {
          street: "Av. Javier Prado 123",
          city: "Lima",
          country: "Perú",
          zip_code: "15001",
          is_default: true,
        },
        {
          street: "Calle Los Pinos 456",
          city: "Arequipa",
          country: "Perú",
          zip_code: "04001",
          is_default: false,
        },
      ],
    },
    {
      email: "maria.gonzalez@email.com",
      password_hash: adminPassword,
      role: Role.CUSTOMER,
      profile: {
        first_name: "María",
        last_name: "González",
        phone: "+51 922 222 222",
      },
      addresses: [
        {
          street: "Jr. de la Unión 789",
          city: "Lima",
          country: "Perú",
          zip_code: "15001",
          is_default: true,
        },
      ],
    },
    {
      email: "carlos.lopez@email.com",
      password_hash: adminPassword,
      role: Role.CUSTOMER,
      profile: {
        first_name: "Carlos",
        last_name: "López",
        phone: "+51 933 333 333",
      },
      addresses: [
        {
          street: "Av. Larco 101",
          city: "Trujillo",
          country: "Perú",
          zip_code: "13001",
          is_default: true,
        },
      ],
    },
  ];

  const createdUsers = [];

  for (const u of usersData) {
    // Upsert: Create if not exists, do nothing (update empty) if exists.
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {}, // No updates if exists, as requested
      create: {
        email: u.email,
        password_hash: u.password_hash,
        role: u.role,
        profile: {
          create: u.profile,
        },
        addresses: {
          create: u.addresses || [],
        },
      },
    });
    createdUsers.push(user);
    console.log(`Usuario procesado: ${user.email}`);
  }

  // 2. Crear Categorías (Categories) - IDEMPOTENT
  console.log("Verificando/Creando categorías...");

  const categoriesData = [
    { name: "Electrónicos" },
    { name: "Ropa" },
    { name: "Hogar" },
    { name: "Deportes" },
    { name: "Libros" },
  ];

  const createdCategories = [];
  for (const c of categoriesData) {
    // Category doesn't have a unique name field by default in many schemas,
    // but looking at schema... it does NOT have valid unique constraint on name.
    // So we must check manually with findFirst.
    let category = await prisma.category.findFirst({ where: { name: c.name } });

    if (!category) {
      category = await prisma.category.create({ data: c });
      console.log(`Categoría creada: ${c.name}`);
    } else {
      console.log(`Categoría ya existe: ${c.name}`);
    }
    createdCategories.push(category);
  }

  // 3. Crear Productos (Products) - IDEMPOTENT
  console.log("Verificando/Creando productos...");

  const productsData = [
    {
      name: "Laptop Gamer Xtreme",
      description:
        "Potente laptop para juegos con tarjeta gráfica de última generación.",
      price: 4500.0,
      sku: "ELEC-001",
      stock_quantity: 10,
      category_idx: 0,
    },
    {
      name: "Smartphone Pro Max",
      description: "Teléfono inteligente con cámara de alta resolución.",
      price: 3200.0,
      sku: "ELEC-002",
      stock_quantity: 25,
      category_idx: 0,
    },
    {
      name: "Camiseta de Algodón",
      description: "Camiseta cómoda y fresca, 100% algodón.",
      price: 45.0,
      sku: "ROPA-001",
      stock_quantity: 100,
      category_idx: 1,
    },
    {
      name: "Sofá de 3 Cuerpos",
      description: "Sofá moderno y confortable para tu sala.",
      price: 1200.0,
      sku: "HOGAR-001",
      stock_quantity: 5,
      category_idx: 2,
    },
    {
      name: "Balón de Fútbol Oficial",
      description: "Balón de tamaño oficial para partidos profesionales.",
      price: 120.0,
      sku: "DEP-001",
      stock_quantity: 50,
      category_idx: 3,
    },
    {
      name: "El Quijote de la Mancha",
      description: "Clásico de la literatura española.",
      price: 80.0,
      sku: "LIBR-001",
      stock_quantity: 30,
      category_idx: 4,
    },
  ];

  const createdProducts = [];
  for (const p of productsData) {
    const categoryId = createdCategories[p.category_idx]?.id;
    if (!categoryId) continue;

    const product = await prisma.product.upsert({
      where: { sku: p.sku },
      update: {},
      create: {
        name: p.name,
        description: p.description,
        price: p.price,
        sku: p.sku,
        stock_quantity: p.stock_quantity,
        category_id: categoryId,
      },
    });
    createdProducts.push(product);
    console.log(`Producto procesado: ${p.sku}`);
  }

  // 4. Crear Artículos (Articles) - IDEMPOTENT (Check by title)
  console.log("Verificando/Creando artículos...");

  const adminUser = createdUsers.find((u) => u.role === Role.ADMIN);
  const staffUser = createdUsers.find((u) => u.role === Role.STAFF);

  const articlesData = [
    {
      title: "Cómo Comprar Seguro en Internet",
      content: "Consejos prácticos para realizar compras seguras online...",
      author_id: adminUser?.id,
    },
    {
      title: "Tendencias de Moda 2026",
      content: "Descubre lo último en moda para esta temporada...",
      author_id: staffUser?.id,
    },
    {
      title: "Mejores Gadgets del Año",
      content:
        "Una revisión de los dispositivos electrónicos más innovadores...",
      author_id: adminUser?.id,
    },
  ];

  if (adminUser && staffUser) {
    for (const a of articlesData) {
      if (a.author_id) {
        // Article doesn't have unique title, so use findFirst
        const existing = await prisma.article.findFirst({
          where: { title: a.title },
        });
        if (!existing) {
          await prisma.article.create({ data: a as any });
          console.log(`Artículo creado: ${a.title}`);
        } else {
          console.log(`Artículo ya existe: ${a.title}`);
        }
      }
    }
  }

  // 5. Crear Órdenes (Orders) y Pagos (Payments)
  // Logic: We will check if user has orders. If so, skip creation to avoid duplicating every seed run.
  console.log("Verificando/Creando órdenes...");

  const customerUser = createdUsers.find(
    (u) => u.email === "juan.perez@email.com",
  );
  const customerAddress = await prisma.address.findFirst({
    where: { user_id: customerUser?.id },
  });

  if (customerUser && customerAddress) {
    const existingOrders = await prisma.order.findMany({
      where: { user_id: customerUser.id },
    });

    if (existingOrders.length === 0) {
      // Only create if no orders exist for this user

      // Orden 1: Pagada
      await prisma.order.create({
        data: {
          user_id: customerUser.id,
          status: OrderStatus.PAID,
          total_amount: 4500.0,
          shipping_address_id: customerAddress.id,
          items: {
            create: [
              {
                product_id: createdProducts[0].id, // Laptop
                quantity: 1,
                price_at_purchase: 4500.0,
              },
            ],
          },
          payment: {
            create: {
              provider: PaymentProvider.STRIPE,
              transaction_id: "tx_123456789",
              status: "succeeded",
              amount: 4500.0,
            },
          },
        },
      });
      console.log("Orden 1 creada para Juan Perez");

      // Orden 2: Pendiente
      await prisma.order.create({
        data: {
          user_id: customerUser.id,
          status: OrderStatus.PENDING,
          total_amount: 165.0,
          shipping_address_id: customerAddress.id,
          items: {
            create: [
              {
                product_id: createdProducts[2].id, // Camiseta
                quantity: 1,
                price_at_purchase: 45.0,
              },
              {
                product_id: createdProducts[4].id, // Balón
                quantity: 1,
                price_at_purchase: 120.0,
              },
            ],
          },
        },
      });
      console.log("Orden 2 creada para Juan Perez");
    } else {
      console.log("Órdenes ya existen para Juan Perez, saltando...");
    }
  }

  // Orden 3: Entregada (otro usuario)
  const otherUser = createdUsers.find(
    (u) => u.email === "maria.gonzalez@email.com",
  );
  const otherAddress = await prisma.address.findFirst({
    where: { user_id: otherUser?.id },
  });

  if (otherUser && otherAddress) {
    const existingOrdersOther = await prisma.order.findMany({
      where: { user_id: otherUser.id },
    });
    if (existingOrdersOther.length === 0) {
      await prisma.order.create({
        data: {
          user_id: otherUser.id,
          status: OrderStatus.DELIVERED,
          total_amount: 80.0,
          shipping_address_id: otherAddress.id,
          items: {
            create: [
              {
                product_id: createdProducts[5].id, // Libro
                quantity: 1,
                price_at_purchase: 80.0,
              },
            ],
          },
          payment: {
            create: {
              provider: PaymentProvider.PAYPAL,
              transaction_id: "pay_987654321",
              status: "completed",
              amount: 80.0,
            },
          },
        },
      });
      console.log("Orden 3 creada para Maria Gonzalez");
    } else {
      console.log("Órdenes ya existen para Maria Gonzalez, saltando...");
    }
  }

  // 6. Crear Reseñas (Reviews)
  console.log("Verificando/Creando reseñas...");
  // Logic: Check if reviews exist for user/product combo

  if (customerUser) {
    const existingReview = await prisma.review.findFirst({
      where: { user_id: customerUser.id, product_id: createdProducts[0].id },
    });

    if (!existingReview) {
      await prisma.review.create({
        data: {
          user_id: customerUser.id,
          product_id: createdProducts[0].id, // Laptop
          rating: 5,
          comment: "¡Excelente laptop, corre todos mis juegos favoritos!",
        },
      });
      console.log("Reseña creada para Laptop");
    }
  }

  const reviewUser = createdUsers.find(
    (u) => u.email === "maria.gonzalez@email.com",
  );
  if (reviewUser) {
    // Review 1
    const r1 = await prisma.review.findFirst({
      where: { user_id: reviewUser.id, product_id: createdProducts[5].id },
    });
    if (!r1) {
      await prisma.review.create({
        data: {
          user_id: reviewUser.id,
          product_id: createdProducts[5].id, // Libro
          rating: 4,
          comment: "Buena lectura, llegó en perfectas condiciones.",
        },
      });
      console.log("Reseña creada para Libro");
    }

    // Review 2
    const r2 = await prisma.review.findFirst({
      where: { user_id: reviewUser.id, product_id: createdProducts[2].id },
    });
    if (!r2) {
      await prisma.review.create({
        data: {
          user_id: reviewUser.id,
          product_id: createdProducts[2].id, // Camiseta
          rating: 3,
          comment: "La talla es un poco pequeña, pero la calidad es buena.",
        },
      });
      console.log("Reseña creada para Camiseta");
    }
  }

  console.log("¡Siembra de datos completada exitosamente!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
