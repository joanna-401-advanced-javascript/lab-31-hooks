import React from 'react';
import Todo from '../components/todo/todo';

describe('<Todo/>', () => {
  test('basic rendering', () => {
    const app = shallow(<Todo />);
    expect(app.find('section').exists()).toBe(true);
  });
});
