# cm-widget
Widget to collect feedback and send it to the Crowdmap application.

## Installation

Using npm :

```
$ npm i -g npm
$ npm i --save crowdmap-widget
```


## Init the widget

Initialize the widget on all pages you want it :

```
wiymWidget.init(
  {
    team  : 'YOUR_ORGANIZATION_NAME', // Required, the organization name who specified when you create your account on https://app.crowdmap.io
    tags  : ['userinsight', 'explorer'], // Optional. Array of tags.
    email : 'erwan.lumbroso@atinternet.com',  // Optional. Email of the author, if not specified, an input will appear in the widget.
    language:'en', // Widget language, accepted values : 'en' (default) or 'fr'
    theme: 'light' // Widget theme, accepted values : 'dark' (default) or 'light'
  });
```

[See our documentation](https://crowdmapsupport.gitbook.io/knowledgebase/collect-feedback/widget "Crowdmap - Knowledge base") if you want more information or contact us on contact@crowdmap.io
