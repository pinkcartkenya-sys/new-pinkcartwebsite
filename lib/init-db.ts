import { Database } from './models';

export async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    // Check if categories already exist
    const existingCategories = await Database.getCategories();
    if (existingCategories.length > 0) {
      console.log('Categories already exist, skipping initialization');
      return;
    }

    // Create initial categories
    const categories = [
      {
        name: 'All Finds',
        slug: 'all',
        description: 'All available products',
        icon: 'Sparkles',
      },
      {
        name: 'Girly Finds',
        slug: 'girly',
        description: 'Cute and feminine products',
        icon: 'Heart',
      },
      {
        name: 'Dorm Essentials',
        slug: 'dorm',
        description: 'Essential items for dorm life',
        icon: 'Package',
      },
      {
        name: 'Tech & Accessories',
        slug: 'tech',
        description: 'Technology and accessories',
        icon: 'Sparkles',
      },
    ];

    for (const category of categories) {
      await Database.createCategory(category);
      console.log(`Created category: ${category.name}`);
    }

    // Create sample products
    const products = [
      {
        name: 'Cute Pink Desk Organizer Set',
        description: 'Transform your workspace into a cute and organized haven with this adorable pink desk organizer set.',
        price: 1200,
        originalPrice: 2500,
        image: '/pink-desk-organizer.jpg',
        images: [
          '/pink-desk-organizer.jpg',
          '/pink-desk-organizer-front-view.jpg',
          '/pink-desk-organizer-side-view.jpg',
          '/pink-desk-organizer-compartments-detail.jpg',
          '/pink-desk-organizer-in-use-on-desk.jpg',
        ],
        video: '/desk-organizer-product-video-thumbnail.jpg',
        hasVideo: true,
        categoryId: 'dorm',
        category: 'Dorm Essentials',
        joinedCount: 34,
        maxParticipants: 50,
        isActive: true,
        featured: true,
        dimensions: '25cm x 15cm x 10cm',
        weight: '450g',
        material: 'High-quality ABS plastic',
        quality: 'Premium grade with smooth finish and sturdy construction',
        shippingTime: '3-4 weeks after order closes',
      },
      {
        name: 'Aesthetic LED Mirror with Hearts',
        description: 'Light up your beauty routine with this stunning LED mirror featuring adorable heart-shaped lights.',
        price: 2800,
        originalPrice: 4500,
        image: '/led-mirror-hearts.jpg',
        images: [
          '/led-mirror-hearts.jpg',
          '/led-mirror-with-hearts-lit-up.jpg',
          '/led-mirror-brightness-settings.jpg',
          '/led-mirror-back-view-with-usb-port.jpg',
          '/led-mirror-on-vanity-table.jpg',
        ],
        video: '/led-mirror-demo-video-thumbnail.jpg',
        hasVideo: true,
        categoryId: 'girly',
        category: 'Girly Finds',
        joinedCount: 28,
        maxParticipants: 40,
        isActive: true,
        featured: true,
        dimensions: '30cm x 25cm x 5cm',
        weight: '800g',
        material: 'Glass mirror with ABS plastic frame',
        quality: 'HD reflection with energy-efficient LED lights',
        shippingTime: '3-4 weeks after order closes',
      },
      {
        name: 'Kawaii Phone Accessories Bundle',
        description: 'Complete kawaii phone accessory bundle including a cute phone case, pop socket, screen protector, and charging cable organizer.',
        price: 800,
        originalPrice: 1500,
        image: '/kawaii-phone-accessories.jpg',
        images: [
          '/kawaii-phone-accessories.jpg',
          '/kawaii-phone-case-pink.jpg',
          '/kawaii-pop-socket-designs.jpg',
          '/phone-accessories-bundle-contents.jpg',
          '/phone-with-kawaii-accessories.jpg',
        ],
        hasVideo: false,
        categoryId: 'tech',
        category: 'Tech & Accessories',
        joinedCount: 45,
        maxParticipants: 60,
        isActive: true,
        featured: true,
        dimensions: 'Varies by item',
        weight: '150g',
        material: 'Silicone, tempered glass, plastic',
        quality: 'Durable materials with cute designs that last',
        shippingTime: '3-4 weeks after order closes',
      },
    ];

    for (const product of products) {
      await Database.createProduct(product);
      console.log(`Created product: ${product.name}`);
    }

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
