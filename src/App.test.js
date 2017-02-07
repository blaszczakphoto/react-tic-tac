import React from 'react';
import ReactDOM from 'react-dom';
import Game from './App';
import { mount, shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game />, div);
});

it('sum properly', () => {
  expect(2+2).toBe(4);
});

xit('has 3 board rows', () => {
  const wrapper = mount(<Game />);
  
  expect(wrapper.find('.board-row')).to.have.length(3)
});

it('calculate position based on square number', () => {
	const wrapper = shallow(<Game />);
  expect(wrapper.instance().calculateCoords(3)).toBe('(1,3)');
});


