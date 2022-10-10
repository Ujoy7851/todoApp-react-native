/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import DateHead from './components/DateHead';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TodoList from './components/TodoList';

function App() {
  const today = new Date();
  const [todos, setTodos] = useState([]);

  const onInsert = text => {
    const nextId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const todo = {
      id: nextId,
      text,
      done: false
    };
    setTodos(todos.concat(todo));
  };

  const onToggle = id => {
    const nextTodos = todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo);
    setTodos(nextTodos);
  }

  const onRemove = id => {
    const nextTodos = todos.filter(todo => todo.id !== id);
    setTodos(nextTodos);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.block} edge={['bottom']}>
        <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={styles.avoid}>
          <DateHead date={today} />
          {todos.length === 0 ? <Empty /> : <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />}
          <AddTodo onInsert={onInsert} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
});

export default App;
