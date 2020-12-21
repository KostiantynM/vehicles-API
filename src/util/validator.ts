import { celebrate, SchemaOptions } from 'celebrate';

const validate = (schema: SchemaOptions) => celebrate(schema);

export {
  validate
}
