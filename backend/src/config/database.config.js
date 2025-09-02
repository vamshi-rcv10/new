import { connect, set } from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { FoodModel } from '../models/food.model.js';
import { sample_users, sample_foods } from '../data.js';
import bcrypt from 'bcryptjs';

const PASSWORD_HASH_SALT_ROUNDS = 10;
set('strictQuery', true);

export const dbconnect = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable is missing!');
    }

    await connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database connected successfully');

    await seedUsers();
    await seedFoods();

  } catch (error) {
    console.error('Database connection error:', error);
  }
};

async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log('Users seed is already done!');
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }

  console.log('Users seed is done!');
}

async function seedFoods() {
  const foodsCount = await FoodModel.countDocuments();
  if (foodsCount > 0) {
    console.log('Foods seed is already done!');
    return;
  }

  for (const food of sample_foods) {
    food.imageUrl = `/foods/${food.imageUrl}`;
    await FoodModel.create(food);
  }

  console.log('Foods seed is done!');
}
