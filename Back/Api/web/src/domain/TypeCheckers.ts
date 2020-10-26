import { 
  TypeChecker, 
  ManySelect,
  BooleanFieldTitle,
  DateFieldTitle,
  NumberFieldTitle,
  ManySelectTitle,
} from './types';

const BooleanChecker: TypeChecker = {
  type: BooleanFieldTitle,
  check: (value: any) => typeof value === 'boolean',
};

const DateChecker: TypeChecker = {
  type: DateFieldTitle,
  check: (value: any) => {
    if (typeof value === 'number') return false;
    const date = new Date(value);

    return !Number.isNaN(date.getTime());
  },
};

const ManySeclectChecker: TypeChecker = {
  type: ManySelectTitle,
  check: (value: any) => {
    const valueKeys = Object.keys(value);
    const manyKeys = Object.getOwnPropertyNames(new ManySelect());

    if (valueKeys.includes(manyKeys[0]) && valueKeys.includes(manyKeys[1])) {
      return Array.isArray(value[manyKeys[0]]) && Array.isArray(value[manyKeys[1]]); 
    }

    return false;
  },
};

const NumberChecker: TypeChecker = {
  type: NumberFieldTitle,
  check: (value: any) => typeof value === 'number',
};

export const TypeCheckers: TypeChecker[] = [
  BooleanChecker,
  DateChecker,
  ManySeclectChecker,
  NumberChecker,
];
