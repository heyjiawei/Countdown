import React from 'react';
import { mount } from 'enzyme';

import CountdownList from '../components/CountdownList';
import Countdown from '../components/Countdown';

describe('Test coundownList', () => {
  it('clicking a countdown returns its id', () => {
    const countdowns = [
      {id: '1testingId', title: 'Driving Practice', date: new Date('2017-07-29'), color: '#8bc34a', toShow: false}
    ];
    const clickHandler = jest.fn();
    const deleteHandler = jest.fn();
    const editHandler = jest.fn();
    const wrapper = mount(
      <CountdownList countdowns={countdowns}
        onClick={clickHandler}
        onDelete={deleteHandler}
        onEdit={editHandler} />
    );

    wrapper.find('.toggle-option').at(0).simulate('click');
    expect(clickHandler).toBeCalledWith('1testingId');
  });

  // it('clicking a countdown renders a div', () => {
  //
  // });
});
