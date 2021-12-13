const express = require('express');
const path = require('path');
const hbs = require('hbs');

function config(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.set('view engine', 'hbs');

  hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });
  hbs.registerHelper('json', function (context) {
    return JSON.stringify(context);
  });
  app.set('views', path.join(__dirname, '..', 'views'));
}

module.exports = { config };
