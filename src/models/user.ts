import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  id?: number;
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore {
  async create(u: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (user_name,first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await Client.connect();
      const hash: string = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [
        u.user_name,
        u.first_name,
        u.last_name,
        hash
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(
        `Could not add new user ${u.first_name} ${u.last_name} . Error: ${(err as Error).message
        }`
      );
    }
  }

  async authenticate(
    user_name: string,
    password: string
  ): Promise<User | null> {
    const sql = `SELECT * FROM users WHERE user_name='${user_name}'`;
    const conn = await Client.connect();

    const result = await conn.query(sql);
    conn.release();

    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }
    return null;
  }
}
