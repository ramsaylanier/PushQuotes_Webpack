Package.describe({
  name: 'ramsay:react-components-nav',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'React Nav component',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/ramsaylanier/react-components-nav',
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'ramsay:react-components-dependencies'
  ], 'client');


  api.addFiles('component-nav.jsx', 'client');

  api.export(['NavList', 'SubNavList', 'NavItem', 'Nav', 'Navs', 'getNavs'], 'client');
});
