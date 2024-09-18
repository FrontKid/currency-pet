import { Field, ErrorMessage } from 'formik';
import { FC } from 'react';

import cn from 'classnames';

type TInputFieldProps = {
  name: string;
  value: number;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const InputField: FC<TInputFieldProps> = ({
  name,
  value,
  onBlur,
  onClick,
  onChange,
  className,
}) => {
  return (
    <>
      <label>
        <Field
          type="text"
          className={cn(
            className,
            'border rounded-md p-2 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500',
          )}
          name={name}
          value={value}
          onBlur={onBlur}
          onClick={onClick}
          onChange={onChange}
        />
      </label>

      <ErrorMessage name={name} component="div" />
    </>
  );
};

export { InputField };
