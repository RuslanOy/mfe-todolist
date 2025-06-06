import React from 'react';
import { Box, Checkbox, IconButton, HStack } from '@chakra-ui/react';
import { Todo } from '../../../shared/types/todo';
import { useTodoStore } from '../model/todoStore';
import { MdDeleteOutline } from 'react-icons/md';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodoStore();

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      _hover={{
        bg: { base: 'black', _dark: 'white' },
        color: { base: 'white', _dark: 'black' },
      }}
      transition="all 0.2s"
    >
      <HStack justify="space-between">
        <HStack gap={4}>
          <Checkbox.Root onChange={() => toggleTodo(todo.id)} checked={todo.completed}>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label
              textDecoration={todo.completed ? 'line-through' : 'none'}
            >
              {todo.title}
            </Checkbox.Label>
          </Checkbox.Root>
        </HStack>
        <IconButton
          aria-label="Delete todo"
          variant="ghost"
          onClick={() => deleteTodo(todo.id)}
          _hover={{
            bg: 'bg',
            color: 'bg.inverted',
          }}
          data-hover="true"
        >
          <MdDeleteOutline />
        </IconButton>
      </HStack>
    </Box>
  );
};
