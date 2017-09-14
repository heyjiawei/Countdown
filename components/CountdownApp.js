import React from 'react'
import shortid from 'shortid';

import CountdownForm from '../components/CountdownForm'
import CountdownList from '../components/CountdownList'

import {
  toggleShow,
  addCountdown,
  deleteCountdown,
  editCountdown,
  handleEdit,
  handleCancelEdit
} from '../reducers';

export default class CountdownApp extends React.Component {
	constructor() {
		super()
		this.state = {
      form: {
        id: false
      },
			countdowns: [
				{id: shortid.generate(), title: 'Driving Practice', date: new Date('2017-07-29'), color: '#8bc34a', toShow: false},
				{id: shortid.generate(), title: 'Ragnarok, always since you give me energy, when you are sad, i will be by your side. Even if you take my side, as long as i have someone as fine as you, i think ill appreciate if i continue this super duper long elastic static sentence and get this tested later', date: new Date('2017-08-15'), color: '#8bc34a', toShow: false},
				{id: shortid.generate(), title: 'Christmas', date: new Date('2018-08-25'), color: '#8bc34a', toShow: false},
				{id: shortid.generate(), title: 'Ragnarok, always since you give me energy, when you are sad, i will be by your side. Even if you take my side, as long as i have someone as fine as you, i think ill appreciate if i continue this super duper long elastic static sentence and get this tested later', date: new Date('2020-12-25'), color: '#2196f3', toShow: false},
				{id: shortid.generate(), title: 'Ragnarok, always since you give me energy, when you are sad, i will be by your side. Even if you take my side, as long as i have someone as fine as you, i think ill appreciate if i continue this super duper long elastic static sentence and get this tested later', date: new Date('2018-05-25'), color: '#2196f3', toShow: false}
			]
		}
	}

	// Checks if the submitted form is an update or a new entry
	// before updating or adding accordingly
	handleCountdownForm(data) {
    // Check if it is an update
    if (this.state.form.id == false) {
      this.setState(addCountdown(this.state, data));

    // Otherwise add new entry
    } else {
      this.setState(editCountdown(this.state, data));
    }
	}

	// Toggle buttons group view
	handleShowCountdown(id) {
    this.setState(toggleShow(this.state, id));
	}

	handleDelete(id) {
    this.setState(deleteCountdown(this.state, id));
	}

	handleEdit(id) {
    this.setState(handleEdit(this.state, id));
	}

	handleCancelEdit() {
    this.setState(handleCancelEdit());
	}

	render() {
		return (
			<div>
				<CountdownForm
					data={this.state.form}
					onCancelEdit={() => this.handleCancelEdit()}
					onSubmit={(data) => this.handleCountdownForm(data)}
				/>
				<CountdownList
					countdowns={this.state.countdowns}
					onClick={(id) => this.handleShowCountdown(id)}
					onEdit={(id) => this.handleEdit(id)}
					onDelete={(id) => this.handleDelete(id)}
				/>
			</div>
		)
	}
}
