import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import pg from 'pg';
const Pool = pg.Pool
dotenv.config();


const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    NODE_ENV
} = process.env;

let client = new Pool();

if (NODE_ENV == 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

if (NODE_ENV == 'dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
const createUser = async () => {
    const u = {
        user_name: "test",
        first_name: "hello",
        last_name: "world",
        password: "testttt"
    }
    const sql =
        'INSERT INTO users (user_name,first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *';
    const conn = await client.connect();
    const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds)
    );

    const result = await conn.query(sql, [
        u.user_name,
        u.first_name,
        u.last_name,
        hash
    ]);

    const user = result.rows[0];
    console.log(user)
    conn.release();
}

createUser()