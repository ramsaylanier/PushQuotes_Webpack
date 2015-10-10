Package.describe({
  name: 'ramsay:react-components-form',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'React Form Component',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/ramsaylanier/react-components-form',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'ramsay:react-components-dependencies'
  ], 'client');

  api.addFiles(['component-form.jsx', 'component-inputs.jsx', 'component-label.jsx'], 'client');

  api.export(['Form', 'InputType', 'Label'], 'client');
});
