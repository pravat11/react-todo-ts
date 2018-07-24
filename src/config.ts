const config = {
  // baseURL: 'https://intense-sands-36022.herokuapp.com/api',
  baseURL: 'http://127.0.0.1:8848/api',
  apis: {
    login: '/login',
    createTodo: '/todo',
    fetchAllTodos: 'todos',
    individualTodo: '/todo/{id}',
    fetchVisibilityFilters: '/visibility-filters'
  }
};

export default config;
