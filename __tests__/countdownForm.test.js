import React from 'react';
import { shallow, mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CountdownForm from '../components/CountdownForm';

describe('CountdownForm component', () => {
  let countdownForm;
  let data;
  let cancelEditHandler;
  let submitHandler;

  beforeEach(() => {
    cancelEditHandler = jest.fn();
    submitHandler = jest.fn();
    data = {
      id: false
    };

    countdownForm = mount(
      <MuiThemeProvider>
        <CountdownForm
          data={data}
          onCancelEdit={cancelEditHandler}
          onSubmit={submitHandler}
        />
      </MuiThemeProvider>
      , {context: {MuiThemeProvider}});
  });

  it('clicking submit button calls onSubmit', () => {
    // const button = countdownForm.find('FlatButton').at(1);
    console.log(countdownForm);
    // const input = add.find('input').first();
    // input.simulate('change', { target: { value: 'Name 4' } });
    // button.simulate('click');
    // expect(onAdd).toBeCalledWith('Name 4');
  });
});
