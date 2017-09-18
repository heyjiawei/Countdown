import {
  addCountdown,
  deleteCountdown,
  editCountdown
} from '../reducers';

describe('State Functions', () => {
  it('added a countdown, expect app to have 1 countdown', () => {
    const state = {
      countdowns: []
    };

    const added = {
      title: 'hello world',
      date: new Date(),
      color: '#8bc34a'
    };

    const finState = addCountdown(state, added);
    expect(finState.countdowns.length).toBe(1);
  });

  it('deleted a countdown, expect app to have 0 countdown', () => {
    const state = {
      countdowns: [{
        id: '1',
        title: 'Driving Practice',
        date: new Date('2017-07-29'),
        color: '#8bc34a',
        toShow: false
      }]
    };

    const finState = deleteCountdown(state, '1');
    expect(finState.countdowns).toEqual([]);
  });

  it('edited a countdown, expect date to be different', () => {
    const state = {
      countdowns: [{
        id: '1',
        title: 'Drifting Practice',
        date: new Date('2017-07-29'),
        color: '#fff',
        toShow: true
      }, {
        id: '2',
        title: 'Drifting Machine',
        date: new Date('2017-07-29'),
        color: '#fff',
        toShow: true
      }]
    }

    const update = {
      id: '1',
      title: 'Drive Practical',
      date: new Date('2017-07-29'),
      color: '#fff',
      toShow: false
    }

    const expectedState = {
      countdowns: [{
        id: '1',
        title: 'Drive Practical',
        date: new Date('2017-07-29'),
        color: '#fff',
        toShow: false
      },{
        id: '2',
        title: 'Drifting Machine',
        date: new Date('2017-07-29'),
        color: '#fff',
        toShow: true
      }],
      form: {
        id: false
      }
    }

    const finState = editCountdown(state, update);
    expect(finState).toEqual(expectedState);
  });
});
