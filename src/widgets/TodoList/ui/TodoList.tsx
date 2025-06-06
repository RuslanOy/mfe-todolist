import React, { useEffect, useState } from 'react';
import { Box, VStack, Input, Button, Spinner, Text } from '@chakra-ui/react';
import { TodoItem } from '../../../entities/todo/ui/TodoItem';
import { useTodoStore } from '../../../entities/todo/model/todoStore';
import { toaster } from '@/shared/chakra/ui/toaster';

export const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const { todos, isLoading, error, fetchTodos, addTodo } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) {
      toaster.create({
        title: 'Ошибка',
        description: 'Задача не может быть пустой',
      });
      return;
    }

    await addTodo(newTodo);
    setNewTodo('');
  };

  if (error) {
    return (
      <Text color="red.500" textAlign="center">
        {error}
      </Text>
    );
  }

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <VStack gap={4} align="stretch">
        <Box display="flex" gap={2}>
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Добавить новую задачу"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          />
          <Button colorScheme="blue" onClick={handleAddTodo} loading={isLoading}>
            Добавить
          </Button>
        </Box>

        {isLoading ? (
          <Box textAlign="center" py={4}>
            <Spinner />
          </Box>
        ) : (
          <VStack gap={2} align="stretch">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  );
};
