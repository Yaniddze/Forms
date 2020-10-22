import { 
  TypeChecker, 
  ManySelect,
  BooleanFieldTitle,
  DateFieldTitle,
  NumberFieldTitle,
  TextFieldTitle,
  ManySelectTitle,
} from './types';

const BooleanChecker: TypeChecker = {
  type: BooleanFieldTitle,
  check: (value: any) => typeof value === 'boolean',
};

const TextChecker: TypeChecker = {
  type: TextFieldTitle,
  check: (value: any) => typeof value === 'string',
};

const DateChecker: TypeChecker = {
  type: DateFieldTitle,
  check: (value: any) => value instanceof Date,
};

const ManySeclectChecker: TypeChecker = {
  type: ManySelectTitle,
  check: (value: any) => value instanceof ManySelect,
};

const NumberChecker: TypeChecker = {
  type: NumberFieldTitle,
  check: (value: any) => typeof value === 'number',
};

export const TypeCheckers: TypeChecker[] = [
  BooleanChecker,
  TextChecker,
  DateChecker,
  ManySeclectChecker,
  NumberChecker,
];
