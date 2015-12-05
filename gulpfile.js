"use strict";

var vitreumTasks = require("vitreum/tasks")
var gulp = require("gulp")


var gulp = vitreumTasks(gulp, {
	entryPoints: ["./client/gifbin", "./client/admin"],
	DEV: true,

	buildPath: "./build/",
	pageTemplate: "./client/template.dot",

	projectModules: ["./shared/gifbin"],
	additionalRequirePaths : ['./shared'],
	assetExts: ["*.svg", "*.png", "*.ico", "*.swf"],

	serverWatchPaths: ["server"],
	serverScript: "server.js",

	libs : [
		'react',
		'react-dom',
		'lodash',
		'classnames',
		'superagent',
		'url-pattern',
		'moment',
		'flux',

		'pico-router',
		'pico-flux'
	],

	clientLibs : [

	]
});


