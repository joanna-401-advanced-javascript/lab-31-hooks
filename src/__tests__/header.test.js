import React from 'react';
import Header from '../components/header/header';

describe('<Header/>', () => {
  test('basic rendering', () => {
    const app = shallow(<Header />);
    expect(app.find('header').exists()).toBe(true);
  });
});
