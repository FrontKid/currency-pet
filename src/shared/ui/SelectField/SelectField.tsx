import { Field } from 'formik';
import { FC } from 'react';

import cn from 'classnames';

type TSelectFieldProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  data: string[];
  id?: string;
  label?: string;
};

const SelectField: FC<TSelectFieldProps> = ({
  name,
  value,
  onChange,
  className,
  data,
  label,
  id,
}) => {
  return (
    <>
      <label className="text-gray-700 mb-2 font-medium" htmlFor={id}>
        {label}
      </label>
      <Field
        id={id}
        as="select"
        className={cn(
          className,
          'border rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500',
        )}
        name={name}
        value={value}
        onChange={onChange}
      >
        {data.map(currency => (
          <option key={currency} value={currency}>
            {currency.toUpperCase()}
          </option>
        ))}
      </Field>
    </>
  );
};

export { SelectField };
