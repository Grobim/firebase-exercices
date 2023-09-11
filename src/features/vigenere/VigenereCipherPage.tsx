import { ChangeEvent, FormEvent, useState } from 'react';

import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { decode, encode } from './vigenereLib';

function requiredTextField(value: string) {
  if (!value.length) {
    return 'Field is required';
  }

  return '';
}

type Type = 'encode' | 'decode';

export function Component() {
  const [message, setMessage] = useState<string>('');
  const [messageError, setMessageError] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [keyError, setKeyError] = useState<string>('');

  const [type, setType] = useState<Type>('encode');

  const [result, setResult] = useState<string>('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessageError('');
    setKeyError('');
    setResult('');

    const errors = {
      message: requiredTextField(message),
      key: requiredTextField(key),
    };

    if (errors.message || errors.key) {
      setMessageError(errors.message);
      setKeyError(errors.key);

      return;
    }

    if (type === 'encode') {
      setResult(encode(message, key));
    } else if (type === 'decode') {
      setResult(decode(message, key));
    }
  }

  function handleMessageChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setMessage(event.target.value);
  }

  function handleKeyChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setKey(event.target.value);
  }

  function handleTypeChange(event: ChangeEvent<HTMLInputElement>) {
    setType(event.target.value as Type);
  }

  return (
    <>
      <Typography variant="h5" mb={2}>
        Vigenere cipher
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            error={Boolean(messageError)}
            helperText={messageError}
            value={message}
            onChange={handleMessageChange}
            required
            label="Message"
          />
          <TextField
            error={Boolean(keyError)}
            helperText={keyError}
            value={key}
            onChange={handleKeyChange}
            required
            label="Key"
          />
          <FormControl>
            <FormLabel>Type</FormLabel>
            <RadioGroup value={type} onChange={handleTypeChange}>
              <FormControlLabel
                value="encode"
                control={<Radio />}
                label="Encode"
              />
              <FormControlLabel
                value="decode"
                control={<Radio />}
                label="Decode"
              />
            </RadioGroup>
          </FormControl>
          <Button type="submit" variant="contained">
            {type === 'encode' ? 'Encode' : 'Decode'}
          </Button>
          {result ? <Divider /> : null}
        </Stack>
        {result ? (
          <Typography mt={2}>
            Result:
            <br />
            {result}
          </Typography>
        ) : null}
      </form>
    </>
  );
}

export default Component;
