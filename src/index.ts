import { MikroORM } from "@mikro-orm/core";
import { FieldEntity, FieldValueEntity } from "./entities/FieldEntity";
import db from './mikro-orm.config';

(async () => {
    const orm = await MikroORM.init({ ...db });

    await orm.getSchemaGenerator().refreshDatabase();

    const value = new FieldValueEntity()

    value.primitive = 1; // Value is a number!
    value.object = { field: true };

    const entity = orm.em.create(FieldEntity, { values: [value] });

    await orm.em.persistAndFlush(entity);

    orm.em.clear();

    const result = await orm.em.find(FieldEntity, {});

    console.dir({
        db: process.env.DB_TYPE,
        values: {
            entity: result[0].values[0],
            primitive: result[0]?.values[0].primitive, // Value is a string!
            object: result[0]?.values[0].object, // Value is a string!
        },
    }, { colors: true });

    await orm.close();
})();
