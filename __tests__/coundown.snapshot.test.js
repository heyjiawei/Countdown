import Countdown from '../components/Countdown';
import renderer from 'react-test-renderer';
import React from 'react';

describe('Snapshot test on countdown', () => {
  it('Countdown component renders correctly', () => {
    const countdown = {id: '1', title: 'Driving Practice', date: new Date('2017-07-29'), color: '#8bc34a', toShow: false};

    // const rendered = renderer.create(
    //   <Countdown countdowns={countdowns} />
    // );
    // expect(rendered.toJSON()).toMatchSnapshot();
  });
});
