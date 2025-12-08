const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '123456'
  }
];

const products = [
  // Electronics (existing products)
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Electronics',
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: 'Electronics',
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Electronics',
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Electronics',
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Electronics',
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Electronics',
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  
  // Men's Fashion
  {
    name: 'Classic Fit Denim Jeans',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Premium quality denim jeans with classic fit. Made from 100% cotton for comfort and durability. Available in multiple washes.',
    brand: 'Levi\'s',
    category: 'Clothing',
    price: 79.99,
    countInStock: 25,
    rating: 4.5,
    numReviews: 15,
  },
  {
    name: 'Slim Fit Dress Shirt',
    image: 'https://images.unsplash.com/photo-1562157873-818bc07e0163?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Premium slim fit dress shirt made from breathable cotton fabric. Perfect for office wear or formal occasions.',
    brand: 'Calvin Klein',
    category: 'Clothing',
    price: 59.99,
    countInStock: 30,
    rating: 4.2,
    numReviews: 12,
  },
  {
    name: 'Casual Leather Jacket',
    image: 'https://images.unsplash.com/photo-1521853330020-1d651a943074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Genuine leather jacket with classic design. Perfect for casual outings and provides excellent comfort.',
    brand: 'AllSaints',
    category: 'Clothing',
    price: 199.99,
    countInStock: 15,
    rating: 4.7,
    numReviews: 8,
  },
  
  // Women's Fashion
  {
    name: 'Floral Summer Dress',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Beautiful floral summer dress with lightweight fabric. Perfect for casual outings and summer events.',
    brand: 'Zara',
    category: 'Clothing',
    price: 49.99,
    countInStock: 20,
    rating: 4.3,
    numReviews: 18,
  },
  {
    name: 'Designer Handbag',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Elegant designer handbag with premium materials and spacious interior. Perfect for both casual and formal occasions.',
    brand: 'Michael Kors',
    category: 'Clothing',
    price: 149.99,
    countInStock: 12,
    rating: 4.6,
    numReviews: 10,
  },
  {
    name: 'High-Waisted Jeans',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Trendy high-waisted jeans with comfortable fit and stylish design. Made from premium denim material.',
    brand: 'H&M',
    category: 'Clothing',
    price: 39.99,
    countInStock: 22,
    rating: 4.1,
    numReviews: 14,
  },
  
  // Accessories
  {
    name: 'Luxury Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Premium luxury watch with stainless steel band and elegant design. Water resistant up to 50 meters.',
    brand: 'Rolex',
    category: 'Electronics',
    price: 299.99,
    countInStock: 8,
    rating: 4.8,
    numReviews: 6,
  },
  {
    name: 'Designer Sunglasses',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Stylish designer sunglasses with UV protection and premium lenses. Perfect for both fashion and function.',
    brand: 'Ray-Ban',
    category: 'Electronics',
    price: 129.99,
    countInStock: 18,
    rating: 4.4,
    numReviews: 11,
  },
  {
    name: 'Wireless Bluetooth Earbuds',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'High-quality wireless earbuds with noise cancellation and long battery life. Perfect for music and calls.',
    brand: 'Apple',
    category: 'Electronics',
    price: 179.99,
    countInStock: 25,
    rating: 4.6,
    numReviews: 20,
  },
  
  // Footwear
  {
    name: 'Running Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Comfortable running shoes with advanced cushioning technology. Perfect for jogging and daily exercise.',
    brand: 'Nike',
    category: 'Sports',
    price: 89.99,
    countInStock: 30,
    rating: 4.5,
    numReviews: 22,
  },
  {
    name: 'Leather Dress Shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Elegant leather dress shoes with comfortable insole. Perfect for formal occasions and office wear.',
    brand: 'Clarks',
    category: 'Sports',
    price: 119.99,
    countInStock: 15,
    rating: 4.3,
    numReviews: 9,
  },
  {
    name: 'Casual Sneakers',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Stylish casual sneakers with comfortable design. Perfect for daily wear and casual outings.',
    brand: 'Adidas',
    category: 'Sports',
    price: 69.99,
    countInStock: 28,
    rating: 4.2,
    numReviews: 16,
  },
  
  // Kids Collection
  {
    name: 'Kids T-Shirt Pack',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Pack of 3 colorful t-shirts for kids. Made from soft cotton material for maximum comfort.',
    brand: 'Carter\'s',
    category: 'Clothing',
    price: 24.99,
    countInStock: 40,
    rating: 4.0,
    numReviews: 13,
  },
  {
    name: 'Kids Backpack',
    image: 'https://images.unsplash.com/photo-1536300007881-7e482242baa5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Colorful kids backpack with multiple compartments. Perfect for school and daily use.',
    brand: 'JanSport',
    category: 'Clothing',
    price: 34.99,
    countInStock: 25,
    rating: 4.1,
    numReviews: 8,
  },
  {
    name: 'Kids Sneakers',
    image: 'https://images.unsplash.com/photo-1511556820780-6b855d0d10c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Comfortable sneakers designed specifically for kids. Provides excellent support for active children.',
    brand: 'New Balance',
    category: 'Sports',
    price: 49.99,
    countInStock: 35,
    rating: 4.3,
    numReviews: 11,
  }
];

const seedDB = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyDB = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyDB();
} else {
  seedDB();
}