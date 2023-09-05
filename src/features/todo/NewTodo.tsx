import { ChangeEvent, FormEvent, useState } from 'react';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { useFirestore, useUser } from 'reactfire';

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function NewTodo() {
  const firestore = useFirestore();
  const { data: user } = useUser();
  const [newTodo, setNewTodo] = useState<string>('');

  function handleNewTodoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addNewTodo();
  }

  function handleNewTodoChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setNewTodo(event.target.value);
  }

  function handleNewTodoClick() {
    addNewTodo();
  }

  async function addNewTodo() {
    if (newTodo) {
      await addDoc(collection(firestore, 'users', user?.uid + '', 'todos'), {
        name: newTodo,
        created: Timestamp.now(),
        completed: false,
      });
      setNewTodo('');
    }
  }

  return (
    <FormControl
      variant="outlined"
      component="form"
      onSubmit={handleNewTodoSubmit}
      sx={{ mb: 2 }}
    >
      <InputLabel>New Todo</InputLabel>
      <OutlinedInput
        label="New Todo"
        value={newTodo}
        onChange={handleNewTodoChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleNewTodoClick}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
