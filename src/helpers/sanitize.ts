import validator from 'validator';

export const sanitize = (value: any) => validator.escape(value);
