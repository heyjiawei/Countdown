import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import BlockLayout from '../components/CountdownBlockLayout';
import InlineBlockLayout from '../components/CountdownInlineBlockLayout';

describe('Countdown Block/InlineBlock Layout', () => {
  it('should render BlockLayout correctly', () => {
    const props = {id: '1', title: 'Driving Practice', days: 365, color: '#8bc34a', toShow: false};
    const clickHandler = jest.fn();
    const output = shallow(
      <BlockLayout
        title={props.title}
        days={props.days}
        color={props.color}
        onClick={clickHandler}
      />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render InlineBlockLayout correctly', () => {
    const props = {id: '1', title: 'Driving Practice', days: 36, color: '#8bc34a', toShow: false};
    const clickHandler = jest.fn();
    const output = shallow(
      <InlineBlockLayout
        title={props.title}
        days={props.days}
        color={props.color}
        onClick={clickHandler}
      />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render number of days, title and color correctly', () => {
    const props = {id: '1', title: 'Driving Practice', days: 365, color: '#8bc34a', toShow: false};
    const clickHandler = jest.fn();
    const blockLayout = shallow(
      <BlockLayout
        title={props.title}
        days={props.days}
        color={props.color}
        onClick={clickHandler}
      />
    );
    expect(blockLayout.find('span').at(0).text()).toEqual('365');
    expect(blockLayout.find('span').at(1).text()).toEqual('Driving Practice');
    expect(blockLayout.find('div').get(1).props.style.backgroundColor).toEqual('#8bc34a');
  });
  // can you test window resize? (Probably using mount from enzyme)
});
