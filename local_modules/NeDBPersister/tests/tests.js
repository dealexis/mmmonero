"use strict"
//
const context = require('./tests_context').NewHydratedContext()
//
const async = require('async')
async.series(
	[
		__proceedTo_test_updateWallet,
		__proceedTo_test_findWallet,
		__proceedTo_test_removeWallet
	]
)
//
function __proceedTo_test_updateWallet(fn)
{
	console.log("> __test_updateWallet")
	var query =
	{
		"key": "some encrypted secret"
	}
	var update =
	{
		"key": "some encrypted secret"
	}
	var options =
	{
		upsert: true,
		multi: false,
		returnUpdatedDocs: true
	}
	context.persister.updateDocuments(
		"wallets",
		query,
		update,
		options,
		function(
			err,
			numAffected,
			affectedDocuments,
			upsert
		)
		{

			console.log("err,  numAffected,  affectedDocuments,  upsert,",
						err,
						numAffected,
						affectedDocuments,
						upsert)

			fn(err)
		}
	)
}
function __proceedTo_test_findWallet(fn)
{
	console.log("> __test_findWallet")
	context.persister.documentsWithQuery(
		"wallets",
		{ "key": "some encrypted secret" },
		{},
		function(err, docs)
		{
			console.log("err", err)
			console.log("docs", docs)
			fn(err)
		}
	)
}
function __proceedTo_test_removeWallet(fn)
{
	console.log("> __test_removeWallet")
	context.persister.removeDocuments(
		"wallets",
		{ "key": "some encrypted secret" },
		null,
		function(err, numRemoved)
		{
			console.log("err")
			console.log("numRemoved", numRemoved)
			fn(err)
		}
	)
}