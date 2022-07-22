import { Embeddable, Embedded, Entity, PrimaryKey, Property, types as PropertyType } from "@mikro-orm/core";

@Embeddable()
export class FieldValueEntity {
    @Property({ type: PropertyType.json })
    primitive: string | number | boolean | null;

    @Property({ type: PropertyType.json })
    object: Record<string, boolean>;
}

@Entity({
    tableName: 'field'
})
export class FieldEntity {
    // A hack with two primary keys to be able to run an example for MongoDB.
    @PrimaryKey()
    _id: number = 1;

    @PrimaryKey({ autoincrement: true })
    id: number = 1;

    @Embedded({
        entity: () => FieldValueEntity,
        array: true,
    })
    values: FieldValueEntity[] = [];
}
