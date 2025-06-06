import * as React from 'react';
import useAutocomplete, { type UseAutocompleteProps } from '@mui/material/useAutocomplete';
import Input from './Input';
import { Typography } from '../typography/Typography';
import Spinner from '../loaders/Spinner';
import { styled } from '@mui/system';


// Puedes eliminar el styled si prefieres usar solo Tailwind


interface AutocompleteInputProps<T> extends Omit<Partial<UseAutocompleteProps<T, false, false, false>>, 'onChange' | 'value'> {
  label?: string;
  value?: T | null;
  onChange?: (value: T | null) => void;
  renderOption?: (option: T) => React.ReactNode;
  isLoading?: boolean
}

function AutocompleteInput<T>({
  label = 'Selecciona una opción',
  options = [],
  getOptionLabel = (option: T) => String(option),
  value,
  onChange,
  renderOption,
  isLoading,
  ...rest
}: AutocompleteInputProps<T>) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete<T>({
    id: 'custom-autocomplete',
    options,
    getOptionLabel,
    value,
    onChange: (_event, newValue) => {
      onChange?.(newValue);
    },
    ...rest,
  });

  const Listbox = styled('ul')(({ theme }) => ({
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: '#fff',
    overflow: 'auto',
    maxHeight: 200,
    border: '1px solid rgba(0,0,0,.25)',
    '& li.Mui-focused': {
      backgroundColor: '#eef2ff',
      color: 'white',
      cursor: 'pointer',
    },
    '& li:active': {
      backgroundColor: '#2977f5',
      color: 'white',
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#000',
    }),
  }));


  return (
    <div className="relative mb-5">
      <div {...getRootProps()} className="flex flex-col gap-1 w-full">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          {...getInputLabelProps()}
        >
          {label}
        </label>
        <Input
          placeholder="Buscar Elementos"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-xs"
          {...getInputProps()}
        />
      </div>
      {groupedOptions.length > 0 && (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            return (
              <li
                key={key}
                {...optionProps}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition text-sm"
              >
                <Typography.P className='text-gray-700'>
                  {renderOption ? renderOption(option) : getOptionLabel(option)}
                </Typography.P>
              </li>
            );
          })}
        </Listbox>
      )}
      {isLoading && (
        <div className="absolute right-2 top-10">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default AutocompleteInput;