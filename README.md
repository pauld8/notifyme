# NotyMe
Simple javascript pop-up notifications. jQuery is required.

## Current Version
1.0.0

## Install

#### [npm](https://www.npmjs.com/package/notyme)
```
npm install --save notyme
```

### Integration

1. Link to notifications.css

2. Link to notifications.js

3. Use $.notification() to display a notification (types: success, danger, warning, info)
	```js
	$.notification('message', { options });
	```
## Example
```
$.notification('Please fill out the missing details', {
	type: 'danger',
	allowClose: false,
	onHide: function() {
		// do something with the form... etc
	}
});
```
	
### Default options

```
$.notification.defaults = {
	type: 'success',
	allowClose: true,
	timeout: 5000,
	maxWidth: 500,
	onHide: null,
	onShow: null
};
```

## Copyright
Copyright © 2018
