Package.describe({
  name: 'ramsay:react-components-core',
  version: '0.1.2',
  // Brief, one-line summary of the package.
  summary: 'Core React components',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/ramsaylanier/react-components-core',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.addFiles(['components-core.js'], 'client');

  var packages = [
    'ramsay:react-components-dependencies',
    'ramsay:react-components-nav',
    'ramsay:react-components-header',
    'ramsay:react-components-form',
    'ramsay:react-components-nav',
    'ramsay:react-components-page',
    'ramsay:react-components-modal',
    'ramsay:react-components-shelf'
  ];

  api.use(packages, 'client');
  api.imply(packages);
  api.export(['Settings', 'AnimateItem'], 'client');

});
