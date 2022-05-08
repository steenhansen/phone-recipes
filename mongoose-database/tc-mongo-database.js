


const  {TypeCzech} = require ('../import-2-require/TypeCzech-2-require');



const { NOP_TYPE_CZECH } =require( '../import-2-require/common-2-require');



let type_czech = NOP_TYPE_CZECH;



if (global.GLOBAL_CONFIG.G_TYPE_CZECH_ON) {
  const { TypeCzech } = require('../import-2-require/TypeCzech-2-require');
  type_czech = TypeCzech(...global.GLOBAL_CONFIG.G_TYPE_CZECH_OPTIONS)
}





function PRE_readConfig(the_dirname, credentials_file) {
  const the_params = [the_dirname, credentials_file]
  const type_issue = type_czech.checkParam_type(the_params, ['string', 'string'])
  if (type_issue)
    return type_issue
  const empty_issue = type_czech.checkParam_empty(the_params, ['EMPTY-ERROR', 'EMPTY-ERROR'])
  if (empty_issue)
    return empty_issue
}

function POST_readConfig(the_result) {
  const result_types = {
    GLOBAL_CONFIG: {
      G_SELENIUM_TESTING: 'boolean',
      G_TYPE_CZECH_OPTIONS: ['strings'],
      G_TYPE_CZECH_ON:'boolean',
      G_TYPE_CZECH_OPTIONS: ['strings'],
    },
    HIDDEN_CREDENTIALS: {
      MONGO_URI: 'string',  GOOGLE_CLIENT_ID: 'string', GOOGLE_CLIENT_SECRET: 'string', SESSION_SECRET: 'string'
    }
  };
  const type_issue = type_czech.checkParam_type(the_result, result_types)
  if (type_issue)
    return type_issue

  const result_empties = {
    GLOBAL_CONFIG: {
      G_SELENIUM_TESTING: 'IG',
      G_TYPE_CZECH_OPTIONS: ['IG'],
      G_TYPE_CZECH_ON:'IG',
      G_TYPE_CZECH_OPTIONS: ['IG'],
    },
    HIDDEN_CREDENTIALS: {
      MONGO_URI: 'EMPTY-ERROR',  GOOGLE_CLIENT_ID: 'EMPTY-ERROR', GOOGLE_CLIENT_SECRET: 'EMPTY-ERROR', SESSION_SECRET: 'EMPTY-ERROR'
    }
  };
  const empty_issue = type_czech.checkParam_empty(the_result, result_empties)
  if (empty_issue)
    return empty_issue
}


function PRE_getMongoCred(the_dirname, credentials_file) {
  const the_params = [the_dirname, credentials_file]
  const the_sig = [['string', 'string'], ['string', 'boolean']]
  const type_issue = type_czech.checkParam_typeEither(the_params, the_sig)
  if (type_issue)
    return type_issue
  const empty_issue = type_czech.checkParam_empty(the_params, ['EMPTY-ERROR', 'IG'])
  if (empty_issue)
    return empty_issue
}

function POST_getMongoCred(the_result) {
  const type_issue = type_czech.checkParam_type(the_result, 'string')
  if (type_issue)
    return type_issue
  if (!the_result.startsWith('mongodb:'))
    return "POST_getMongoCred, error mongodb didn't return valid " + the_result;
}

function PRE_dbConnect(the_dirname, credentials_file) {
  const the_params = [the_dirname, credentials_file]
  const the_sig = [['string', 'string'], ['string', 'boolean']]
  const type_issue = type_czech.checkParam_typeEither(the_params, the_sig)
  if (type_issue)
    return type_issue
  const empty_issue = type_czech.checkParam_empty(the_params, ['EMPTY-ERROR', 'IG'])
  if (empty_issue)
    return empty_issue
}

function POST_dbConnect(the_result) {
  const the_sig = { Recipes_coll: 'function', Comments_coll: 'function' };
  const type_issue = type_czech.check_interface(the_result, the_sig)
  if (type_issue)
    return type_issue

  const { Recipes_coll, Comments_coll } = the_result;
  if (Recipes_coll.collection?.name !== 'recipes')
    return "POST_dbConnect got wrong recipe collection name : " + Recipes_coll.collection.name
  if (Comments_coll.collection?.name !== 'comments')
    return "POST_dbConnect got wrong comments collection name : " + Comments_coll.collection.name
}

function PRE_deVersionMongo(an_object) {
  const type_issue = type_czech.checkParam_typeEither(an_object, ['object', 'array'])
  if (type_issue)
    return type_issue
}

function POST_deVersionMongo(the_result) {
  const type_issue = type_czech.checkParam_typeEither(the_result, ['object', 'array'])
  if (type_issue)
    return type_issue
}


module.exports = {
  type_czech,
  PRE_readConfig, POST_readConfig,
  PRE_getMongoCred, POST_getMongoCred,
  PRE_dbConnect, POST_dbConnect,
  PRE_deVersionMongo, POST_deVersionMongo,
};