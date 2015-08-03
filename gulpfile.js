"use strict";

var vitreum = require("vitreum"),
	gulp = require("gulp")


var gulp = vitreum.tasks(gulp, {
	entryPoints: ["./client/gifbin", "./client/admin"],
	DEV: true,

	projectType : "WEB_APP",

	buildPath: "./build/",
	pageTemplate: "./client/template.hbs",

	projectModules: ["./node_modules/gifbin", ],
	assetExts: ["*.svg", "*.png", "*.ico", "*.swf"],

	serverWatchPaths: ["server", "server.js"],
	serverScript: "server.js",
	cdn: {
		"react" : ["window.React","<script src='//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.js'></script>"],
		"jquery" : ["window.jQuery","<script src='//code.jquery.com/jquery-1.11.0.min.js'></script>"],
		"underscore" : ["window._", "<script src='//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js'></script>"],
		"moment" : ["window.moment", "<script src='//cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js'></script>"],
		"zeroclipboard" : ["window.ZeroClipboard", "<script src='//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.2.0/ZeroClipboard.min.js'></script>"],

		//"lodash" : ["window._","<script src='//cdnjs.cloudflare.com/ajax/libs/lodash.js/3.3.0/lodash.min.js'></script>"],

	},
	libs: [],
});


