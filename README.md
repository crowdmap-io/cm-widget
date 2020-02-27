# Crowdmap widget
Widget to collect feedback and send it to the Crowdmap application.

## Installation

Using npm :

```
$ npm i --save cm-widget
```

## Initialise the widget

Initialise the widget on all pages you want it :

```html
<script src="dist/cm-widget.min.js"></script>
```

```javascript
cmWidget.init(
  {
    team  : 'YOUR_ORGANIZATION_NAME', // Required, the organization name who specified when you create your account on https://app.crowdmap.io
    tags  : ['website', 'bug'], // Optional. Array of tags.
    email : 'erwan@crowdmap.io',  // Optional. Email of the author, if not specified, an input will appear in the widget.
    language:'en', // Widget language, accepted values : 'en' (default) or 'fr'
    theme: 'light' // Widget theme, accepted values : 'dark' (default) or 'light'
  });
```

[See our documentation](https://crowdmapsupport.gitbook.io/knowledgebase/collect-feedback/widget "Crowdmap - Knowledge base") if you want more information or contact us on contact@crowdmap.io

## Features

### Show / hide widget 

```javascript
cmWidget.showWidget();
cmWidget.hideWidget();
```

### Add & remove tag

```javascript
cmWidget.removeTag("website");
cmWidget.addTag("website");
```

### Edit the email

```javascript
cmWidget.setEmail("ben@crowdmap.io");
```