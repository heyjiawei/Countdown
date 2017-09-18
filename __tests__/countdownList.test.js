import CountdownList from '../components/CountdownList';
import React from 'react';
import {mount} from 'enzyme';

describe('Test coundown event listeners', () => {
  it('clicking a countdown returns its id', () => {
    const countdowns = [
      {id: '99wdawdadwa', title: 'Driving Practice', date: new Date('2017-07-29'), color: '#8bc34a', toShow: false}
    ];
    const clickHandler = jest.fn();
    const wrapper = mount(
      <CountdownList countdowns={countdowns} onClick={clickHandler} />
    );

    wrapper.find('.toggle-option').at(0).simulate('click');
    expect(clickHandler).toBeCalledWith('99wdawdadwa');
  });
});
