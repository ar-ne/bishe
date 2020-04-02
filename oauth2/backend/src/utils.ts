import { ReferenceObject, SchemaObject } from 'openapi3-ts/src/model/OpenApi';

export const HydraPropertiesSpecGenerator = (v: Array<{ name: string, baseName: string, type: string }>): { [propertyName: string]: (SchemaObject | ReferenceObject) } => {
  const props: { [propertyName: string]: (SchemaObject | ReferenceObject) } = {};
  v.forEach(({ name, type }) => {
    let t = {} as SchemaObject;
    if (isBaseType(type))
      t = getBaseType(type);
    else if (isArray(type))
      t = getArrayType(type);
    else t = { type: 'object' };
    props[name] = {
      title: name,
      ...t,
    };
  });
  return props;
};

const isBaseType = (type: string): boolean => ['string', 'number', 'integer', 'boolean'].includes(type);
const isArray = (type: string): boolean => type.startsWith('Array<') && type.endsWith('>');
const getBaseType = (type: string): SchemaObject => {
  if (!isBaseType(type)) throw new Error('Not a base type?');
  return { type };
};
const getArrayType = (type: string): SchemaObject => {
  if (!isArray(type)) throw new Error('Not an array type?');
  const array: SchemaObject = {
    type: 'array',
    items: {},
  };
  const subType = type.substring('Array<'.length, type.length - 1);
  if (isBaseType(subType)) array.items = getBaseType(subType);
  else if (isArray(subType)) array.items = getArrayType(subType);
  else array.items = { type: 'object' };
  return array;
};
