import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { ChangeEvent, FormEvent, MouseEvent, useMemo, useState } from 'react';
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';

import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoList() {
  const { data: user } = useUser();

  const firestore = useFirestore();
  const todosRef = collection(firestore, 'users', user?.uid + '', 'todos');
  const { status: todosStatus, data: todos } = useFirestoreCollectionData(
    todosRef,
    { idField: 'id' },
  );

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>(
    'active',
  );

  const displayedTodos = useMemo(() => {
    if (filter === 'all' || !todos) {
      return todos;
    }

    return todos.filter((todo) =>
      filter === 'completed' ? todo.completed : !todo.completed,
    );
  }, [todos, filter]);

  if (todosStatus === 'loading') {
    return <Typography fontStyle="italic">Loading todos...</Typography>;
  }

  if (todos.length === 0) {
    return <Typography fontStyle="italic">No todos yet...</Typography>;
  }

  function TodoItem({ todo }: { todo: DocumentData }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState<string>(todo.name);

    function handleTodoClick() {
      return function (
        event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
      ) {
        event.stopPropagation();
        event.preventDefault();

        const nativeElement = event.target as HTMLElement;
        if (
          nativeElement.tagName === 'INPUT' &&
          nativeElement.getAttribute('type') === 'checkbox'
        ) {
          updateDoc(doc(firestore, 'users', user?.uid + '', 'todos', todo.id), {
            completed: !todo.completed,
          });
        } else {
          setIsEditing(!isEditing);
          setNewName(todo.name);
        }
      };
    }

    function handleTodoDeleteClick() {
      return function () {
        deleteDoc(doc(firestore, 'users', user?.uid + '', 'todos', todo.id));
      };
    }

    function handleTodoNameChange(
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
      setNewName(event.target.value);
    }

    async function handleTodoNameSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (newName) {
        await updateDoc(
          doc(firestore, 'users', user?.uid + '', 'todos', todo.id),
          {
            name: newName,
          },
        );
        setIsEditing(false);
      }
    }

    return (
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton edge="end" onClick={handleTodoDeleteClick()}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemButton role={undefined} dense onClick={handleTodoClick()}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              tabIndex={-1}
              disableRipple
              checked={todo.completed}
            />
          </ListItemIcon>

          {isEditing ? (
            <form onSubmit={handleTodoNameSubmit}>
              <TextField
                autoFocus
                value={newName}
                onChange={handleTodoNameChange}
              />
            </form>
          ) : (
            <ListItemText
              primary={todo.name}
              primaryTypographyProps={{
                sx: {
                  textDecoration: todo.completed ? 'line-through' : 'none',
                },
              }}
              secondary={<>{todo.created.toDate().toLocaleString()}</>}
            />
          )}
        </ListItemButton>
      </ListItem>
    );
  }

  function handleFilterChange(
    _: MouseEvent<HTMLElement, globalThis.MouseEvent>,
    value: 'all' | 'active' | 'completed',
  ) {
    setFilter(value);
  }

  return (
    <Stack spacing={1}>
      <ToggleButtonGroup value={filter} exclusive onChange={handleFilterChange}>
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="active">Active</ToggleButton>
        <ToggleButton value="completed">Completed</ToggleButton>
      </ToggleButtonGroup>
      <Paper>
        <List>
          {displayedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </List>
      </Paper>
    </Stack>
  );
}
