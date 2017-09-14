import shortid from 'shortid'

export function toggleShow(state, id) {
  const countdowns = state.countdowns.map((countdown) => {
    if (countdown.id === id) {
      countdown.toShow = !countdown.toShow;
    }
    return countdown;
  });
  return { countdowns };
}

export function addCountdown(state, countdown) {
  const newCountdown = Object.assign({}, countdown, {
    id: shortid.generate(),
    toShow: false
  });

  return {
    countdowns: state.countdowns.concat([newCountdown])
  };
}

export function editCountdown(state, countdown) {
  const update = Object.assign({}, countdown, {
    toshow: false
  });

  return {
    countdowns: state.countdowns.map((obj) => {
      if (obj.id === update.id) {
        return update;
      } else {
        return obj;
      }
    }),
    form: {
      id: false
    }
  };
}

export function deleteCountdown(state, id) {
  return {
    countdowns: state.countdowns.filter((countdown) => countdown.id !== id)
  }
}

export function handleEdit(state, id) {
  const editCountdown = state.countdowns.filter((countdown) => countdown.id === id)[0];
  return {
    form: {
      title: editCountdown.title,
      color: editCountdown.color,
      date: editCountdown.date,
      id: editCountdown.id
    }
  }
}

export function handleCancelEdit() {
  return {
    form: {
      id: false
    }
  };
}
