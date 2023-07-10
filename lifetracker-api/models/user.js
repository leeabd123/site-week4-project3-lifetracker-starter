const { UnauthorizedError, BadRequestError } = require('../utils/errors');
const { compare } = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');
const db = require('../db');
const bcrypt = require('bcrypt');

class User {
  static async makePublicUser(user) {
    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      date: user.date,
    };
  }

  static async login(credentials) {
    const requiredFields = ["email", "password"]; // Only email and password are required for login
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    const user = await User.fetchUserByEmail(credentials.email);
    if (user) {
      const isValid = await compare(credentials.password, user.password);
      if (isValid) {
        return user;
      }
    }
    throw new UnauthorizedError("Invalid email/password combo");
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email.toLowerCase()]);
    const user = result.rows[0];
    return user;
  }

  static async register(credentials) {
    const requiredFields = ["email", "password", "first_name", "last_name"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(`Duplicate email: ${credentials.email}`);
    }

    const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR);
    const lowercasedEmail = credentials.email.toLowerCase();

    const query = `
      INSERT INTO users (email, password, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, first_name, last_name, date
    `;
    const result = await db.query(query, [
      lowercasedEmail,
      hashedPassword,
      credentials.first_name,
      credentials.last_name,
    ]);
    const user = result.rows[0];

    return user;
  }

static async addEx(credentials) {
  const requiredFields = ["user_email", "title", "duration", "intensity"];
  requiredFields.forEach((field) => {
    if (!credentials.hasOwnProperty(field)) {
      throw new BadRequestError(`Missing ${field} in request body.`);
    }
  });

  const existingUser = await User.fetchUserByEmail(credentials.user_email);
  
  const lowercasedEmail = credentials.user_email.toLowerCase();

  const query = `
    INSERT INTO Excercise (user_email, title, duration, intensity)
    VALUES ($1, $2, $3, $4)
  `;
  const result = await db.query(query, [
    lowercasedEmail,
    credentials.title,
    credentials.duration,
    credentials.intensity
  ]);
  return;

}

  
static async addN(credentials) {
  const requiredFields = ["user_email", "category", "calories", "nutrients", "img"];
  requiredFields.forEach((field) => {
    if (!credentials.hasOwnProperty(field)) {
      throw new BadRequestError(`Missing ${field} in request body.`);
    }
  });

  const existingUser = await User.fetchUserByEmail(credentials.user_email);
  
  const lowercasedEmail = credentials.user_email.toLowerCase();

  const query = `
    INSERT INTO Nutrition (user_email, category, calories, nutrients, img)
    VALUES ($1, $2, $3, $4, $5)
  `;
  const result = await db.query(query, [
    lowercasedEmail,
    credentials.category,
    credentials.calories,
    credentials.nutrients,
    credentials.img
  ]);
  return;

}



static async addS(credentials) {
  const requiredFields = ["user_email", "category", "start_time", "end_time"];
  requiredFields.forEach((field) => {
    if (!credentials.hasOwnProperty(field)) {
      throw new BadRequestError(`Missing ${field} in request body.`);
    }
  });

  const existingUser = await User.fetchUserByEmail(credentials.user_email);
  
  const lowercasedEmail = credentials.user_email.toLowerCase();

  const query = `
    INSERT INTO Sleep (user_email, category, start_time, end_time)
    VALUES ($1, $2, $3, $4)
  `;
  const result = await db.query(query, [
    lowercasedEmail,
    credentials.category,
    credentials.start_time,
    credentials.end_time
  ]);
  return;

}


static async getExercisesByEmail(email) {
  console.log("grabbing excercises emails", email)
  const query = `
    SELECT * FROM Excercise
    WHERE user_email = $1
  `;
  const result = await db.query(query, [email.toLowerCase()]);
  console.log("excercises", result.rows)

  return result.rows;
}

static async getNutritionByEmail(email) {
  const query = `
    SELECT * FROM Nutrition
    WHERE user_email = $1
  `;
  const result = await db.query(query, [email.toLowerCase()]);
  console.log("nutrition", result.rows)
  return result.rows;
}

static async getSleepByEmail(email) {
  const query = `
    SELECT * FROM Sleep
    WHERE user_email = $1
  `;
  const result = await db.query(query, [email.toLowerCase()]);
  console.log("sleep", result.rows)

  return result.rows;
}

static async getMaxSleep(email) {
  const query = `
    SELECT user_email, date, MAX(DATE_PART('hour', end_time::timestamp - start_time::timestamp)::numeric) AS max_sleep_duration
    FROM Sleep
    WHERE user_email = $1
    GROUP BY user_email, date;
  `;
  const result = await db.query(query, [email.toLowerCase()]);
  console.log("sleep", result.rows);

  return result.rows;
}

static async getAvgCal(email) {
  const query = `
    SELECT AVG(calories::numeric) AS average_calories
    FROM Nutrition
    WHERE user_email = $1;
  `;
  const result = await db.query(query, [email.toLowerCase()]);
  console.log("average calories", result.rows[0].average_calories);

  return result.rows[0].average_calories;
}
static async getTotalE(email) {
  const query = `
    SELECT SUM(duration::numeric) AS total_duration
    FROM Exercise
    WHERE user_email = $1;
  `;
  const result = await db.query(query, [email.toLowerCase()]);
  console.log("total duration", result.rows[0].total_duration);

  return result.rows[0].total_duration;
}


}

module.exports = User;
