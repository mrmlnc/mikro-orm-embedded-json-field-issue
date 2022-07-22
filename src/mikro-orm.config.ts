import type { Options } from "@mikro-orm/core";
import { FieldEntity } from "./entities/FieldEntity";

const options: Options = {
    entities: [FieldEntity],

    debug: Boolean(process.env.DEBUG) || false,

    allowGlobalContext: true,
};

const db = process.env.DB_TYPE as string;

if (db === 'mongodb') {
    Object.assign(options, {
        type: 'mongo',
        dbName: 'db',
        clientUrl: 'mongodb://localhost:27017',
        user: 'root',
        password: 'password',
    })
}

if (db === 'sqlite') {
    Object.assign(options, {
        type: 'better-sqlite',
        dbName: ':memory:',
    })
}

if (db === 'postgresql') {
    Object.assign(options, {
        type: 'postgresql',
        dbName: 'db',
        user: 'root',
        password: 'password',
        port: 8432,
    })
}

if (db === 'mysql') {
    Object.assign(options, {
        type: 'mysql',
        dbName: 'db',
        user: 'root2',
        password: 'password',
        port: 6603,
    })
}

export default options;
