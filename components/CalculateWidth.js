import React from 'react';
// This function takes a component...
export default function calculateWidth(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    calculateDisplayedWidth(days) {
      if (days < 0) {
    		return calculateWidth(days * -1)
    	} else {
    		if (days/365 >= 1) {
    			return 99
    		} else {
    			return days/365 * 100
    		}
    	}
    }

    render() {
      const cssWidth = calculateDisplayedWidth(this.props.days);
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent width={cssWidth} {...this.props} />;
    }
  };
}
