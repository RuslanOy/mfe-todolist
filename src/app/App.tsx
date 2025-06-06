import React from 'react';
import { Container, Heading, VStack } from '@chakra-ui/react';
import { TodoList } from '../widgets/TodoList/ui/TodoList';

const App = (): React.ReactElement => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8}>
        <Heading>Todo List</Heading>
        <TodoList />
      </VStack>
    </Container>
  );
};

export default App;
