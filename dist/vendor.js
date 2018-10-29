/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Dropbox = factory());
}(this, (function () { 'use strict';

// Auto-generated by Stone, do not modify.
var routes = {};

/**
 * Creates an OAuth 2.0 access token from the supplied OAuth 1.0 access token.
 * @function Dropbox#authTokenFromOauth1
 * @arg {AuthTokenFromOAuth1Arg} arg - The request parameters.
 * @returns {Promise.<AuthTokenFromOAuth1Result, Error.<AuthTokenFromOAuth1Error>>}
 */
routes.authTokenFromOauth1 = function (arg) {
  return this.request('auth/token/from_oauth1', arg, 'app', 'api', 'rpc');
};

/**
 * Disables the access token used to authenticate the call.
 * @function Dropbox#authTokenRevoke
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<void, Error.<void>>}
 */
routes.authTokenRevoke = function (arg) {
  return this.request('auth/token/revoke', arg, 'user', 'api', 'rpc');
};

/**
 * Add property groups to a Dropbox file. See templates/add_for_user or
 * templates/add_for_team to create new templates.
 * @function Dropbox#filePropertiesPropertiesAdd
 * @arg {FilePropertiesAddPropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesAddPropertiesError>>}
 */
routes.filePropertiesPropertiesAdd = function (arg) {
  return this.request('file_properties/properties/add', arg, 'user', 'api', 'rpc');
};

/**
 * Overwrite property groups associated with a file. This endpoint should be
 * used instead of properties/update when property groups are being updated via
 * a "snapshot" instead of via a "delta". In other words, this endpoint will
 * delete all omitted fields from a property group, whereas properties/update
 * will only delete fields that are explicitly marked for deletion.
 * @function Dropbox#filePropertiesPropertiesOverwrite
 * @arg {FilePropertiesOverwritePropertyGroupArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesInvalidPropertyGroupError>>}
 */
routes.filePropertiesPropertiesOverwrite = function (arg) {
  return this.request('file_properties/properties/overwrite', arg, 'user', 'api', 'rpc');
};

/**
 * Permanently removes the specified property group from the file. To remove
 * specific property field key value pairs, see properties/update. To update a
 * template, see templates/update_for_user or templates/update_for_team.
 * Templates can't be removed once created.
 * @function Dropbox#filePropertiesPropertiesRemove
 * @arg {FilePropertiesRemovePropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesRemovePropertiesError>>}
 */
routes.filePropertiesPropertiesRemove = function (arg) {
  return this.request('file_properties/properties/remove', arg, 'user', 'api', 'rpc');
};

/**
 * Search across property templates for particular property field values.
 * @function Dropbox#filePropertiesPropertiesSearch
 * @arg {FilePropertiesPropertiesSearchArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesPropertiesSearchResult, Error.<FilePropertiesPropertiesSearchError>>}
 */
routes.filePropertiesPropertiesSearch = function (arg) {
  return this.request('file_properties/properties/search', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from properties/search, use this to paginate
 * through all search results.
 * @function Dropbox#filePropertiesPropertiesSearchContinue
 * @arg {FilePropertiesPropertiesSearchContinueArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesPropertiesSearchResult, Error.<FilePropertiesPropertiesSearchContinueError>>}
 */
routes.filePropertiesPropertiesSearchContinue = function (arg) {
  return this.request('file_properties/properties/search/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Add, update or remove properties associated with the supplied file and
 * templates. This endpoint should be used instead of properties/overwrite when
 * property groups are being updated via a "delta" instead of via a "snapshot" .
 * In other words, this endpoint will not delete any omitted fields from a
 * property group, whereas properties/overwrite will delete any fields that are
 * omitted from a property group.
 * @function Dropbox#filePropertiesPropertiesUpdate
 * @arg {FilePropertiesUpdatePropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesUpdatePropertiesError>>}
 */
routes.filePropertiesPropertiesUpdate = function (arg) {
  return this.request('file_properties/properties/update', arg, 'user', 'api', 'rpc');
};

/**
 * Add a template associated with a team. See properties/add to add properties
 * to a file or folder. Note: this endpoint will create team-owned templates.
 * @function Dropbox#filePropertiesTemplatesAddForTeam
 * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesAddTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes.filePropertiesTemplatesAddForTeam = function (arg) {
  return this.request('file_properties/templates/add_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Add a template associated with a user. See properties/add to add properties
 * to a file. This endpoint can't be called on a team member or admin's behalf.
 * @function Dropbox#filePropertiesTemplatesAddForUser
 * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesAddTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes.filePropertiesTemplatesAddForUser = function (arg) {
  return this.request('file_properties/templates/add_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Get the schema for a specified template.
 * @function Dropbox#filePropertiesTemplatesGetForTeam
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesGetForTeam = function (arg) {
  return this.request('file_properties/templates/get_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Get the schema for a specified template. This endpoint can't be called on a
 * team member or admin's behalf.
 * @function Dropbox#filePropertiesTemplatesGetForUser
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesGetForUser = function (arg) {
  return this.request('file_properties/templates/get_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Get the template identifiers for a team. To get the schema of each template
 * use templates/get_for_team.
 * @function Dropbox#filePropertiesTemplatesListForTeam
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesListForTeam = function (arg) {
  return this.request('file_properties/templates/list_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Get the template identifiers for a team. To get the schema of each template
 * use templates/get_for_user. This endpoint can't be called on a team member or
 * admin's behalf.
 * @function Dropbox#filePropertiesTemplatesListForUser
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesListForUser = function (arg) {
  return this.request('file_properties/templates/list_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Permanently removes the specified template created from
 * templates/add_for_user. All properties associated with the template will also
 * be removed. This action cannot be undone.
 * @function Dropbox#filePropertiesTemplatesRemoveForTeam
 * @arg {FilePropertiesRemoveTemplateArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesRemoveForTeam = function (arg) {
  return this.request('file_properties/templates/remove_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Permanently removes the specified template created from
 * templates/add_for_user. All properties associated with the template will also
 * be removed. This action cannot be undone.
 * @function Dropbox#filePropertiesTemplatesRemoveForUser
 * @arg {FilePropertiesRemoveTemplateArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesRemoveForUser = function (arg) {
  return this.request('file_properties/templates/remove_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Update a template associated with a team. This route can update the template
 * name, the template description and add optional properties to templates.
 * @function Dropbox#filePropertiesTemplatesUpdateForTeam
 * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesUpdateTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes.filePropertiesTemplatesUpdateForTeam = function (arg) {
  return this.request('file_properties/templates/update_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Update a template associated with a user. This route can update the template
 * name, the template description and add optional properties to templates. This
 * endpoint can't be called on a team member or admin's behalf.
 * @function Dropbox#filePropertiesTemplatesUpdateForUser
 * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesUpdateTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes.filePropertiesTemplatesUpdateForUser = function (arg) {
  return this.request('file_properties/templates/update_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Creates a file request for this user.
 * @function Dropbox#fileRequestsCreate
 * @arg {FileRequestsCreateFileRequestArgs} arg - The request parameters.
 * @returns {Promise.<FileRequestsFileRequest, Error.<FileRequestsCreateFileRequestError>>}
 */
routes.fileRequestsCreate = function (arg) {
  return this.request('file_requests/create', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the specified file request.
 * @function Dropbox#fileRequestsGet
 * @arg {FileRequestsGetFileRequestArgs} arg - The request parameters.
 * @returns {Promise.<FileRequestsFileRequest, Error.<FileRequestsGetFileRequestError>>}
 */
routes.fileRequestsGet = function (arg) {
  return this.request('file_requests/get', arg, 'user', 'api', 'rpc');
};

/**
 * Returns a list of file requests owned by this user. For apps with the app
 * folder permission, this will only return file requests with destinations in
 * the app folder.
 * @function Dropbox#fileRequestsList
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FileRequestsListFileRequestsResult, Error.<FileRequestsListFileRequestsError>>}
 */
routes.fileRequestsList = function (arg) {
  return this.request('file_requests/list', arg, 'user', 'api', 'rpc');
};

/**
 * Update a file request.
 * @function Dropbox#fileRequestsUpdate
 * @arg {FileRequestsUpdateFileRequestArgs} arg - The request parameters.
 * @returns {Promise.<FileRequestsFileRequest, Error.<FileRequestsUpdateFileRequestError>>}
 */
routes.fileRequestsUpdate = function (arg) {
  return this.request('file_requests/update', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the metadata for a file or folder. This is an alpha endpoint
 * compatible with the properties API. Note: Metadata for the root folder is
 * unsupported.
 * @function Dropbox#filesAlphaGetMetadata
 * @deprecated
 * @arg {FilesAlphaGetMetadataArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesAlphaGetMetadataError>>}
 */
routes.filesAlphaGetMetadata = function (arg) {
  return this.request('files/alpha/get_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Create a new file with the contents provided in the request. Note that this
 * endpoint is part of the properties API alpha and is slightly different from
 * upload. Do not use this to upload a file larger than 150 MB. Instead, create
 * an upload session with upload_session/start.
 * @function Dropbox#filesAlphaUpload
 * @deprecated
 * @arg {FilesCommitInfoWithProperties} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesUploadErrorWithProperties>>}
 */
routes.filesAlphaUpload = function (arg) {
  return this.request('files/alpha/upload', arg, 'user', 'content', 'upload');
};

/**
 * Copy a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be copied.
 * @function Dropbox#filesCopy
 * @deprecated
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesRelocationError>>}
 */
routes.filesCopy = function (arg) {
  return this.request('files/copy', arg, 'user', 'api', 'rpc');
};

/**
 * Copy multiple files or folders to different locations at once in the user's
 * Dropbox. If RelocationBatchArg.allow_shared_folder is false, this route is
 * atomic. If on entry failes, the whole transaction will abort. If
 * RelocationBatchArg.allow_shared_folder is true, not atomicity is guaranteed,
 * but you will be able to copy the contents of shared folders to new locations.
 * This route will return job ID immediately and do the async copy job in
 * background. Please use copy_batch/check to check the job status.
 * @function Dropbox#filesCopyBatch
 * @arg {FilesRelocationBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchLaunch, Error.<void>>}
 */
routes.filesCopyBatch = function (arg) {
  return this.request('files/copy_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for copy_batch. If success, it
 * returns list of results for each entry.
 * @function Dropbox#filesCopyBatchCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchJobStatus, Error.<AsyncPollError>>}
 */
routes.filesCopyBatchCheck = function (arg) {
  return this.request('files/copy_batch/check', arg, 'user', 'api', 'rpc');
};

/**
 * Get a copy reference to a file or folder. This reference string can be used
 * to save that file or folder to another user's Dropbox by passing it to
 * copy_reference/save.
 * @function Dropbox#filesCopyReferenceGet
 * @arg {FilesGetCopyReferenceArg} arg - The request parameters.
 * @returns {Promise.<FilesGetCopyReferenceResult, Error.<FilesGetCopyReferenceError>>}
 */
routes.filesCopyReferenceGet = function (arg) {
  return this.request('files/copy_reference/get', arg, 'user', 'api', 'rpc');
};

/**
 * Save a copy reference returned by copy_reference/get to the user's Dropbox.
 * @function Dropbox#filesCopyReferenceSave
 * @arg {FilesSaveCopyReferenceArg} arg - The request parameters.
 * @returns {Promise.<FilesSaveCopyReferenceResult, Error.<FilesSaveCopyReferenceError>>}
 */
routes.filesCopyReferenceSave = function (arg) {
  return this.request('files/copy_reference/save', arg, 'user', 'api', 'rpc');
};

/**
 * Copy a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be copied.
 * @function Dropbox#filesCopyV2
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationResult, Error.<FilesRelocationError>>}
 */
routes.filesCopyV2 = function (arg) {
  return this.request('files/copy_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Create a folder at a given path.
 * @function Dropbox#filesCreateFolder
 * @deprecated
 * @arg {FilesCreateFolderArg} arg - The request parameters.
 * @returns {Promise.<FilesFolderMetadata, Error.<FilesCreateFolderError>>}
 */
routes.filesCreateFolder = function (arg) {
  return this.request('files/create_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Create a folder at a given path.
 * @function Dropbox#filesCreateFolderV2
 * @arg {FilesCreateFolderArg} arg - The request parameters.
 * @returns {Promise.<FilesCreateFolderResult, Error.<FilesCreateFolderError>>}
 */
routes.filesCreateFolderV2 = function (arg) {
  return this.request('files/create_folder_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Delete the file or folder at a given path. If the path is a folder, all its
 * contents will be deleted too. A successful response indicates that the file
 * or folder was deleted. The returned metadata will be the corresponding
 * FileMetadata or FolderMetadata for the item at time of deletion, and not a
 * DeletedMetadata object.
 * @function Dropbox#filesDelete
 * @deprecated
 * @arg {FilesDeleteArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesDeleteError>>}
 */
routes.filesDelete = function (arg) {
  return this.request('files/delete', arg, 'user', 'api', 'rpc');
};

/**
 * Delete multiple files/folders at once. This route is asynchronous, which
 * returns a job ID immediately and runs the delete batch asynchronously. Use
 * delete_batch/check to check the job status.
 * @function Dropbox#filesDeleteBatch
 * @arg {FilesDeleteBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesDeleteBatchLaunch, Error.<void>>}
 */
routes.filesDeleteBatch = function (arg) {
  return this.request('files/delete_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for delete_batch. If success, it
 * returns list of result for each entry.
 * @function Dropbox#filesDeleteBatchCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesDeleteBatchJobStatus, Error.<AsyncPollError>>}
 */
routes.filesDeleteBatchCheck = function (arg) {
  return this.request('files/delete_batch/check', arg, 'user', 'api', 'rpc');
};

/**
 * Delete the file or folder at a given path. If the path is a folder, all its
 * contents will be deleted too. A successful response indicates that the file
 * or folder was deleted. The returned metadata will be the corresponding
 * FileMetadata or FolderMetadata for the item at time of deletion, and not a
 * DeletedMetadata object.
 * @function Dropbox#filesDeleteV2
 * @arg {FilesDeleteArg} arg - The request parameters.
 * @returns {Promise.<FilesDeleteResult, Error.<FilesDeleteError>>}
 */
routes.filesDeleteV2 = function (arg) {
  return this.request('files/delete_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Download a file from a user's Dropbox.
 * @function Dropbox#filesDownload
 * @arg {FilesDownloadArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesDownloadError>>}
 */
routes.filesDownload = function (arg) {
  return this.request('files/download', arg, 'user', 'content', 'download');
};

/**
 * Download a folder from the user's Dropbox, as a zip file. The folder must be
 * less than 1 GB in size and have fewer than 10,000 total files. The input
 * cannot be a single file.
 * @function Dropbox#filesDownloadZip
 * @arg {FilesDownloadZipArg} arg - The request parameters.
 * @returns {Promise.<FilesDownloadZipResult, Error.<FilesDownloadZipError>>}
 */
routes.filesDownloadZip = function (arg) {
  return this.request('files/download_zip', arg, 'user', 'content', 'download');
};

/**
 * Returns the metadata for a file or folder. Note: Metadata for the root folder
 * is unsupported.
 * @function Dropbox#filesGetMetadata
 * @arg {FilesGetMetadataArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesGetMetadataError>>}
 */
routes.filesGetMetadata = function (arg) {
  return this.request('files/get_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Get a preview for a file. Currently, PDF previews are generated for files
 * with the following extensions: .ai, .doc, .docm, .docx, .eps, .odp, .odt,
 * .pps, .ppsm, .ppsx, .ppt, .pptm, .pptx, .rtf. HTML previews are generated for
 * files with the following extensions: .csv, .ods, .xls, .xlsm, .xlsx. Other
 * formats will return an unsupported extension error.
 * @function Dropbox#filesGetPreview
 * @arg {FilesPreviewArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesPreviewError>>}
 */
routes.filesGetPreview = function (arg) {
  return this.request('files/get_preview', arg, 'user', 'content', 'download');
};

/**
 * Get a temporary link to stream content of a file. This link will expire in
 * four hours and afterwards you will get 410 Gone. Content-Type of the link is
 * determined automatically by the file's mime type.
 * @function Dropbox#filesGetTemporaryLink
 * @arg {FilesGetTemporaryLinkArg} arg - The request parameters.
 * @returns {Promise.<FilesGetTemporaryLinkResult, Error.<FilesGetTemporaryLinkError>>}
 */
routes.filesGetTemporaryLink = function (arg) {
  return this.request('files/get_temporary_link', arg, 'user', 'api', 'rpc');
};

/**
 * Get a thumbnail for an image. This method currently supports files with the
 * following file extensions: jpg, jpeg, png, tiff, tif, gif and bmp. Photos
 * that are larger than 20MB in size won't be converted to a thumbnail.
 * @function Dropbox#filesGetThumbnail
 * @arg {FilesThumbnailArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesThumbnailError>>}
 */
routes.filesGetThumbnail = function (arg) {
  return this.request('files/get_thumbnail', arg, 'user', 'content', 'download');
};

/**
 * Get thumbnails for a list of images. We allow up to 25 thumbnails in a single
 * batch. This method currently supports files with the following file
 * extensions: jpg, jpeg, png, tiff, tif, gif and bmp. Photos that are larger
 * than 20MB in size won't be converted to a thumbnail.
 * @function Dropbox#filesGetThumbnailBatch
 * @arg {FilesGetThumbnailBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesGetThumbnailBatchResult, Error.<FilesGetThumbnailBatchError>>}
 */
routes.filesGetThumbnailBatch = function (arg) {
  return this.request('files/get_thumbnail_batch', arg, 'user', 'content', 'rpc');
};

/**
 * Starts returning the contents of a folder. If the result's
 * ListFolderResult.has_more field is true, call list_folder/continue with the
 * returned ListFolderResult.cursor to retrieve more entries. If you're using
 * ListFolderArg.recursive set to true to keep a local cache of the contents of
 * a Dropbox account, iterate through each entry in order and process them as
 * follows to keep your local state in sync: For each FileMetadata, store the
 * new entry at the given path in your local state. If the required parent
 * folders don't exist yet, create them. If there's already something else at
 * the given path, replace it and remove all its children. For each
 * FolderMetadata, store the new entry at the given path in your local state. If
 * the required parent folders don't exist yet, create them. If there's already
 * something else at the given path, replace it but leave the children as they
 * are. Check the new entry's FolderSharingInfo.read_only and set all its
 * children's read-only statuses to match. For each DeletedMetadata, if your
 * local state has something at the given path, remove it and all its children.
 * If there's nothing at the given path, ignore this entry. Note:
 * auth.RateLimitError may be returned if multiple list_folder or
 * list_folder/continue calls with same parameters are made simultaneously by
 * same API app for same user. If your app implements retry logic, please hold
 * off the retry until the previous request finishes.
 * @function Dropbox#filesListFolder
 * @arg {FilesListFolderArg} arg - The request parameters.
 * @returns {Promise.<FilesListFolderResult, Error.<FilesListFolderError>>}
 */
routes.filesListFolder = function (arg) {
  return this.request('files/list_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_folder, use this to paginate
 * through all files and retrieve updates to the folder, following the same
 * rules as documented for list_folder.
 * @function Dropbox#filesListFolderContinue
 * @arg {FilesListFolderContinueArg} arg - The request parameters.
 * @returns {Promise.<FilesListFolderResult, Error.<FilesListFolderContinueError>>}
 */
routes.filesListFolderContinue = function (arg) {
  return this.request('files/list_folder/continue', arg, 'user', 'api', 'rpc');
};

/**
 * A way to quickly get a cursor for the folder's state. Unlike list_folder,
 * list_folder/get_latest_cursor doesn't return any entries. This endpoint is
 * for app which only needs to know about new files and modifications and
 * doesn't need to know about files that already exist in Dropbox.
 * @function Dropbox#filesListFolderGetLatestCursor
 * @arg {FilesListFolderArg} arg - The request parameters.
 * @returns {Promise.<FilesListFolderGetLatestCursorResult, Error.<FilesListFolderError>>}
 */
routes.filesListFolderGetLatestCursor = function (arg) {
  return this.request('files/list_folder/get_latest_cursor', arg, 'user', 'api', 'rpc');
};

/**
 * A longpoll endpoint to wait for changes on an account. In conjunction with
 * list_folder/continue, this call gives you a low-latency way to monitor an
 * account for file changes. The connection will block until there are changes
 * available or a timeout occurs. This endpoint is useful mostly for client-side
 * apps. If you're looking for server-side notifications, check out our webhooks
 * documentation https://www.dropbox.com/developers/reference/webhooks.
 * @function Dropbox#filesListFolderLongpoll
 * @arg {FilesListFolderLongpollArg} arg - The request parameters.
 * @returns {Promise.<FilesListFolderLongpollResult, Error.<FilesListFolderLongpollError>>}
 */
routes.filesListFolderLongpoll = function (arg) {
  return this.request('files/list_folder/longpoll', arg, 'noauth', 'notify', 'rpc');
};

/**
 * Returns revisions for files based on a file path or a file id. The file path
 * or file id is identified from the latest file entry at the given file path or
 * id. This end point allows your app to query either by file path or file id by
 * setting the mode parameter appropriately. In the ListRevisionsMode.path
 * (default) mode, all revisions at the same file path as the latest file entry
 * are returned. If revisions with the same file id are desired, then mode must
 * be set to ListRevisionsMode.id. The ListRevisionsMode.id mode is useful to
 * retrieve revisions for a given file across moves or renames.
 * @function Dropbox#filesListRevisions
 * @arg {FilesListRevisionsArg} arg - The request parameters.
 * @returns {Promise.<FilesListRevisionsResult, Error.<FilesListRevisionsError>>}
 */
routes.filesListRevisions = function (arg) {
  return this.request('files/list_revisions', arg, 'user', 'api', 'rpc');
};

/**
 * Move a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be moved.
 * @function Dropbox#filesMove
 * @deprecated
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesRelocationError>>}
 */
routes.filesMove = function (arg) {
  return this.request('files/move', arg, 'user', 'api', 'rpc');
};

/**
 * Move multiple files or folders to different locations at once in the user's
 * Dropbox. This route is 'all or nothing', which means if one entry fails, the
 * whole transaction will abort. This route will return job ID immediately and
 * do the async moving job in background. Please use move_batch/check to check
 * the job status.
 * @function Dropbox#filesMoveBatch
 * @arg {FilesRelocationBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchLaunch, Error.<void>>}
 */
routes.filesMoveBatch = function (arg) {
  return this.request('files/move_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for move_batch. If success, it
 * returns list of results for each entry.
 * @function Dropbox#filesMoveBatchCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchJobStatus, Error.<AsyncPollError>>}
 */
routes.filesMoveBatchCheck = function (arg) {
  return this.request('files/move_batch/check', arg, 'user', 'api', 'rpc');
};

/**
 * Move a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be moved.
 * @function Dropbox#filesMoveV2
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationResult, Error.<FilesRelocationError>>}
 */
routes.filesMoveV2 = function (arg) {
  return this.request('files/move_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Permanently delete the file or folder at a given path (see
 * https://www.dropbox.com/en/help/40). Note: This endpoint is only available
 * for Dropbox Business apps.
 * @function Dropbox#filesPermanentlyDelete
 * @arg {FilesDeleteArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilesDeleteError>>}
 */
routes.filesPermanentlyDelete = function (arg) {
  return this.request('files/permanently_delete', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesAdd
 * @deprecated
 * @arg {FilePropertiesAddPropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesAddPropertiesError>>}
 */
routes.filesPropertiesAdd = function (arg) {
  return this.request('files/properties/add', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesOverwrite
 * @deprecated
 * @arg {FilePropertiesOverwritePropertyGroupArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesInvalidPropertyGroupError>>}
 */
routes.filesPropertiesOverwrite = function (arg) {
  return this.request('files/properties/overwrite', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesRemove
 * @deprecated
 * @arg {FilePropertiesRemovePropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesRemovePropertiesError>>}
 */
routes.filesPropertiesRemove = function (arg) {
  return this.request('files/properties/remove', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesTemplateGet
 * @deprecated
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filesPropertiesTemplateGet = function (arg) {
  return this.request('files/properties/template/get', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesTemplateList
 * @deprecated
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filesPropertiesTemplateList = function (arg) {
  return this.request('files/properties/template/list', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesUpdate
 * @deprecated
 * @arg {FilePropertiesUpdatePropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesUpdatePropertiesError>>}
 */
routes.filesPropertiesUpdate = function (arg) {
  return this.request('files/properties/update', arg, 'user', 'api', 'rpc');
};

/**
 * Restore a file to a specific revision.
 * @function Dropbox#filesRestore
 * @arg {FilesRestoreArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesRestoreError>>}
 */
routes.filesRestore = function (arg) {
  return this.request('files/restore', arg, 'user', 'api', 'rpc');
};

/**
 * Save a specified URL into a file in user's Dropbox. If the given path already
 * exists, the file will be renamed to avoid the conflict (e.g. myfile (1).txt).
 * @function Dropbox#filesSaveUrl
 * @arg {FilesSaveUrlArg} arg - The request parameters.
 * @returns {Promise.<FilesSaveUrlResult, Error.<FilesSaveUrlError>>}
 */
routes.filesSaveUrl = function (arg) {
  return this.request('files/save_url', arg, 'user', 'api', 'rpc');
};

/**
 * Check the status of a save_url job.
 * @function Dropbox#filesSaveUrlCheckJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesSaveUrlJobStatus, Error.<AsyncPollError>>}
 */
routes.filesSaveUrlCheckJobStatus = function (arg) {
  return this.request('files/save_url/check_job_status', arg, 'user', 'api', 'rpc');
};

/**
 * Searches for files and folders. Note: Recent changes may not immediately be
 * reflected in search results due to a short delay in indexing.
 * @function Dropbox#filesSearch
 * @arg {FilesSearchArg} arg - The request parameters.
 * @returns {Promise.<FilesSearchResult, Error.<FilesSearchError>>}
 */
routes.filesSearch = function (arg) {
  return this.request('files/search', arg, 'user', 'api', 'rpc');
};

/**
 * Create a new file with the contents provided in the request. Do not use this
 * to upload a file larger than 150 MB. Instead, create an upload session with
 * upload_session/start.
 * @function Dropbox#filesUpload
 * @arg {FilesCommitInfo} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesUploadError>>}
 */
routes.filesUpload = function (arg) {
  return this.request('files/upload', arg, 'user', 'content', 'upload');
};

/**
 * Append more data to an upload session. A single request should not upload
 * more than 150 MB.
 * @function Dropbox#filesUploadSessionAppend
 * @deprecated
 * @arg {FilesUploadSessionCursor} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilesUploadSessionLookupError>>}
 */
routes.filesUploadSessionAppend = function (arg) {
  return this.request('files/upload_session/append', arg, 'user', 'content', 'upload');
};

/**
 * Append more data to an upload session. When the parameter close is set, this
 * call will close the session. A single request should not upload more than 150
 * MB.
 * @function Dropbox#filesUploadSessionAppendV2
 * @arg {FilesUploadSessionAppendArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilesUploadSessionLookupError>>}
 */
routes.filesUploadSessionAppendV2 = function (arg) {
  return this.request('files/upload_session/append_v2', arg, 'user', 'content', 'upload');
};

/**
 * Finish an upload session and save the uploaded data to the given file path. A
 * single request should not upload more than 150 MB.
 * @function Dropbox#filesUploadSessionFinish
 * @arg {FilesUploadSessionFinishArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesUploadSessionFinishError>>}
 */
routes.filesUploadSessionFinish = function (arg) {
  return this.request('files/upload_session/finish', arg, 'user', 'content', 'upload');
};

/**
 * This route helps you commit many files at once into a user's Dropbox. Use
 * upload_session/start and upload_session/append_v2 to upload file contents. We
 * recommend uploading many files in parallel to increase throughput. Once the
 * file contents have been uploaded, rather than calling upload_session/finish,
 * use this route to finish all your upload sessions in a single request.
 * UploadSessionStartArg.close or UploadSessionAppendArg.close needs to be true
 * for the last upload_session/start or upload_session/append_v2 call. This
 * route will return a job_id immediately and do the async commit job in
 * background. Use upload_session/finish_batch/check to check the job status.
 * For the same account, this route should be executed serially. That means you
 * should not start the next job before current job finishes. We allow up to
 * 1000 entries in a single request.
 * @function Dropbox#filesUploadSessionFinishBatch
 * @arg {FilesUploadSessionFinishBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesUploadSessionFinishBatchLaunch, Error.<void>>}
 */
routes.filesUploadSessionFinishBatch = function (arg) {
  return this.request('files/upload_session/finish_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for upload_session/finish_batch. If
 * success, it returns list of result for each entry.
 * @function Dropbox#filesUploadSessionFinishBatchCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesUploadSessionFinishBatchJobStatus, Error.<AsyncPollError>>}
 */
routes.filesUploadSessionFinishBatchCheck = function (arg) {
  return this.request('files/upload_session/finish_batch/check', arg, 'user', 'api', 'rpc');
};

/**
 * Upload sessions allow you to upload a single file in one or more requests,
 * for example where the size of the file is greater than 150 MB.  This call
 * starts a new upload session with the given data. You can then use
 * upload_session/append_v2 to add more data and upload_session/finish to save
 * all the data to a file in Dropbox. A single request should not upload more
 * than 150 MB. An upload session can be used for a maximum of 48 hours.
 * Attempting to use an UploadSessionStartResult.session_id with
 * upload_session/append_v2 or upload_session/finish more than 48 hours after
 * its creation will return a UploadSessionLookupError.not_found.
 * @function Dropbox#filesUploadSessionStart
 * @arg {FilesUploadSessionStartArg} arg - The request parameters.
 * @returns {Promise.<FilesUploadSessionStartResult, Error.<void>>}
 */
routes.filesUploadSessionStart = function (arg) {
  return this.request('files/upload_session/start', arg, 'user', 'content', 'upload');
};

/**
 * Marks the given Paper doc as archived. Note: This action can be performed or
 * undone by anyone with edit permissions to the doc.
 * @function Dropbox#paperDocsArchive
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
 */
routes.paperDocsArchive = function (arg) {
  return this.request('paper/docs/archive', arg, 'user', 'api', 'rpc');
};

/**
 * Creates a new Paper doc with the provided content.
 * @function Dropbox#paperDocsCreate
 * @arg {PaperPaperDocCreateArgs} arg - The request parameters.
 * @returns {Promise.<PaperPaperDocCreateUpdateResult, Error.<PaperPaperDocCreateError>>}
 */
routes.paperDocsCreate = function (arg) {
  return this.request('paper/docs/create', arg, 'user', 'api', 'upload');
};

/**
 * Exports and downloads Paper doc either as HTML or markdown.
 * @function Dropbox#paperDocsDownload
 * @arg {PaperPaperDocExport} arg - The request parameters.
 * @returns {Promise.<PaperPaperDocExportResult, Error.<PaperDocLookupError>>}
 */
routes.paperDocsDownload = function (arg) {
  return this.request('paper/docs/download', arg, 'user', 'api', 'download');
};

/**
 * Lists the users who are explicitly invited to the Paper folder in which the
 * Paper doc is contained. For private folders all users (including owner)
 * shared on the folder are listed and for team folders all non-team users
 * shared on the folder are returned.
 * @function Dropbox#paperDocsFolderUsersList
 * @arg {PaperListUsersOnFolderArgs} arg - The request parameters.
 * @returns {Promise.<PaperListUsersOnFolderResponse, Error.<PaperDocLookupError>>}
 */
routes.paperDocsFolderUsersList = function (arg) {
  return this.request('paper/docs/folder_users/list', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from docs/folder_users/list, use this to
 * paginate through all users on the Paper folder.
 * @function Dropbox#paperDocsFolderUsersListContinue
 * @arg {PaperListUsersOnFolderContinueArgs} arg - The request parameters.
 * @returns {Promise.<PaperListUsersOnFolderResponse, Error.<PaperListUsersCursorError>>}
 */
routes.paperDocsFolderUsersListContinue = function (arg) {
  return this.request('paper/docs/folder_users/list/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Retrieves folder information for the given Paper doc. This includes:   -
 * folder sharing policy; permissions for subfolders are set by the top-level
 * folder.   - full 'filepath', i.e. the list of folders (both folderId and
 * folderName) from     the root folder to the folder directly containing the
 * Paper doc.  Note: If the Paper doc is not in any folder (aka unfiled) the
 * response will be empty.
 * @function Dropbox#paperDocsGetFolderInfo
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<PaperFoldersContainingPaperDoc, Error.<PaperDocLookupError>>}
 */
routes.paperDocsGetFolderInfo = function (arg) {
  return this.request('paper/docs/get_folder_info', arg, 'user', 'api', 'rpc');
};

/**
 * Return the list of all Paper docs according to the argument specifications.
 * To iterate over through the full pagination, pass the cursor to
 * docs/list/continue.
 * @function Dropbox#paperDocsList
 * @arg {PaperListPaperDocsArgs} arg - The request parameters.
 * @returns {Promise.<PaperListPaperDocsResponse, Error.<void>>}
 */
routes.paperDocsList = function (arg) {
  return this.request('paper/docs/list', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from docs/list, use this to paginate through
 * all Paper doc.
 * @function Dropbox#paperDocsListContinue
 * @arg {PaperListPaperDocsContinueArgs} arg - The request parameters.
 * @returns {Promise.<PaperListPaperDocsResponse, Error.<PaperListDocsCursorError>>}
 */
routes.paperDocsListContinue = function (arg) {
  return this.request('paper/docs/list/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Permanently deletes the given Paper doc. This operation is final as the doc
 * cannot be recovered.  Note: This action can be performed only by the doc
 * owner.
 * @function Dropbox#paperDocsPermanentlyDelete
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
 */
routes.paperDocsPermanentlyDelete = function (arg) {
  return this.request('paper/docs/permanently_delete', arg, 'user', 'api', 'rpc');
};

/**
 * Gets the default sharing policy for the given Paper doc.
 * @function Dropbox#paperDocsSharingPolicyGet
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<PaperSharingPolicy, Error.<PaperDocLookupError>>}
 */
routes.paperDocsSharingPolicyGet = function (arg) {
  return this.request('paper/docs/sharing_policy/get', arg, 'user', 'api', 'rpc');
};

/**
 * Sets the default sharing policy for the given Paper doc. The default
 * 'team_sharing_policy' can be changed only by teams, omit this field for
 * personal accounts.  Note: 'public_sharing_policy' cannot be set to the value
 * 'disabled' because this setting can be changed only via the team admin
 * console.
 * @function Dropbox#paperDocsSharingPolicySet
 * @arg {PaperPaperDocSharingPolicy} arg - The request parameters.
 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
 */
routes.paperDocsSharingPolicySet = function (arg) {
  return this.request('paper/docs/sharing_policy/set', arg, 'user', 'api', 'rpc');
};

/**
 * Updates an existing Paper doc with the provided content.
 * @function Dropbox#paperDocsUpdate
 * @arg {PaperPaperDocUpdateArgs} arg - The request parameters.
 * @returns {Promise.<PaperPaperDocCreateUpdateResult, Error.<PaperPaperDocUpdateError>>}
 */
routes.paperDocsUpdate = function (arg) {
  return this.request('paper/docs/update', arg, 'user', 'api', 'upload');
};

/**
 * Allows an owner or editor to add users to a Paper doc or change their
 * permissions using their email address or Dropbox account ID.  Note: The Doc
 * owner's permissions cannot be changed.
 * @function Dropbox#paperDocsUsersAdd
 * @arg {PaperAddPaperDocUser} arg - The request parameters.
 * @returns {Promise.<Array.<PaperAddPaperDocUserMemberResult>, Error.<PaperDocLookupError>>}
 */
routes.paperDocsUsersAdd = function (arg) {
  return this.request('paper/docs/users/add', arg, 'user', 'api', 'rpc');
};

/**
 * Lists all users who visited the Paper doc or users with explicit access. This
 * call excludes users who have been removed. The list is sorted by the date of
 * the visit or the share date. The list will include both users, the explicitly
 * shared ones as well as those who came in using the Paper url link.
 * @function Dropbox#paperDocsUsersList
 * @arg {PaperListUsersOnPaperDocArgs} arg - The request parameters.
 * @returns {Promise.<PaperListUsersOnPaperDocResponse, Error.<PaperDocLookupError>>}
 */
routes.paperDocsUsersList = function (arg) {
  return this.request('paper/docs/users/list', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from docs/users/list, use this to paginate
 * through all users on the Paper doc.
 * @function Dropbox#paperDocsUsersListContinue
 * @arg {PaperListUsersOnPaperDocContinueArgs} arg - The request parameters.
 * @returns {Promise.<PaperListUsersOnPaperDocResponse, Error.<PaperListUsersCursorError>>}
 */
routes.paperDocsUsersListContinue = function (arg) {
  return this.request('paper/docs/users/list/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Allows an owner or editor to remove users from a Paper doc using their email
 * address or Dropbox account ID.  Note: Doc owner cannot be removed.
 * @function Dropbox#paperDocsUsersRemove
 * @arg {PaperRemovePaperDocUser} arg - The request parameters.
 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
 */
routes.paperDocsUsersRemove = function (arg) {
  return this.request('paper/docs/users/remove', arg, 'user', 'api', 'rpc');
};

/**
 * Adds specified members to a file.
 * @function Dropbox#sharingAddFileMember
 * @arg {SharingAddFileMemberArgs} arg - The request parameters.
 * @returns {Promise.<Array.<SharingFileMemberActionResult>, Error.<SharingAddFileMemberError>>}
 */
routes.sharingAddFileMember = function (arg) {
  return this.request('sharing/add_file_member', arg, 'user', 'api', 'rpc');
};

/**
 * Allows an owner or editor (if the ACL update policy allows) of a shared
 * folder to add another member. For the new member to get access to all the
 * functionality for this folder, you will need to call mount_folder on their
 * behalf. Apps must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingAddFolderMember
 * @arg {SharingAddFolderMemberArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingAddFolderMemberError>>}
 */
routes.sharingAddFolderMember = function (arg) {
  return this.request('sharing/add_folder_member', arg, 'user', 'api', 'rpc');
};

/**
 * Identical to update_file_member but with less information returned.
 * @function Dropbox#sharingChangeFileMemberAccess
 * @deprecated
 * @arg {SharingChangeFileMemberAccessArgs} arg - The request parameters.
 * @returns {Promise.<SharingFileMemberActionResult, Error.<SharingFileMemberActionError>>}
 */
routes.sharingChangeFileMemberAccess = function (arg) {
  return this.request('sharing/change_file_member_access', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job. Apps must have full Dropbox access
 * to use this endpoint.
 * @function Dropbox#sharingCheckJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<SharingJobStatus, Error.<AsyncPollError>>}
 */
routes.sharingCheckJobStatus = function (arg) {
  return this.request('sharing/check_job_status', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for sharing a folder. Apps must
 * have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingCheckRemoveMemberJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<SharingRemoveMemberJobStatus, Error.<AsyncPollError>>}
 */
routes.sharingCheckRemoveMemberJobStatus = function (arg) {
  return this.request('sharing/check_remove_member_job_status', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for sharing a folder. Apps must
 * have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingCheckShareJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<SharingShareFolderJobStatus, Error.<AsyncPollError>>}
 */
routes.sharingCheckShareJobStatus = function (arg) {
  return this.request('sharing/check_share_job_status', arg, 'user', 'api', 'rpc');
};

/**
 * Create a shared link. If a shared link already exists for the given path,
 * that link is returned. Note that in the returned PathLinkMetadata, the
 * PathLinkMetadata.url field is the shortened URL if
 * CreateSharedLinkArg.short_url argument is set to true. Previously, it was
 * technically possible to break a shared link by moving or renaming the
 * corresponding file or folder. In the future, this will no longer be the case,
 * so your app shouldn't rely on this behavior. Instead, if your app needs to
 * revoke a shared link, use revoke_shared_link.
 * @function Dropbox#sharingCreateSharedLink
 * @deprecated
 * @arg {SharingCreateSharedLinkArg} arg - The request parameters.
 * @returns {Promise.<SharingPathLinkMetadata, Error.<SharingCreateSharedLinkError>>}
 */
routes.sharingCreateSharedLink = function (arg) {
  return this.request('sharing/create_shared_link', arg, 'user', 'api', 'rpc');
};

/**
 * Create a shared link with custom settings. If no settings are given then the
 * default visibility is RequestedVisibility.public (The resolved visibility,
 * though, may depend on other aspects such as team and shared folder settings).
 * @function Dropbox#sharingCreateSharedLinkWithSettings
 * @arg {SharingCreateSharedLinkWithSettingsArg} arg - The request parameters.
 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingCreateSharedLinkWithSettingsError>>}
 */
routes.sharingCreateSharedLinkWithSettings = function (arg) {
  return this.request('sharing/create_shared_link_with_settings', arg, 'user', 'api', 'rpc');
};

/**
 * Returns shared file metadata.
 * @function Dropbox#sharingGetFileMetadata
 * @arg {SharingGetFileMetadataArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFileMetadata, Error.<SharingGetFileMetadataError>>}
 */
routes.sharingGetFileMetadata = function (arg) {
  return this.request('sharing/get_file_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Returns shared file metadata.
 * @function Dropbox#sharingGetFileMetadataBatch
 * @arg {SharingGetFileMetadataBatchArg} arg - The request parameters.
 * @returns {Promise.<Array.<SharingGetFileMetadataBatchResult>, Error.<SharingSharingUserError>>}
 */
routes.sharingGetFileMetadataBatch = function (arg) {
  return this.request('sharing/get_file_metadata/batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns shared folder metadata by its folder ID. Apps must have full Dropbox
 * access to use this endpoint.
 * @function Dropbox#sharingGetFolderMetadata
 * @arg {SharingGetMetadataArgs} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMetadata, Error.<SharingSharedFolderAccessError>>}
 */
routes.sharingGetFolderMetadata = function (arg) {
  return this.request('sharing/get_folder_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Download the shared link's file from a user's Dropbox.
 * @function Dropbox#sharingGetSharedLinkFile
 * @arg {Object} arg - The request parameters.
 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingGetSharedLinkFileError>>}
 */
routes.sharingGetSharedLinkFile = function (arg) {
  return this.request('sharing/get_shared_link_file', arg, 'user', 'content', 'download');
};

/**
 * Get the shared link's metadata.
 * @function Dropbox#sharingGetSharedLinkMetadata
 * @arg {SharingGetSharedLinkMetadataArg} arg - The request parameters.
 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingSharedLinkError>>}
 */
routes.sharingGetSharedLinkMetadata = function (arg) {
  return this.request('sharing/get_shared_link_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Returns a list of LinkMetadata objects for this user, including collection
 * links. If no path is given, returns a list of all shared links for the
 * current user, including collection links, up to a maximum of 1000 links. If a
 * non-empty path is given, returns a list of all shared links that allow access
 * to the given path.  Collection links are never returned in this case. Note
 * that the url field in the response is never the shortened URL.
 * @function Dropbox#sharingGetSharedLinks
 * @deprecated
 * @arg {SharingGetSharedLinksArg} arg - The request parameters.
 * @returns {Promise.<SharingGetSharedLinksResult, Error.<SharingGetSharedLinksError>>}
 */
routes.sharingGetSharedLinks = function (arg) {
  return this.request('sharing/get_shared_links', arg, 'user', 'api', 'rpc');
};

/**
 * Use to obtain the members who have been invited to a file, both inherited and
 * uninherited members.
 * @function Dropbox#sharingListFileMembers
 * @arg {SharingListFileMembersArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFileMembers, Error.<SharingListFileMembersError>>}
 */
routes.sharingListFileMembers = function (arg) {
  return this.request('sharing/list_file_members', arg, 'user', 'api', 'rpc');
};

/**
 * Get members of multiple files at once. The arguments to this route are more
 * limited, and the limit on query result size per file is more strict. To
 * customize the results more, use the individual file endpoint. Inherited users
 * and groups are not included in the result, and permissions are not returned
 * for this endpoint.
 * @function Dropbox#sharingListFileMembersBatch
 * @arg {SharingListFileMembersBatchArg} arg - The request parameters.
 * @returns {Promise.<Array.<SharingListFileMembersBatchResult>, Error.<SharingSharingUserError>>}
 */
routes.sharingListFileMembersBatch = function (arg) {
  return this.request('sharing/list_file_members/batch', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_file_members or
 * list_file_members/batch, use this to paginate through all shared file
 * members.
 * @function Dropbox#sharingListFileMembersContinue
 * @arg {SharingListFileMembersContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFileMembers, Error.<SharingListFileMembersContinueError>>}
 */
routes.sharingListFileMembersContinue = function (arg) {
  return this.request('sharing/list_file_members/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Returns shared folder membership by its folder ID. Apps must have full
 * Dropbox access to use this endpoint.
 * @function Dropbox#sharingListFolderMembers
 * @arg {SharingListFolderMembersArgs} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMembers, Error.<SharingSharedFolderAccessError>>}
 */
routes.sharingListFolderMembers = function (arg) {
  return this.request('sharing/list_folder_members', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_folder_members, use this to
 * paginate through all shared folder members. Apps must have full Dropbox
 * access to use this endpoint.
 * @function Dropbox#sharingListFolderMembersContinue
 * @arg {SharingListFolderMembersContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMembers, Error.<SharingListFolderMembersContinueError>>}
 */
routes.sharingListFolderMembersContinue = function (arg) {
  return this.request('sharing/list_folder_members/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Return the list of all shared folders the current user has access to. Apps
 * must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingListFolders
 * @arg {SharingListFoldersArgs} arg - The request parameters.
 * @returns {Promise.<SharingListFoldersResult, Error.<void>>}
 */
routes.sharingListFolders = function (arg) {
  return this.request('sharing/list_folders', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_folders, use this to paginate
 * through all shared folders. The cursor must come from a previous call to
 * list_folders or list_folders/continue. Apps must have full Dropbox access to
 * use this endpoint.
 * @function Dropbox#sharingListFoldersContinue
 * @arg {SharingListFoldersContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingListFoldersResult, Error.<SharingListFoldersContinueError>>}
 */
routes.sharingListFoldersContinue = function (arg) {
  return this.request('sharing/list_folders/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Return the list of all shared folders the current user can mount or unmount.
 * Apps must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingListMountableFolders
 * @arg {SharingListFoldersArgs} arg - The request parameters.
 * @returns {Promise.<SharingListFoldersResult, Error.<void>>}
 */
routes.sharingListMountableFolders = function (arg) {
  return this.request('sharing/list_mountable_folders', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_mountable_folders, use this to
 * paginate through all mountable shared folders. The cursor must come from a
 * previous call to list_mountable_folders or list_mountable_folders/continue.
 * Apps must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingListMountableFoldersContinue
 * @arg {SharingListFoldersContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingListFoldersResult, Error.<SharingListFoldersContinueError>>}
 */
routes.sharingListMountableFoldersContinue = function (arg) {
  return this.request('sharing/list_mountable_folders/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Returns a list of all files shared with current user.  Does not include files
 * the user has received via shared folders, and does  not include unclaimed
 * invitations.
 * @function Dropbox#sharingListReceivedFiles
 * @arg {SharingListFilesArg} arg - The request parameters.
 * @returns {Promise.<SharingListFilesResult, Error.<SharingSharingUserError>>}
 */
routes.sharingListReceivedFiles = function (arg) {
  return this.request('sharing/list_received_files', arg, 'user', 'api', 'rpc');
};

/**
 * Get more results with a cursor from list_received_files.
 * @function Dropbox#sharingListReceivedFilesContinue
 * @arg {SharingListFilesContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingListFilesResult, Error.<SharingListFilesContinueError>>}
 */
routes.sharingListReceivedFilesContinue = function (arg) {
  return this.request('sharing/list_received_files/continue', arg, 'user', 'api', 'rpc');
};

/**
 * List shared links of this user. If no path is given, returns a list of all
 * shared links for the current user. If a non-empty path is given, returns a
 * list of all shared links that allow access to the given path - direct links
 * to the given path and links to parent folders of the given path. Links to
 * parent folders can be suppressed by setting direct_only to true.
 * @function Dropbox#sharingListSharedLinks
 * @arg {SharingListSharedLinksArg} arg - The request parameters.
 * @returns {Promise.<SharingListSharedLinksResult, Error.<SharingListSharedLinksError>>}
 */
routes.sharingListSharedLinks = function (arg) {
  return this.request('sharing/list_shared_links', arg, 'user', 'api', 'rpc');
};

/**
 * Modify the shared link's settings. If the requested visibility conflict with
 * the shared links policy of the team or the shared folder (in case the linked
 * file is part of a shared folder) then the LinkPermissions.resolved_visibility
 * of the returned SharedLinkMetadata will reflect the actual visibility of the
 * shared link and the LinkPermissions.requested_visibility will reflect the
 * requested visibility.
 * @function Dropbox#sharingModifySharedLinkSettings
 * @arg {SharingModifySharedLinkSettingsArgs} arg - The request parameters.
 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingModifySharedLinkSettingsError>>}
 */
routes.sharingModifySharedLinkSettings = function (arg) {
  return this.request('sharing/modify_shared_link_settings', arg, 'user', 'api', 'rpc');
};

/**
 * The current user mounts the designated folder. Mount a shared folder for a
 * user after they have been added as a member. Once mounted, the shared folder
 * will appear in their Dropbox. Apps must have full Dropbox access to use this
 * endpoint.
 * @function Dropbox#sharingMountFolder
 * @arg {SharingMountFolderArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMetadata, Error.<SharingMountFolderError>>}
 */
routes.sharingMountFolder = function (arg) {
  return this.request('sharing/mount_folder', arg, 'user', 'api', 'rpc');
};

/**
 * The current user relinquishes their membership in the designated file. Note
 * that the current user may still have inherited access to this file through
 * the parent folder. Apps must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingRelinquishFileMembership
 * @arg {SharingRelinquishFileMembershipArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingRelinquishFileMembershipError>>}
 */
routes.sharingRelinquishFileMembership = function (arg) {
  return this.request('sharing/relinquish_file_membership', arg, 'user', 'api', 'rpc');
};

/**
 * The current user relinquishes their membership in the designated shared
 * folder and will no longer have access to the folder.  A folder owner cannot
 * relinquish membership in their own folder. This will run synchronously if
 * leave_a_copy is false, and asynchronously if leave_a_copy is true. Apps must
 * have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingRelinquishFolderMembership
 * @arg {SharingRelinquishFolderMembershipArg} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<SharingRelinquishFolderMembershipError>>}
 */
routes.sharingRelinquishFolderMembership = function (arg) {
  return this.request('sharing/relinquish_folder_membership', arg, 'user', 'api', 'rpc');
};

/**
 * Identical to remove_file_member_2 but with less information returned.
 * @function Dropbox#sharingRemoveFileMember
 * @deprecated
 * @arg {SharingRemoveFileMemberArg} arg - The request parameters.
 * @returns {Promise.<SharingFileMemberActionIndividualResult, Error.<SharingRemoveFileMemberError>>}
 */
routes.sharingRemoveFileMember = function (arg) {
  return this.request('sharing/remove_file_member', arg, 'user', 'api', 'rpc');
};

/**
 * Removes a specified member from the file.
 * @function Dropbox#sharingRemoveFileMember2
 * @arg {SharingRemoveFileMemberArg} arg - The request parameters.
 * @returns {Promise.<SharingFileMemberRemoveActionResult, Error.<SharingRemoveFileMemberError>>}
 */
routes.sharingRemoveFileMember2 = function (arg) {
  return this.request('sharing/remove_file_member_2', arg, 'user', 'api', 'rpc');
};

/**
 * Allows an owner or editor (if the ACL update policy allows) of a shared
 * folder to remove another member. Apps must have full Dropbox access to use
 * this endpoint.
 * @function Dropbox#sharingRemoveFolderMember
 * @arg {SharingRemoveFolderMemberArg} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchResultBase, Error.<SharingRemoveFolderMemberError>>}
 */
routes.sharingRemoveFolderMember = function (arg) {
  return this.request('sharing/remove_folder_member', arg, 'user', 'api', 'rpc');
};

/**
 * Revoke a shared link. Note that even after revoking a shared link to a file,
 * the file may be accessible if there are shared links leading to any of the
 * file parent folders. To list all shared links that enable access to a
 * specific file, you can use the list_shared_links with the file as the
 * ListSharedLinksArg.path argument.
 * @function Dropbox#sharingRevokeSharedLink
 * @arg {SharingRevokeSharedLinkArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingRevokeSharedLinkError>>}
 */
routes.sharingRevokeSharedLink = function (arg) {
  return this.request('sharing/revoke_shared_link', arg, 'user', 'api', 'rpc');
};

/**
 * Share a folder with collaborators. Most sharing will be completed
 * synchronously. Large folders will be completed asynchronously. To make
 * testing the async case repeatable, set `ShareFolderArg.force_async`. If a
 * ShareFolderLaunch.async_job_id is returned, you'll need to call
 * check_share_job_status until the action completes to get the metadata for the
 * folder. Apps must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingShareFolder
 * @arg {SharingShareFolderArg} arg - The request parameters.
 * @returns {Promise.<SharingShareFolderLaunch, Error.<SharingShareFolderError>>}
 */
routes.sharingShareFolder = function (arg) {
  return this.request('sharing/share_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Transfer ownership of a shared folder to a member of the shared folder. User
 * must have AccessLevel.owner access to the shared folder to perform a
 * transfer. Apps must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingTransferFolder
 * @arg {SharingTransferFolderArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingTransferFolderError>>}
 */
routes.sharingTransferFolder = function (arg) {
  return this.request('sharing/transfer_folder', arg, 'user', 'api', 'rpc');
};

/**
 * The current user unmounts the designated folder. They can re-mount the folder
 * at a later time using mount_folder. Apps must have full Dropbox access to use
 * this endpoint.
 * @function Dropbox#sharingUnmountFolder
 * @arg {SharingUnmountFolderArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingUnmountFolderError>>}
 */
routes.sharingUnmountFolder = function (arg) {
  return this.request('sharing/unmount_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Remove all members from this file. Does not remove inherited members.
 * @function Dropbox#sharingUnshareFile
 * @arg {SharingUnshareFileArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingUnshareFileError>>}
 */
routes.sharingUnshareFile = function (arg) {
  return this.request('sharing/unshare_file', arg, 'user', 'api', 'rpc');
};

/**
 * Allows a shared folder owner to unshare the folder. You'll need to call
 * check_job_status to determine if the action has completed successfully. Apps
 * must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingUnshareFolder
 * @arg {SharingUnshareFolderArg} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<SharingUnshareFolderError>>}
 */
routes.sharingUnshareFolder = function (arg) {
  return this.request('sharing/unshare_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Changes a member's access on a shared file.
 * @function Dropbox#sharingUpdateFileMember
 * @arg {SharingUpdateFileMemberArgs} arg - The request parameters.
 * @returns {Promise.<SharingMemberAccessLevelResult, Error.<SharingFileMemberActionError>>}
 */
routes.sharingUpdateFileMember = function (arg) {
  return this.request('sharing/update_file_member', arg, 'user', 'api', 'rpc');
};

/**
 * Allows an owner or editor of a shared folder to update another member's
 * permissions. Apps must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingUpdateFolderMember
 * @arg {SharingUpdateFolderMemberArg} arg - The request parameters.
 * @returns {Promise.<SharingMemberAccessLevelResult, Error.<SharingUpdateFolderMemberError>>}
 */
routes.sharingUpdateFolderMember = function (arg) {
  return this.request('sharing/update_folder_member', arg, 'user', 'api', 'rpc');
};

/**
 * Update the sharing policies for a shared folder. User must have
 * AccessLevel.owner access to the shared folder to update its policies. Apps
 * must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingUpdateFolderPolicy
 * @arg {SharingUpdateFolderPolicyArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMetadata, Error.<SharingUpdateFolderPolicyError>>}
 */
routes.sharingUpdateFolderPolicy = function (arg) {
  return this.request('sharing/update_folder_policy', arg, 'user', 'api', 'rpc');
};

/**
 * Retrieves team events. Permission : Team Auditing.
 * @function Dropbox#teamLogGetEvents
 * @arg {TeamLogGetTeamEventsArg} arg - The request parameters.
 * @returns {Promise.<TeamLogGetTeamEventsResult, Error.<TeamLogGetTeamEventsError>>}
 */
routes.teamLogGetEvents = function (arg) {
  return this.request('team_log/get_events', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from get_events, use this to paginate
 * through all events. Permission : Team Auditing.
 * @function Dropbox#teamLogGetEventsContinue
 * @arg {TeamLogGetTeamEventsContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamLogGetTeamEventsResult, Error.<TeamLogGetTeamEventsContinueError>>}
 */
routes.teamLogGetEventsContinue = function (arg) {
  return this.request('team_log/get_events/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Get information about a user's account.
 * @function Dropbox#usersGetAccount
 * @arg {UsersGetAccountArg} arg - The request parameters.
 * @returns {Promise.<UsersBasicAccount, Error.<UsersGetAccountError>>}
 */
routes.usersGetAccount = function (arg) {
  return this.request('users/get_account', arg, 'user', 'api', 'rpc');
};

/**
 * Get information about multiple user accounts.  At most 300 accounts may be
 * queried per request.
 * @function Dropbox#usersGetAccountBatch
 * @arg {UsersGetAccountBatchArg} arg - The request parameters.
 * @returns {Promise.<Object, Error.<UsersGetAccountBatchError>>}
 */
routes.usersGetAccountBatch = function (arg) {
  return this.request('users/get_account_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Get information about the current user's account.
 * @function Dropbox#usersGetCurrentAccount
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<UsersFullAccount, Error.<void>>}
 */
routes.usersGetCurrentAccount = function (arg) {
  return this.request('users/get_current_account', arg, 'user', 'api', 'rpc');
};

/**
 * Get the space usage information for the current user's account.
 * @function Dropbox#usersGetSpaceUsage
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<UsersSpaceUsage, Error.<void>>}
 */
routes.usersGetSpaceUsage = function (arg) {
  return this.request('users/get_space_usage', arg, 'user', 'api', 'rpc');
};

var RPC = 'rpc';
var UPLOAD = 'upload';
var DOWNLOAD = 'download';

function getSafeUnicode(c) {
  var unicode = ('000' + c.charCodeAt(0).toString(16)).slice(-4);
  return '\\u' + unicode;
}

/* global WorkerGlobalScope */
function isWindowOrWorker() {
  return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope || typeof module === 'undefined';
}

function getBaseURL(host) {
  return 'https://' + host + '.dropboxapi.com/2/';
}

// source https://www.dropboxforum.com/t5/API-support/HTTP-header-quot-Dropbox-API-Arg-quot-could-not-decode-input-as/m-p/173823/highlight/true#M6786
function httpHeaderSafeJson(args) {
  return JSON.stringify(args).replace(/[\u007f-\uffff]/g, getSafeUnicode);
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

function getDataFromConsumer(res) {
  if (!res.ok) {
    return res.text();
  }

  return isWindowOrWorker() ? res.blob() : res.buffer();
}

function responseHandler(res, data) {
  if (!res.ok) {
    // eslint-disable-next-line no-throw-literal
    throw {
      error: data,
      response: res,
      status: res.status
    };
  }

  var result = JSON.parse(res.headers.get('dropbox-api-result'));

  if (isWindowOrWorker()) {
    result.fileBlob = data;
  } else {
    result.fileBinary = data;
  }

  return result;
}

function downloadRequest(path, args, auth, host, accessToken, options) {
  if (auth !== 'user') {
    throw new Error('Unexpected auth type: ' + auth);
  }

  var fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Dropbox-API-Arg': httpHeaderSafeJson(args)
    }
  };

  if (options) {
    if (options.selectUser) {
      fetchOptions.headers['Dropbox-API-Select-User'] = options.selectUser;
    }
    if (options.selectAdmin) {
      fetchOptions.headers['Dropbox-API-Select-Admin'] = options.selectAdmin;
    }
  }

  return fetch(getBaseURL(host) + path, fetchOptions).then(function (res) {
    return getDataFromConsumer(res).then(function (data) {
      return [res, data];
    });
  }).then(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        res = _ref2[0],
        data = _ref2[1];

    return responseHandler(res, data);
  });
}

function parseBodyToType$1(res) {
  var clone = res.clone();
  return new Promise(function (resolve) {
    res.json().then(function (data) {
      return resolve(data);
    }).catch(function () {
      return clone.text().then(function (data) {
        return resolve(data);
      });
    });
  }).then(function (data) {
    return [res, data];
  });
}

function uploadRequest(path, args, auth, host, accessToken, options) {
  if (auth !== 'user') {
    throw new Error('Unexpected auth type: ' + auth);
  }

  var contents = args.contents;

  delete args.contents;

  var fetchOptions = {
    body: contents,
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': httpHeaderSafeJson(args)
    }
  };

  if (options) {
    if (options.selectUser) {
      fetchOptions.headers['Dropbox-API-Select-User'] = options.selectUser;
    }
    if (options.selectAdmin) {
      fetchOptions.headers['Dropbox-API-Select-Admin'] = options.selectAdmin;
    }
  }

  return fetch(getBaseURL(host) + path, fetchOptions).then(function (res) {
    return parseBodyToType$1(res);
  }).then(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        res = _ref2[0],
        data = _ref2[1];

    // maintaining existing API for error codes not equal to 200 range
    if (!res.ok) {
      // eslint-disable-next-line no-throw-literal
      throw {
        error: data,
        response: res,
        status: res.status
      };
    }

    return data;
  });
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var byteLength_1 = byteLength;
var toByteArray_1 = toByteArray;
var fromByteArray_1 = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function placeHoldersCount (b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr;
  var len = b64.length;
  placeHolders = placeHoldersCount(b64);

  arr = new Arr((len * 3 / 4) - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

var base64Js = {
	byteLength: byteLength_1,
	toByteArray: toByteArray_1,
	fromByteArray: fromByteArray_1
};

var read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
};

var write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

var ieee754 = {
	read: read,
	write: write
};

var buffer = createCommonjsModule(function (module, exports) {
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict';




exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;

var K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  );
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }};
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length);
  buf.__proto__ = Buffer.prototype;
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  });
}

Buffer.poolSize = 8192; // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value)) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
};

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype;
Buffer.__proto__ = Uint8Array;

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
};

function allocUnsafe (size) {
  assertSize(size);
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
};

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  var buf = createBuffer(length);

  var actual = buf.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  var buf = createBuffer(length);
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255;
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  var buf;
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array);
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset);
  } else {
    buf = new Uint8Array(array, byteOffset, length);
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype;
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    var buf = createBuffer(len);

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len);
    return buf
  }

  if (obj) {
    if (isArrayBufferView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
};

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (isArrayBufferView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0;
    if (isFinite(length)) {
      length = length >>> 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64Js.fromByteArray(buf)
  } else {
    return base64Js.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256));
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf = this.subarray(start, end);
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype;
  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  this[offset] = (value & 0xff);
  this[offset + 1] = (value >>> 8);
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  this[offset] = (value >>> 8);
  this[offset + 1] = (value & 0xff);
  return offset + 2
};

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  this[offset + 3] = (value >>> 24);
  this[offset + 2] = (value >>> 16);
  this[offset + 1] = (value >>> 8);
  this[offset] = (value & 0xff);
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  this[offset] = (value >>> 24);
  this[offset + 1] = (value >>> 16);
  this[offset + 2] = (value >>> 8);
  this[offset + 3] = (value & 0xff);
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  this[offset] = (value & 0xff);
  this[offset + 1] = (value >>> 8);
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  this[offset] = (value >>> 8);
  this[offset + 1] = (value & 0xff);
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  this[offset] = (value & 0xff);
  this[offset + 1] = (value >>> 8);
  this[offset + 2] = (value >>> 16);
  this[offset + 3] = (value >>> 24);
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  this[offset] = (value >>> 24);
  this[offset + 1] = (value >>> 16);
  this[offset + 2] = (value >>> 8);
  this[offset + 3] = (value & 0xff);
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding);
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64Js.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}
});

var buffer_1 = buffer.Buffer;

function parseBodyToType$2(res) {
  var clone = res.clone();
  return new Promise(function (resolve) {
    res.json().then(function (data) {
      return resolve(data);
    }).catch(function () {
      return clone.text().then(function (data) {
        return resolve(data);
      });
    });
  }).then(function (data) {
    return [res, data];
  });
}

function rpcRequest(path, body, auth, host, accessToken, options) {
  var fetchOptions = {
    method: 'POST',
    body: body ? JSON.stringify(body) : null
  };
  var headers = {};
  if (body) {
    headers['Content-Type'] = 'application/json';
  }
  var authHeader = '';

  switch (auth) {
    case 'app':
      if (!options.clientId || !options.clientSecret) {
        throw new Error('A client id and secret is required for this function');
      }
      authHeader = new buffer_1(options.clientId + ':' + options.clientSecret).toString('base64');
      headers.Authorization = 'Basic ' + authHeader;
      break;
    case 'team':
    case 'user':
      headers.Authorization = 'Bearer ' + accessToken;
      break;
    case 'noauth':
      break;
    default:
      throw new Error('Unhandled auth type: ' + auth);
  }

  if (options) {
    if (options.selectUser) {
      headers['Dropbox-API-Select-User'] = options.selectUser;
    }
    if (options.selectAdmin) {
      headers['Dropbox-API-Select-Admin'] = options.selectAdmin;
    }
  }

  fetchOptions.headers = headers;
  return fetch(getBaseURL(host) + path, fetchOptions).then(function (res) {
    return parseBodyToType$2(res);
  }).then(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        res = _ref2[0],
        data = _ref2[1];

    // maintaining existing API for error codes not equal to 200 range
    if (!res.ok) {
      // eslint-disable-next-line no-throw-literal
      throw {
        error: data,
        response: res,
        status: res.status
      };
    }

    return data;
  });
}

/* eslint-disable */
// Polyfill object.assign for legacy browsers
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign !== 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';

      var output;
      var index;
      var source;
      var nextKey;
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      output = Object(target);
      for (index = 1; index < arguments.length; index++) {
        source = arguments[index];
        if (source !== undefined && source !== null) {
          for (nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

// Polyfill Array.includes for legacy browsers
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function value(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1.
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}
/* eslint-enable */

/**
 * @private
 * @class DropboxBase
 * @classdesc The main Dropbox SDK class. This contains the methods that are
 * shared between Dropbox and DropboxTeam classes. It is marked as private so
 * that it doesn't show up in the docs because it is never used directly.
 * @arg {Object} options
 * @arg {String} [options.accessToken] - An access token for making authenticated
 * requests.
 * @arg {String} [options.clientId] - The client id for your app. Used to create
 * authentication URL.
 * @arg {String} [options.clientSecret] - The client secret for your app.
 * @arg {Number} [options.selectUser] - User that the team access token would like
 * to act as.
 * @arg {String} [options.selectAdmin] - Team admin that the team access token would like
 * to act as.
 */

function parseBodyToType(res) {
  var clone = res.clone();
  return new Promise(function (resolve) {
    res.json().then(function (data) {
      return resolve(data);
    }).catch(function () {
      return clone.text().then(function (data) {
        return resolve(data);
      });
    });
  }).then(function (data) {
    return [res, data];
  });
}

var DropboxBase = function () {
  function DropboxBase(options) {
    classCallCheck(this, DropboxBase);

    options = options || {};
    this.accessToken = options.accessToken;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.selectUser = options.selectUser;
    this.selectAdmin = options.selectAdmin;
  }

  /**
   * Set the access token used to authenticate requests to the API.
   * @arg {String} accessToken - An access token
   * @returns {undefined}
   */


  createClass(DropboxBase, [{
    key: 'setAccessToken',
    value: function setAccessToken(accessToken) {
      this.accessToken = accessToken;
    }

    /**
     * Get the access token
     * @returns {String} Access token
     */

  }, {
    key: 'getAccessToken',
    value: function getAccessToken() {
      return this.accessToken;
    }

    /**
     * Set the client id, which is used to help gain an access token.
     * @arg {String} clientId - Your apps client id
     * @returns {undefined}
     */

  }, {
    key: 'setClientId',
    value: function setClientId(clientId) {
      this.clientId = clientId;
    }

    /**
     * Get the client id
     * @returns {String} Client id
     */

  }, {
    key: 'getClientId',
    value: function getClientId() {
      return this.clientId;
    }

    /**
     * Set the client secret
     * @arg {String} clientId - Your apps client secret
     * @returns {undefined}
     */

  }, {
    key: 'setClientSecret',
    value: function setClientSecret(clientSecret) {
      this.clientSecret = clientSecret;
    }

    /**
     * Get the client secret
     * @returns {String} Client secret
     */

  }, {
    key: 'getClientSecret',
    value: function getClientSecret() {
      return this.clientSecret;
    }

    /**
     * Get a URL that can be used to authenticate users for the Dropbox API.
     * @arg {String} redirectUri - A URL to redirect the user to after
     * authenticating. This must be added to your app through the admin interface.
     * @arg {String} [state] - State that will be returned in the redirect URL to help
     * prevent cross site scripting attacks.
     * @arg {String} [authType] - auth type, defaults to 'token', other option is 'code'
     * @returns {String} Url to send user to for Dropbox API authentication
     */

  }, {
    key: 'getAuthenticationUrl',
    value: function getAuthenticationUrl(redirectUri, state) {
      var authType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'token';

      var clientId = this.getClientId();
      var baseUrl = 'https://www.dropbox.com/oauth2/authorize';

      if (!clientId) {
        throw new Error('A client id is required. You can set the client id using .setClientId().');
      }
      if (authType !== 'code' && !redirectUri) {
        throw new Error('A redirect uri is required.');
      }
      if (!['code', 'token'].includes(authType)) {
        throw new Error('Authorization type must be code or token');
      }

      var authUrl = void 0;
      if (authType === 'code') {
        authUrl = baseUrl + '?response_type=code&client_id=' + clientId;
      } else {
        authUrl = baseUrl + '?response_type=token&client_id=' + clientId;
      }

      if (redirectUri) {
        authUrl += '&redirect_uri=' + redirectUri;
      }
      if (state) {
        authUrl += '&state=' + state;
      }
      return authUrl;
    }

    /**
     * Get an OAuth2 access token from an OAuth2 Code.
     * @arg {String} redirectUri - A URL to redirect the user to after
     * authenticating. This must be added to your app through the admin interface.
     * @arg {String} code - An OAuth2 code.
    */

  }, {
    key: 'getAccessTokenFromCode',
    value: function getAccessTokenFromCode(redirectUri, code) {
      var clientId = this.getClientId();
      var clientSecret = this.getClientSecret();

      if (!clientId) {
        throw new Error('A client id is required. You can set the client id using .setClientId().');
      }
      if (!clientSecret) {
        throw new Error('A client secret is required. You can set the client id using .setClientSecret().');
      }
      var path = 'https://api.dropboxapi.com/oauth2/token?code=' + code + '&grant_type=authorization_code&redirect_uri=' + redirectUri + '&client_id=' + clientId + '&client_secret=' + clientSecret;

      var fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      return fetch(path, fetchOptions).then(function (res) {
        return parseBodyToType(res);
      }).then(function (_ref) {
        var _ref2 = slicedToArray(_ref, 2),
            res = _ref2[0],
            data = _ref2[1];

        // maintaining existing API for error codes not equal to 200 range
        if (!res.ok) {
          // eslint-disable-next-line no-throw-literal
          throw {
            error: data,
            response: res,
            status: res.status
          };
        }
        return data.access_token;
      });
    }

    /**
     * Called when the authentication succeed
     * @callback successCallback
     * @param {string} access_token The application's access token
     */

    /**
     * Called when the authentication failed.
     * @callback errorCallback
     */

    /**
     * An authentication process that works with cordova applications.
     * @param {successCallback} successCallback
     * @param {errorCallback} errorCallback
     */

  }, {
    key: 'authenticateWithCordova',
    value: function authenticateWithCordova(successCallback, errorCallback) {
      var redirectUrl = 'https://www.dropbox.com/1/oauth2/redirect_receiver';
      var url = this.getAuthenticationUrl(redirectUrl);

      var removed = false;
      var browser = window.open(url, '_blank');

      function onLoadError() {
        // Try to avoid a browser crash on browser.close().
        window.setTimeout(function () {
          browser.close();
        }, 10);
        errorCallback();
      }

      function onLoadStop(event) {
        var errorLabel = '&error=';
        var errorIndex = event.url.indexOf(errorLabel);

        if (errorIndex > -1) {
          // Try to avoid a browser crash on browser.close().
          window.setTimeout(function () {
            browser.close();
          }, 10);
          errorCallback();
        } else {
          var tokenLabel = '#access_token=';
          var tokenIndex = event.url.indexOf(tokenLabel);
          var tokenTypeIndex = event.url.indexOf('&token_type=');
          if (tokenIndex > -1) {
            tokenIndex += tokenLabel.length;
            // Try to avoid a browser crash on browser.close().
            window.setTimeout(function () {
              browser.close();
            }, 10);

            var accessToken = event.url.substring(tokenIndex, tokenTypeIndex);
            successCallback(accessToken);
          }
        }
      }

      function onExit() {
        if (removed) {
          return;
        }
        browser.removeEventListener('loaderror', onLoadError);
        browser.removeEventListener('loadstop', onLoadStop);
        browser.removeEventListener('exit', onExit);
        removed = true;
      }

      browser.addEventListener('loaderror', onLoadError);
      browser.addEventListener('loadstop', onLoadStop);
      browser.addEventListener('exit', onExit);
    }
  }, {
    key: 'request',
    value: function request(path, args, auth, host, style) {
      var request = null;
      switch (style) {
        case RPC:
          request = this.getRpcRequest();
          break;
        case DOWNLOAD:
          request = this.getDownloadRequest();
          break;
        case UPLOAD:
          request = this.getUploadRequest();
          break;
        default:
          throw new Error('Invalid request style: ' + style);
      }
      var options = {
        selectUser: this.selectUser,
        selectAdmin: this.selectAdmin,
        clientId: this.getClientId(),
        clientSecret: this.getClientSecret()
      };
      return request(path, args, auth, host, this.getAccessToken(), options);
    }
  }, {
    key: 'setRpcRequest',
    value: function setRpcRequest(newRpcRequest) {
      this.rpcRequest = newRpcRequest;
    }
  }, {
    key: 'getRpcRequest',
    value: function getRpcRequest() {
      if (this.rpcRequest === undefined) {
        this.rpcRequest = rpcRequest;
      }
      return this.rpcRequest;
    }
  }, {
    key: 'setDownloadRequest',
    value: function setDownloadRequest(newDownloadRequest) {
      this.downloadRequest = newDownloadRequest;
    }
  }, {
    key: 'getDownloadRequest',
    value: function getDownloadRequest() {
      if (this.downloadRequest === undefined) {
        this.downloadRequest = downloadRequest;
      }
      return this.downloadRequest;
    }
  }, {
    key: 'setUploadRequest',
    value: function setUploadRequest(newUploadRequest) {
      this.uploadRequest = newUploadRequest;
    }
  }, {
    key: 'getUploadRequest',
    value: function getUploadRequest() {
      if (this.uploadRequest === undefined) {
        this.uploadRequest = uploadRequest;
      }
      return this.uploadRequest;
    }
  }]);
  return DropboxBase;
}();

/**
 * @class Dropbox
 * @extends DropboxBase
 * @classdesc The Dropbox SDK class that provides methods to read, write and
 * create files or folders in a user's Dropbox.
 * @arg {Object} options
 * @arg {String} [options.accessToken] - An access token for making authenticated
 * requests.
 * @arg {String} [options.clientId] - The client id for your app. Used to create
 * authentication URL.
 * @arg {String} [options.selectUser] - Select user is only used by DropboxTeam.
 * It specifies which user the team access token should be acting as.
 */
var Dropbox = function (_DropboxBase) {
  inherits(Dropbox, _DropboxBase);

  function Dropbox(options) {
    classCallCheck(this, Dropbox);

    var _this = possibleConstructorReturn(this, (Dropbox.__proto__ || Object.getPrototypeOf(Dropbox)).call(this, options));

    Object.assign(_this, routes);
    return _this;
  }

  createClass(Dropbox, [{
    key: 'filesGetSharedLinkFile',
    value: function filesGetSharedLinkFile(arg) {
      return this.request('sharing/get_shared_link_file', arg, 'api', 'download');
    }
  }]);
  return Dropbox;
}(DropboxBase);



var dropbox = Object.freeze({
	Dropbox: Dropbox
});

// Auto-generated by Stone, do not modify.
var routes$1 = {};

/**
 * List all device sessions of a team's member.
 * @function DropboxTeam#teamDevicesListMemberDevices
 * @arg {TeamListMemberDevicesArg} arg - The request parameters.
 * @returns {Promise.<TeamListMemberDevicesResult, Error.<TeamListMemberDevicesError>>}
 */
routes$1.teamDevicesListMemberDevices = function (arg) {
  return this.request('team/devices/list_member_devices', arg, 'team', 'api', 'rpc');
};

/**
 * List all device sessions of a team.
 * @function DropboxTeam#teamDevicesListMembersDevices
 * @arg {TeamListMembersDevicesArg} arg - The request parameters.
 * @returns {Promise.<TeamListMembersDevicesResult, Error.<TeamListMembersDevicesError>>}
 */
routes$1.teamDevicesListMembersDevices = function (arg) {
  return this.request('team/devices/list_members_devices', arg, 'team', 'api', 'rpc');
};

/**
 * List all device sessions of a team.
 * @function DropboxTeam#teamDevicesListTeamDevices
 * @deprecated
 * @arg {TeamListTeamDevicesArg} arg - The request parameters.
 * @returns {Promise.<TeamListTeamDevicesResult, Error.<TeamListTeamDevicesError>>}
 */
routes$1.teamDevicesListTeamDevices = function (arg) {
  return this.request('team/devices/list_team_devices', arg, 'team', 'api', 'rpc');
};

/**
 * Revoke a device session of a team's member.
 * @function DropboxTeam#teamDevicesRevokeDeviceSession
 * @arg {TeamRevokeDeviceSessionArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamRevokeDeviceSessionError>>}
 */
routes$1.teamDevicesRevokeDeviceSession = function (arg) {
  return this.request('team/devices/revoke_device_session', arg, 'team', 'api', 'rpc');
};

/**
 * Revoke a list of device sessions of team members.
 * @function DropboxTeam#teamDevicesRevokeDeviceSessionBatch
 * @arg {TeamRevokeDeviceSessionBatchArg} arg - The request parameters.
 * @returns {Promise.<TeamRevokeDeviceSessionBatchResult, Error.<TeamRevokeDeviceSessionBatchError>>}
 */
routes$1.teamDevicesRevokeDeviceSessionBatch = function (arg) {
  return this.request('team/devices/revoke_device_session_batch', arg, 'team', 'api', 'rpc');
};

/**
 * Get the values for one or more featues. This route allows you to check your
 * account's capability for what feature you can access or what value you have
 * for certain features. Permission : Team information.
 * @function DropboxTeam#teamFeaturesGetValues
 * @arg {TeamFeaturesGetValuesBatchArg} arg - The request parameters.
 * @returns {Promise.<TeamFeaturesGetValuesBatchResult, Error.<TeamFeaturesGetValuesBatchError>>}
 */
routes$1.teamFeaturesGetValues = function (arg) {
  return this.request('team/features/get_values', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves information about a team.
 * @function DropboxTeam#teamGetInfo
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<TeamTeamGetInfoResult, Error.<void>>}
 */
routes$1.teamGetInfo = function (arg) {
  return this.request('team/get_info', arg, 'team', 'api', 'rpc');
};

/**
 * Creates a new, empty group, with a requested name. Permission : Team member
 * management.
 * @function DropboxTeam#teamGroupsCreate
 * @arg {TeamGroupCreateArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupFullInfo, Error.<TeamGroupCreateError>>}
 */
routes$1.teamGroupsCreate = function (arg) {
  return this.request('team/groups/create', arg, 'team', 'api', 'rpc');
};

/**
 * Deletes a group. The group is deleted immediately. However the revoking of
 * group-owned resources may take additional time. Use the groups/job_status/get
 * to determine whether this process has completed. Permission : Team member
 * management.
 * @function DropboxTeam#teamGroupsDelete
 * @arg {TeamGroupSelector} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<TeamGroupDeleteError>>}
 */
routes$1.teamGroupsDelete = function (arg) {
  return this.request('team/groups/delete', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves information about one or more groups. Note that the optional field
 * GroupFullInfo.members is not returned for system-managed groups. Permission :
 * Team Information.
 * @function DropboxTeam#teamGroupsGetInfo
 * @arg {TeamGroupsSelector} arg - The request parameters.
 * @returns {Promise.<Object, Error.<TeamGroupsGetInfoError>>}
 */
routes$1.teamGroupsGetInfo = function (arg) {
  return this.request('team/groups/get_info', arg, 'team', 'api', 'rpc');
};

/**
 * Once an async_job_id is returned from groups/delete, groups/members/add , or
 * groups/members/remove use this method to poll the status of granting/revoking
 * group members' access to group-owned resources. Permission : Team member
 * management.
 * @function DropboxTeam#teamGroupsJobStatusGet
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<AsyncPollEmptyResult, Error.<TeamGroupsPollError>>}
 */
routes$1.teamGroupsJobStatusGet = function (arg) {
  return this.request('team/groups/job_status/get', arg, 'team', 'api', 'rpc');
};

/**
 * Lists groups on a team. Permission : Team Information.
 * @function DropboxTeam#teamGroupsList
 * @arg {TeamGroupsListArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupsListResult, Error.<void>>}
 */
routes$1.teamGroupsList = function (arg) {
  return this.request('team/groups/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from groups/list, use this to paginate
 * through all groups. Permission : Team Information.
 * @function DropboxTeam#teamGroupsListContinue
 * @arg {TeamGroupsListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupsListResult, Error.<TeamGroupsListContinueError>>}
 */
routes$1.teamGroupsListContinue = function (arg) {
  return this.request('team/groups/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Adds members to a group. The members are added immediately. However the
 * granting of group-owned resources may take additional time. Use the
 * groups/job_status/get to determine whether this process has completed.
 * Permission : Team member management.
 * @function DropboxTeam#teamGroupsMembersAdd
 * @arg {TeamGroupMembersAddArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupMembersChangeResult, Error.<TeamGroupMembersAddError>>}
 */
routes$1.teamGroupsMembersAdd = function (arg) {
  return this.request('team/groups/members/add', arg, 'team', 'api', 'rpc');
};

/**
 * Lists members of a group. Permission : Team Information.
 * @function DropboxTeam#teamGroupsMembersList
 * @arg {TeamGroupsMembersListArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupsMembersListResult, Error.<TeamGroupSelectorError>>}
 */
routes$1.teamGroupsMembersList = function (arg) {
  return this.request('team/groups/members/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from groups/members/list, use this to
 * paginate through all members of the group. Permission : Team information.
 * @function DropboxTeam#teamGroupsMembersListContinue
 * @arg {TeamGroupsMembersListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupsMembersListResult, Error.<TeamGroupsMembersListContinueError>>}
 */
routes$1.teamGroupsMembersListContinue = function (arg) {
  return this.request('team/groups/members/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Removes members from a group. The members are removed immediately. However
 * the revoking of group-owned resources may take additional time. Use the
 * groups/job_status/get to determine whether this process has completed. This
 * method permits removing the only owner of a group, even in cases where this
 * is not possible via the web client. Permission : Team member management.
 * @function DropboxTeam#teamGroupsMembersRemove
 * @arg {TeamGroupMembersRemoveArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupMembersChangeResult, Error.<TeamGroupMembersRemoveError>>}
 */
routes$1.teamGroupsMembersRemove = function (arg) {
  return this.request('team/groups/members/remove', arg, 'team', 'api', 'rpc');
};

/**
 * Sets a member's access type in a group. Permission : Team member management.
 * @function DropboxTeam#teamGroupsMembersSetAccessType
 * @arg {TeamGroupMembersSetAccessTypeArg} arg - The request parameters.
 * @returns {Promise.<Object, Error.<TeamGroupMemberSetAccessTypeError>>}
 */
routes$1.teamGroupsMembersSetAccessType = function (arg) {
  return this.request('team/groups/members/set_access_type', arg, 'team', 'api', 'rpc');
};

/**
 * Updates a group's name and/or external ID. Permission : Team member
 * management.
 * @function DropboxTeam#teamGroupsUpdate
 * @arg {TeamGroupUpdateArgs} arg - The request parameters.
 * @returns {Promise.<TeamGroupFullInfo, Error.<TeamGroupUpdateError>>}
 */
routes$1.teamGroupsUpdate = function (arg) {
  return this.request('team/groups/update', arg, 'team', 'api', 'rpc');
};

/**
 * List all linked applications of the team member. Note, this endpoint does not
 * list any team-linked applications.
 * @function DropboxTeam#teamLinkedAppsListMemberLinkedApps
 * @arg {TeamListMemberAppsArg} arg - The request parameters.
 * @returns {Promise.<TeamListMemberAppsResult, Error.<TeamListMemberAppsError>>}
 */
routes$1.teamLinkedAppsListMemberLinkedApps = function (arg) {
  return this.request('team/linked_apps/list_member_linked_apps', arg, 'team', 'api', 'rpc');
};

/**
 * List all applications linked to the team members' accounts. Note, this
 * endpoint does not list any team-linked applications.
 * @function DropboxTeam#teamLinkedAppsListMembersLinkedApps
 * @arg {TeamListMembersAppsArg} arg - The request parameters.
 * @returns {Promise.<TeamListMembersAppsResult, Error.<TeamListMembersAppsError>>}
 */
routes$1.teamLinkedAppsListMembersLinkedApps = function (arg) {
  return this.request('team/linked_apps/list_members_linked_apps', arg, 'team', 'api', 'rpc');
};

/**
 * List all applications linked to the team members' accounts. Note, this
 * endpoint doesn't list any team-linked applications.
 * @function DropboxTeam#teamLinkedAppsListTeamLinkedApps
 * @deprecated
 * @arg {TeamListTeamAppsArg} arg - The request parameters.
 * @returns {Promise.<TeamListTeamAppsResult, Error.<TeamListTeamAppsError>>}
 */
routes$1.teamLinkedAppsListTeamLinkedApps = function (arg) {
  return this.request('team/linked_apps/list_team_linked_apps', arg, 'team', 'api', 'rpc');
};

/**
 * Revoke a linked application of the team member.
 * @function DropboxTeam#teamLinkedAppsRevokeLinkedApp
 * @arg {TeamRevokeLinkedApiAppArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamRevokeLinkedAppError>>}
 */
routes$1.teamLinkedAppsRevokeLinkedApp = function (arg) {
  return this.request('team/linked_apps/revoke_linked_app', arg, 'team', 'api', 'rpc');
};

/**
 * Revoke a list of linked applications of the team members.
 * @function DropboxTeam#teamLinkedAppsRevokeLinkedAppBatch
 * @arg {TeamRevokeLinkedApiAppBatchArg} arg - The request parameters.
 * @returns {Promise.<TeamRevokeLinkedAppBatchResult, Error.<TeamRevokeLinkedAppBatchError>>}
 */
routes$1.teamLinkedAppsRevokeLinkedAppBatch = function (arg) {
  return this.request('team/linked_apps/revoke_linked_app_batch', arg, 'team', 'api', 'rpc');
};

/**
 * Add users to member space limits excluded users list.
 * @function DropboxTeam#teamMemberSpaceLimitsExcludedUsersAdd
 * @arg {TeamExcludedUsersUpdateArg} arg - The request parameters.
 * @returns {Promise.<TeamExcludedUsersUpdateResult, Error.<TeamExcludedUsersUpdateError>>}
 */
routes$1.teamMemberSpaceLimitsExcludedUsersAdd = function (arg) {
  return this.request('team/member_space_limits/excluded_users/add', arg, 'team', 'api', 'rpc');
};

/**
 * List member space limits excluded users.
 * @function DropboxTeam#teamMemberSpaceLimitsExcludedUsersList
 * @arg {TeamExcludedUsersListArg} arg - The request parameters.
 * @returns {Promise.<TeamExcludedUsersListResult, Error.<TeamExcludedUsersListError>>}
 */
routes$1.teamMemberSpaceLimitsExcludedUsersList = function (arg) {
  return this.request('team/member_space_limits/excluded_users/list', arg, 'team', 'api', 'rpc');
};

/**
 * Continue listing member space limits excluded users.
 * @function DropboxTeam#teamMemberSpaceLimitsExcludedUsersListContinue
 * @arg {TeamExcludedUsersListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamExcludedUsersListResult, Error.<TeamExcludedUsersListContinueError>>}
 */
routes$1.teamMemberSpaceLimitsExcludedUsersListContinue = function (arg) {
  return this.request('team/member_space_limits/excluded_users/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Remove users from member space limits excluded users list.
 * @function DropboxTeam#teamMemberSpaceLimitsExcludedUsersRemove
 * @arg {TeamExcludedUsersUpdateArg} arg - The request parameters.
 * @returns {Promise.<TeamExcludedUsersUpdateResult, Error.<TeamExcludedUsersUpdateError>>}
 */
routes$1.teamMemberSpaceLimitsExcludedUsersRemove = function (arg) {
  return this.request('team/member_space_limits/excluded_users/remove', arg, 'team', 'api', 'rpc');
};

/**
 * Get users custom quota. Returns none as the custom quota if none was set. A
 * maximum of 1000 members can be specified in a single call.
 * @function DropboxTeam#teamMemberSpaceLimitsGetCustomQuota
 * @arg {TeamCustomQuotaUsersArg} arg - The request parameters.
 * @returns {Promise.<Array.<TeamCustomQuotaResult>, Error.<TeamCustomQuotaError>>}
 */
routes$1.teamMemberSpaceLimitsGetCustomQuota = function (arg) {
  return this.request('team/member_space_limits/get_custom_quota', arg, 'team', 'api', 'rpc');
};

/**
 * Remove users custom quota. A maximum of 1000 members can be specified in a
 * single call.
 * @function DropboxTeam#teamMemberSpaceLimitsRemoveCustomQuota
 * @arg {TeamCustomQuotaUsersArg} arg - The request parameters.
 * @returns {Promise.<Array.<TeamRemoveCustomQuotaResult>, Error.<TeamCustomQuotaError>>}
 */
routes$1.teamMemberSpaceLimitsRemoveCustomQuota = function (arg) {
  return this.request('team/member_space_limits/remove_custom_quota', arg, 'team', 'api', 'rpc');
};

/**
 * Set users custom quota. Custom quota has to be at least 15GB. A maximum of
 * 1000 members can be specified in a single call.
 * @function DropboxTeam#teamMemberSpaceLimitsSetCustomQuota
 * @arg {TeamSetCustomQuotaArg} arg - The request parameters.
 * @returns {Promise.<Array.<TeamCustomQuotaResult>, Error.<TeamSetCustomQuotaError>>}
 */
routes$1.teamMemberSpaceLimitsSetCustomQuota = function (arg) {
  return this.request('team/member_space_limits/set_custom_quota', arg, 'team', 'api', 'rpc');
};

/**
 * Adds members to a team. Permission : Team member management A maximum of 20
 * members can be specified in a single call. If no Dropbox account exists with
 * the email address specified, a new Dropbox account will be created with the
 * given email address, and that account will be invited to the team. If a
 * personal Dropbox account exists with the email address specified in the call,
 * this call will create a placeholder Dropbox account for the user on the team
 * and send an email inviting the user to migrate their existing personal
 * account onto the team. Team member management apps are required to set an
 * initial given_name and surname for a user to use in the team invitation and
 * for 'Perform as team member' actions taken on the user before they become
 * 'active'.
 * @function DropboxTeam#teamMembersAdd
 * @arg {TeamMembersAddArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersAddLaunch, Error.<void>>}
 */
routes$1.teamMembersAdd = function (arg) {
  return this.request('team/members/add', arg, 'team', 'api', 'rpc');
};

/**
 * Once an async_job_id is returned from members/add , use this to poll the
 * status of the asynchronous request. Permission : Team member management.
 * @function DropboxTeam#teamMembersAddJobStatusGet
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersAddJobStatus, Error.<AsyncPollError>>}
 */
routes$1.teamMembersAddJobStatusGet = function (arg) {
  return this.request('team/members/add/job_status/get', arg, 'team', 'api', 'rpc');
};

/**
 * Returns information about multiple team members. Permission : Team
 * information This endpoint will return MembersGetInfoItem.id_not_found, for
 * IDs (or emails) that cannot be matched to a valid team member.
 * @function DropboxTeam#teamMembersGetInfo
 * @arg {TeamMembersGetInfoArgs} arg - The request parameters.
 * @returns {Promise.<Object, Error.<TeamMembersGetInfoError>>}
 */
routes$1.teamMembersGetInfo = function (arg) {
  return this.request('team/members/get_info', arg, 'team', 'api', 'rpc');
};

/**
 * Lists members of a team. Permission : Team information.
 * @function DropboxTeam#teamMembersList
 * @arg {TeamMembersListArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersListResult, Error.<TeamMembersListError>>}
 */
routes$1.teamMembersList = function (arg) {
  return this.request('team/members/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from members/list, use this to paginate
 * through all team members. Permission : Team information.
 * @function DropboxTeam#teamMembersListContinue
 * @arg {TeamMembersListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersListResult, Error.<TeamMembersListContinueError>>}
 */
routes$1.teamMembersListContinue = function (arg) {
  return this.request('team/members/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Recover a deleted member. Permission : Team member management Exactly one of
 * team_member_id, email, or external_id must be provided to identify the user
 * account.
 * @function DropboxTeam#teamMembersRecover
 * @arg {TeamMembersRecoverArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamMembersRecoverError>>}
 */
routes$1.teamMembersRecover = function (arg) {
  return this.request('team/members/recover', arg, 'team', 'api', 'rpc');
};

/**
 * Removes a member from a team. Permission : Team member management Exactly one
 * of team_member_id, email, or external_id must be provided to identify the
 * user account. Accounts can be recovered via members/recover for a 7 day
 * period or until the account has been permanently deleted or transferred to
 * another account (whichever comes first). Calling members/add while a user is
 * still recoverable on your team will return with
 * MemberAddResult.user_already_on_team. Accounts can have their files
 * transferred via the admin console for a limited time, based on the version
 * history length associated with the team (120 days for most teams). This
 * endpoint may initiate an asynchronous job. To obtain the final result of the
 * job, the client should periodically poll members/remove/job_status/get.
 * @function DropboxTeam#teamMembersRemove
 * @arg {TeamMembersRemoveArg} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<TeamMembersRemoveError>>}
 */
routes$1.teamMembersRemove = function (arg) {
  return this.request('team/members/remove', arg, 'team', 'api', 'rpc');
};

/**
 * Once an async_job_id is returned from members/remove , use this to poll the
 * status of the asynchronous request. Permission : Team member management.
 * @function DropboxTeam#teamMembersRemoveJobStatusGet
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<AsyncPollEmptyResult, Error.<AsyncPollError>>}
 */
routes$1.teamMembersRemoveJobStatusGet = function (arg) {
  return this.request('team/members/remove/job_status/get', arg, 'team', 'api', 'rpc');
};

/**
 * Sends welcome email to pending team member. Permission : Team member
 * management Exactly one of team_member_id, email, or external_id must be
 * provided to identify the user account. No-op if team member is not pending.
 * @function DropboxTeam#teamMembersSendWelcomeEmail
 * @arg {TeamUserSelectorArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamMembersSendWelcomeError>>}
 */
routes$1.teamMembersSendWelcomeEmail = function (arg) {
  return this.request('team/members/send_welcome_email', arg, 'team', 'api', 'rpc');
};

/**
 * Updates a team member's permissions. Permission : Team member management.
 * @function DropboxTeam#teamMembersSetAdminPermissions
 * @arg {TeamMembersSetPermissionsArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersSetPermissionsResult, Error.<TeamMembersSetPermissionsError>>}
 */
routes$1.teamMembersSetAdminPermissions = function (arg) {
  return this.request('team/members/set_admin_permissions', arg, 'team', 'api', 'rpc');
};

/**
 * Updates a team member's profile. Permission : Team member management.
 * @function DropboxTeam#teamMembersSetProfile
 * @arg {TeamMembersSetProfileArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamMemberInfo, Error.<TeamMembersSetProfileError>>}
 */
routes$1.teamMembersSetProfile = function (arg) {
  return this.request('team/members/set_profile', arg, 'team', 'api', 'rpc');
};

/**
 * Suspend a member from a team. Permission : Team member management Exactly one
 * of team_member_id, email, or external_id must be provided to identify the
 * user account.
 * @function DropboxTeam#teamMembersSuspend
 * @arg {TeamMembersDeactivateArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamMembersSuspendError>>}
 */
routes$1.teamMembersSuspend = function (arg) {
  return this.request('team/members/suspend', arg, 'team', 'api', 'rpc');
};

/**
 * Unsuspend a member from a team. Permission : Team member management Exactly
 * one of team_member_id, email, or external_id must be provided to identify the
 * user account.
 * @function DropboxTeam#teamMembersUnsuspend
 * @arg {TeamMembersUnsuspendArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamMembersUnsuspendError>>}
 */
routes$1.teamMembersUnsuspend = function (arg) {
  return this.request('team/members/unsuspend', arg, 'team', 'api', 'rpc');
};

/**
 * Returns a list of all team-accessible namespaces. This list includes team
 * folders, shared folders containing team members, team members' home
 * namespaces, and team members' app folders. Home namespaces and app folders
 * are always owned by this team or members of the team, but shared folders may
 * be owned by other users or other teams. Duplicates may occur in the list.
 * @function DropboxTeam#teamNamespacesList
 * @arg {TeamTeamNamespacesListArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamNamespacesListResult, Error.<void>>}
 */
routes$1.teamNamespacesList = function (arg) {
  return this.request('team/namespaces/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from namespaces/list, use this to paginate
 * through all team-accessible namespaces. Duplicates may occur in the list.
 * @function DropboxTeam#teamNamespacesListContinue
 * @arg {TeamTeamNamespacesListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamNamespacesListResult, Error.<TeamTeamNamespacesListContinueError>>}
 */
routes$1.teamNamespacesListContinue = function (arg) {
  return this.request('team/namespaces/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * @function DropboxTeam#teamPropertiesTemplateAdd
 * @deprecated
 * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesAddTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes$1.teamPropertiesTemplateAdd = function (arg) {
  return this.request('team/properties/template/add', arg, 'team', 'api', 'rpc');
};

/**
 * @function DropboxTeam#teamPropertiesTemplateGet
 * @deprecated
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes$1.teamPropertiesTemplateGet = function (arg) {
  return this.request('team/properties/template/get', arg, 'team', 'api', 'rpc');
};

/**
 * @function DropboxTeam#teamPropertiesTemplateList
 * @deprecated
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes$1.teamPropertiesTemplateList = function (arg) {
  return this.request('team/properties/template/list', arg, 'team', 'api', 'rpc');
};

/**
 * @function DropboxTeam#teamPropertiesTemplateUpdate
 * @deprecated
 * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesUpdateTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes$1.teamPropertiesTemplateUpdate = function (arg) {
  return this.request('team/properties/template/update', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves reporting data about a team's user activity.
 * @function DropboxTeam#teamReportsGetActivity
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<TeamGetActivityReport, Error.<TeamDateRangeError>>}
 */
routes$1.teamReportsGetActivity = function (arg) {
  return this.request('team/reports/get_activity', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves reporting data about a team's linked devices.
 * @function DropboxTeam#teamReportsGetDevices
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<TeamGetDevicesReport, Error.<TeamDateRangeError>>}
 */
routes$1.teamReportsGetDevices = function (arg) {
  return this.request('team/reports/get_devices', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves reporting data about a team's membership.
 * @function DropboxTeam#teamReportsGetMembership
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<TeamGetMembershipReport, Error.<TeamDateRangeError>>}
 */
routes$1.teamReportsGetMembership = function (arg) {
  return this.request('team/reports/get_membership', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves reporting data about a team's storage usage.
 * @function DropboxTeam#teamReportsGetStorage
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<TeamGetStorageReport, Error.<TeamDateRangeError>>}
 */
routes$1.teamReportsGetStorage = function (arg) {
  return this.request('team/reports/get_storage', arg, 'team', 'api', 'rpc');
};

/**
 * Sets an archived team folder's status to active. Permission : Team member
 * file access.
 * @function DropboxTeam#teamTeamFolderActivate
 * @arg {TeamTeamFolderIdArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderMetadata, Error.<TeamTeamFolderActivateError>>}
 */
routes$1.teamTeamFolderActivate = function (arg) {
  return this.request('team/team_folder/activate', arg, 'team', 'api', 'rpc');
};

/**
 * Sets an active team folder's status to archived and removes all folder and
 * file members. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderArchive
 * @arg {TeamTeamFolderArchiveArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderArchiveLaunch, Error.<TeamTeamFolderArchiveError>>}
 */
routes$1.teamTeamFolderArchive = function (arg) {
  return this.request('team/team_folder/archive', arg, 'team', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for archiving a team folder.
 * Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderArchiveCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderArchiveJobStatus, Error.<AsyncPollError>>}
 */
routes$1.teamTeamFolderArchiveCheck = function (arg) {
  return this.request('team/team_folder/archive/check', arg, 'team', 'api', 'rpc');
};

/**
 * Creates a new, active, team folder with no members. Permission : Team member
 * file access.
 * @function DropboxTeam#teamTeamFolderCreate
 * @arg {TeamTeamFolderCreateArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderMetadata, Error.<TeamTeamFolderCreateError>>}
 */
routes$1.teamTeamFolderCreate = function (arg) {
  return this.request('team/team_folder/create', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves metadata for team folders. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderGetInfo
 * @arg {TeamTeamFolderIdListArg} arg - The request parameters.
 * @returns {Promise.<Array.<TeamTeamFolderGetInfoItem>, Error.<void>>}
 */
routes$1.teamTeamFolderGetInfo = function (arg) {
  return this.request('team/team_folder/get_info', arg, 'team', 'api', 'rpc');
};

/**
 * Lists all team folders. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderList
 * @arg {TeamTeamFolderListArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderListResult, Error.<TeamTeamFolderListError>>}
 */
routes$1.teamTeamFolderList = function (arg) {
  return this.request('team/team_folder/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from team_folder/list, use this to paginate
 * through all team folders. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderListContinue
 * @arg {TeamTeamFolderListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderListResult, Error.<TeamTeamFolderListContinueError>>}
 */
routes$1.teamTeamFolderListContinue = function (arg) {
  return this.request('team/team_folder/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Permanently deletes an archived team folder. Permission : Team member file
 * access.
 * @function DropboxTeam#teamTeamFolderPermanentlyDelete
 * @arg {TeamTeamFolderIdArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamTeamFolderPermanentlyDeleteError>>}
 */
routes$1.teamTeamFolderPermanentlyDelete = function (arg) {
  return this.request('team/team_folder/permanently_delete', arg, 'team', 'api', 'rpc');
};

/**
 * Changes an active team folder's name. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderRename
 * @arg {TeamTeamFolderRenameArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderMetadata, Error.<TeamTeamFolderRenameError>>}
 */
routes$1.teamTeamFolderRename = function (arg) {
  return this.request('team/team_folder/rename', arg, 'team', 'api', 'rpc');
};

/**
 * Returns the member profile of the admin who generated the team access token
 * used to make the call.
 * @function DropboxTeam#teamTokenGetAuthenticatedAdmin
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<TeamTokenGetAuthenticatedAdminResult, Error.<TeamTokenGetAuthenticatedAdminError>>}
 */
routes$1.teamTokenGetAuthenticatedAdmin = function (arg) {
  return this.request('team/token/get_authenticated_admin', arg, 'team', 'api', 'rpc');
};

/**
 * @class DropboxTeam
 * @extends DropboxBase
 * @classdesc The Dropbox SDK class that provides access to team endpoints.
 * @arg {Object} options
 * @arg {String} [options.accessToken] - An access token for making authenticated
 * requests.
 * @arg {String} [options.clientId] - The client id for your app. Used to create
 * authentication URL.
 */
var DropboxTeam = function (_DropboxBase) {
  inherits(DropboxTeam, _DropboxBase);

  function DropboxTeam(options) {
    classCallCheck(this, DropboxTeam);

    var _this = possibleConstructorReturn(this, (DropboxTeam.__proto__ || Object.getPrototypeOf(DropboxTeam)).call(this, options));

    Object.assign(_this, routes$1);
    return _this;
  }

  /**
   * Returns an instance of Dropbox that can make calls to user api endpoints on
   * behalf of the passed user id, using the team access token.
   * @arg {String} userId - The user id to use the Dropbox class as
   * @returns {Dropbox} An instance of Dropbox used to make calls to user api
   * endpoints
   */


  createClass(DropboxTeam, [{
    key: 'actAsUser',
    value: function actAsUser(userId) {
      return new Dropbox({
        accessToken: this.accessToken,
        clientId: this.clientId,
        selectUser: userId
      });
    }
  }]);
  return DropboxTeam;
}(DropboxBase);



var dropboxTeam = Object.freeze({
	DropboxTeam: DropboxTeam
});

var src = {
  Dropbox: dropbox.Dropbox,
  DropboxTeam: dropboxTeam.DropboxTeam
};

return src;

})));
//# sourceMappingURL=Dropbox-sdk.js.map

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.DropboxTeam = factory());
}(this, (function () { 'use strict';

// Auto-generated by Stone, do not modify.
var routes = {};

/**
 * Creates an OAuth 2.0 access token from the supplied OAuth 1.0 access token.
 * @function Dropbox#authTokenFromOauth1
 * @arg {AuthTokenFromOAuth1Arg} arg - The request parameters.
 * @returns {Promise.<AuthTokenFromOAuth1Result, Error.<AuthTokenFromOAuth1Error>>}
 */
routes.authTokenFromOauth1 = function (arg) {
  return this.request('auth/token/from_oauth1', arg, 'app', 'api', 'rpc');
};

/**
 * Disables the access token used to authenticate the call.
 * @function Dropbox#authTokenRevoke
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<void, Error.<void>>}
 */
routes.authTokenRevoke = function (arg) {
  return this.request('auth/token/revoke', arg, 'user', 'api', 'rpc');
};

/**
 * Add property groups to a Dropbox file. See templates/add_for_user or
 * templates/add_for_team to create new templates.
 * @function Dropbox#filePropertiesPropertiesAdd
 * @arg {FilePropertiesAddPropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesAddPropertiesError>>}
 */
routes.filePropertiesPropertiesAdd = function (arg) {
  return this.request('file_properties/properties/add', arg, 'user', 'api', 'rpc');
};

/**
 * Overwrite property groups associated with a file. This endpoint should be
 * used instead of properties/update when property groups are being updated via
 * a "snapshot" instead of via a "delta". In other words, this endpoint will
 * delete all omitted fields from a property group, whereas properties/update
 * will only delete fields that are explicitly marked for deletion.
 * @function Dropbox#filePropertiesPropertiesOverwrite
 * @arg {FilePropertiesOverwritePropertyGroupArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesInvalidPropertyGroupError>>}
 */
routes.filePropertiesPropertiesOverwrite = function (arg) {
  return this.request('file_properties/properties/overwrite', arg, 'user', 'api', 'rpc');
};

/**
 * Permanently removes the specified property group from the file. To remove
 * specific property field key value pairs, see properties/update. To update a
 * template, see templates/update_for_user or templates/update_for_team.
 * Templates can't be removed once created.
 * @function Dropbox#filePropertiesPropertiesRemove
 * @arg {FilePropertiesRemovePropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesRemovePropertiesError>>}
 */
routes.filePropertiesPropertiesRemove = function (arg) {
  return this.request('file_properties/properties/remove', arg, 'user', 'api', 'rpc');
};

/**
 * Search across property templates for particular property field values.
 * @function Dropbox#filePropertiesPropertiesSearch
 * @arg {FilePropertiesPropertiesSearchArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesPropertiesSearchResult, Error.<FilePropertiesPropertiesSearchError>>}
 */
routes.filePropertiesPropertiesSearch = function (arg) {
  return this.request('file_properties/properties/search', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from properties/search, use this to paginate
 * through all search results.
 * @function Dropbox#filePropertiesPropertiesSearchContinue
 * @arg {FilePropertiesPropertiesSearchContinueArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesPropertiesSearchResult, Error.<FilePropertiesPropertiesSearchContinueError>>}
 */
routes.filePropertiesPropertiesSearchContinue = function (arg) {
  return this.request('file_properties/properties/search/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Add, update or remove properties associated with the supplied file and
 * templates. This endpoint should be used instead of properties/overwrite when
 * property groups are being updated via a "delta" instead of via a "snapshot" .
 * In other words, this endpoint will not delete any omitted fields from a
 * property group, whereas properties/overwrite will delete any fields that are
 * omitted from a property group.
 * @function Dropbox#filePropertiesPropertiesUpdate
 * @arg {FilePropertiesUpdatePropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesUpdatePropertiesError>>}
 */
routes.filePropertiesPropertiesUpdate = function (arg) {
  return this.request('file_properties/properties/update', arg, 'user', 'api', 'rpc');
};

/**
 * Add a template associated with a team. See properties/add to add properties
 * to a file or folder. Note: this endpoint will create team-owned templates.
 * @function Dropbox#filePropertiesTemplatesAddForTeam
 * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesAddTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes.filePropertiesTemplatesAddForTeam = function (arg) {
  return this.request('file_properties/templates/add_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Add a template associated with a user. See properties/add to add properties
 * to a file. This endpoint can't be called on a team member or admin's behalf.
 * @function Dropbox#filePropertiesTemplatesAddForUser
 * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesAddTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes.filePropertiesTemplatesAddForUser = function (arg) {
  return this.request('file_properties/templates/add_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Get the schema for a specified template.
 * @function Dropbox#filePropertiesTemplatesGetForTeam
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesGetForTeam = function (arg) {
  return this.request('file_properties/templates/get_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Get the schema for a specified template. This endpoint can't be called on a
 * team member or admin's behalf.
 * @function Dropbox#filePropertiesTemplatesGetForUser
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesGetForUser = function (arg) {
  return this.request('file_properties/templates/get_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Get the template identifiers for a team. To get the schema of each template
 * use templates/get_for_team.
 * @function Dropbox#filePropertiesTemplatesListForTeam
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesListForTeam = function (arg) {
  return this.request('file_properties/templates/list_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Get the template identifiers for a team. To get the schema of each template
 * use templates/get_for_user. This endpoint can't be called on a team member or
 * admin's behalf.
 * @function Dropbox#filePropertiesTemplatesListForUser
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesListForUser = function (arg) {
  return this.request('file_properties/templates/list_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Permanently removes the specified template created from
 * templates/add_for_user. All properties associated with the template will also
 * be removed. This action cannot be undone.
 * @function Dropbox#filePropertiesTemplatesRemoveForTeam
 * @arg {FilePropertiesRemoveTemplateArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesRemoveForTeam = function (arg) {
  return this.request('file_properties/templates/remove_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Permanently removes the specified template created from
 * templates/add_for_user. All properties associated with the template will also
 * be removed. This action cannot be undone.
 * @function Dropbox#filePropertiesTemplatesRemoveForUser
 * @arg {FilePropertiesRemoveTemplateArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesTemplateError>>}
 */
routes.filePropertiesTemplatesRemoveForUser = function (arg) {
  return this.request('file_properties/templates/remove_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Update a template associated with a team. This route can update the template
 * name, the template description and add optional properties to templates.
 * @function Dropbox#filePropertiesTemplatesUpdateForTeam
 * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesUpdateTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes.filePropertiesTemplatesUpdateForTeam = function (arg) {
  return this.request('file_properties/templates/update_for_team', arg, 'team', 'api', 'rpc');
};

/**
 * Update a template associated with a user. This route can update the template
 * name, the template description and add optional properties to templates. This
 * endpoint can't be called on a team member or admin's behalf.
 * @function Dropbox#filePropertiesTemplatesUpdateForUser
 * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesUpdateTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes.filePropertiesTemplatesUpdateForUser = function (arg) {
  return this.request('file_properties/templates/update_for_user', arg, 'user', 'api', 'rpc');
};

/**
 * Creates a file request for this user.
 * @function Dropbox#fileRequestsCreate
 * @arg {FileRequestsCreateFileRequestArgs} arg - The request parameters.
 * @returns {Promise.<FileRequestsFileRequest, Error.<FileRequestsCreateFileRequestError>>}
 */
routes.fileRequestsCreate = function (arg) {
  return this.request('file_requests/create', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the specified file request.
 * @function Dropbox#fileRequestsGet
 * @arg {FileRequestsGetFileRequestArgs} arg - The request parameters.
 * @returns {Promise.<FileRequestsFileRequest, Error.<FileRequestsGetFileRequestError>>}
 */
routes.fileRequestsGet = function (arg) {
  return this.request('file_requests/get', arg, 'user', 'api', 'rpc');
};

/**
 * Returns a list of file requests owned by this user. For apps with the app
 * folder permission, this will only return file requests with destinations in
 * the app folder.
 * @function Dropbox#fileRequestsList
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FileRequestsListFileRequestsResult, Error.<FileRequestsListFileRequestsError>>}
 */
routes.fileRequestsList = function (arg) {
  return this.request('file_requests/list', arg, 'user', 'api', 'rpc');
};

/**
 * Update a file request.
 * @function Dropbox#fileRequestsUpdate
 * @arg {FileRequestsUpdateFileRequestArgs} arg - The request parameters.
 * @returns {Promise.<FileRequestsFileRequest, Error.<FileRequestsUpdateFileRequestError>>}
 */
routes.fileRequestsUpdate = function (arg) {
  return this.request('file_requests/update', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the metadata for a file or folder. This is an alpha endpoint
 * compatible with the properties API. Note: Metadata for the root folder is
 * unsupported.
 * @function Dropbox#filesAlphaGetMetadata
 * @deprecated
 * @arg {FilesAlphaGetMetadataArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesAlphaGetMetadataError>>}
 */
routes.filesAlphaGetMetadata = function (arg) {
  return this.request('files/alpha/get_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Create a new file with the contents provided in the request. Note that this
 * endpoint is part of the properties API alpha and is slightly different from
 * upload. Do not use this to upload a file larger than 150 MB. Instead, create
 * an upload session with upload_session/start.
 * @function Dropbox#filesAlphaUpload
 * @deprecated
 * @arg {FilesCommitInfoWithProperties} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesUploadErrorWithProperties>>}
 */
routes.filesAlphaUpload = function (arg) {
  return this.request('files/alpha/upload', arg, 'user', 'content', 'upload');
};

/**
 * Copy a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be copied.
 * @function Dropbox#filesCopy
 * @deprecated
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesRelocationError>>}
 */
routes.filesCopy = function (arg) {
  return this.request('files/copy', arg, 'user', 'api', 'rpc');
};

/**
 * Copy multiple files or folders to different locations at once in the user's
 * Dropbox. If RelocationBatchArg.allow_shared_folder is false, this route is
 * atomic. If on entry failes, the whole transaction will abort. If
 * RelocationBatchArg.allow_shared_folder is true, not atomicity is guaranteed,
 * but you will be able to copy the contents of shared folders to new locations.
 * This route will return job ID immediately and do the async copy job in
 * background. Please use copy_batch/check to check the job status.
 * @function Dropbox#filesCopyBatch
 * @arg {FilesRelocationBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchLaunch, Error.<void>>}
 */
routes.filesCopyBatch = function (arg) {
  return this.request('files/copy_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for copy_batch. If success, it
 * returns list of results for each entry.
 * @function Dropbox#filesCopyBatchCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchJobStatus, Error.<AsyncPollError>>}
 */
routes.filesCopyBatchCheck = function (arg) {
  return this.request('files/copy_batch/check', arg, 'user', 'api', 'rpc');
};

/**
 * Get a copy reference to a file or folder. This reference string can be used
 * to save that file or folder to another user's Dropbox by passing it to
 * copy_reference/save.
 * @function Dropbox#filesCopyReferenceGet
 * @arg {FilesGetCopyReferenceArg} arg - The request parameters.
 * @returns {Promise.<FilesGetCopyReferenceResult, Error.<FilesGetCopyReferenceError>>}
 */
routes.filesCopyReferenceGet = function (arg) {
  return this.request('files/copy_reference/get', arg, 'user', 'api', 'rpc');
};

/**
 * Save a copy reference returned by copy_reference/get to the user's Dropbox.
 * @function Dropbox#filesCopyReferenceSave
 * @arg {FilesSaveCopyReferenceArg} arg - The request parameters.
 * @returns {Promise.<FilesSaveCopyReferenceResult, Error.<FilesSaveCopyReferenceError>>}
 */
routes.filesCopyReferenceSave = function (arg) {
  return this.request('files/copy_reference/save', arg, 'user', 'api', 'rpc');
};

/**
 * Copy a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be copied.
 * @function Dropbox#filesCopyV2
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationResult, Error.<FilesRelocationError>>}
 */
routes.filesCopyV2 = function (arg) {
  return this.request('files/copy_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Create a folder at a given path.
 * @function Dropbox#filesCreateFolder
 * @deprecated
 * @arg {FilesCreateFolderArg} arg - The request parameters.
 * @returns {Promise.<FilesFolderMetadata, Error.<FilesCreateFolderError>>}
 */
routes.filesCreateFolder = function (arg) {
  return this.request('files/create_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Create a folder at a given path.
 * @function Dropbox#filesCreateFolderV2
 * @arg {FilesCreateFolderArg} arg - The request parameters.
 * @returns {Promise.<FilesCreateFolderResult, Error.<FilesCreateFolderError>>}
 */
routes.filesCreateFolderV2 = function (arg) {
  return this.request('files/create_folder_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Delete the file or folder at a given path. If the path is a folder, all its
 * contents will be deleted too. A successful response indicates that the file
 * or folder was deleted. The returned metadata will be the corresponding
 * FileMetadata or FolderMetadata for the item at time of deletion, and not a
 * DeletedMetadata object.
 * @function Dropbox#filesDelete
 * @deprecated
 * @arg {FilesDeleteArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesDeleteError>>}
 */
routes.filesDelete = function (arg) {
  return this.request('files/delete', arg, 'user', 'api', 'rpc');
};

/**
 * Delete multiple files/folders at once. This route is asynchronous, which
 * returns a job ID immediately and runs the delete batch asynchronously. Use
 * delete_batch/check to check the job status.
 * @function Dropbox#filesDeleteBatch
 * @arg {FilesDeleteBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesDeleteBatchLaunch, Error.<void>>}
 */
routes.filesDeleteBatch = function (arg) {
  return this.request('files/delete_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for delete_batch. If success, it
 * returns list of result for each entry.
 * @function Dropbox#filesDeleteBatchCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesDeleteBatchJobStatus, Error.<AsyncPollError>>}
 */
routes.filesDeleteBatchCheck = function (arg) {
  return this.request('files/delete_batch/check', arg, 'user', 'api', 'rpc');
};

/**
 * Delete the file or folder at a given path. If the path is a folder, all its
 * contents will be deleted too. A successful response indicates that the file
 * or folder was deleted. The returned metadata will be the corresponding
 * FileMetadata or FolderMetadata for the item at time of deletion, and not a
 * DeletedMetadata object.
 * @function Dropbox#filesDeleteV2
 * @arg {FilesDeleteArg} arg - The request parameters.
 * @returns {Promise.<FilesDeleteResult, Error.<FilesDeleteError>>}
 */
routes.filesDeleteV2 = function (arg) {
  return this.request('files/delete_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Download a file from a user's Dropbox.
 * @function Dropbox#filesDownload
 * @arg {FilesDownloadArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesDownloadError>>}
 */
routes.filesDownload = function (arg) {
  return this.request('files/download', arg, 'user', 'content', 'download');
};

/**
 * Download a folder from the user's Dropbox, as a zip file. The folder must be
 * less than 1 GB in size and have fewer than 10,000 total files. The input
 * cannot be a single file.
 * @function Dropbox#filesDownloadZip
 * @arg {FilesDownloadZipArg} arg - The request parameters.
 * @returns {Promise.<FilesDownloadZipResult, Error.<FilesDownloadZipError>>}
 */
routes.filesDownloadZip = function (arg) {
  return this.request('files/download_zip', arg, 'user', 'content', 'download');
};

/**
 * Returns the metadata for a file or folder. Note: Metadata for the root folder
 * is unsupported.
 * @function Dropbox#filesGetMetadata
 * @arg {FilesGetMetadataArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesGetMetadataError>>}
 */
routes.filesGetMetadata = function (arg) {
  return this.request('files/get_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Get a preview for a file. Currently, PDF previews are generated for files
 * with the following extensions: .ai, .doc, .docm, .docx, .eps, .odp, .odt,
 * .pps, .ppsm, .ppsx, .ppt, .pptm, .pptx, .rtf. HTML previews are generated for
 * files with the following extensions: .csv, .ods, .xls, .xlsm, .xlsx. Other
 * formats will return an unsupported extension error.
 * @function Dropbox#filesGetPreview
 * @arg {FilesPreviewArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesPreviewError>>}
 */
routes.filesGetPreview = function (arg) {
  return this.request('files/get_preview', arg, 'user', 'content', 'download');
};

/**
 * Get a temporary link to stream content of a file. This link will expire in
 * four hours and afterwards you will get 410 Gone. Content-Type of the link is
 * determined automatically by the file's mime type.
 * @function Dropbox#filesGetTemporaryLink
 * @arg {FilesGetTemporaryLinkArg} arg - The request parameters.
 * @returns {Promise.<FilesGetTemporaryLinkResult, Error.<FilesGetTemporaryLinkError>>}
 */
routes.filesGetTemporaryLink = function (arg) {
  return this.request('files/get_temporary_link', arg, 'user', 'api', 'rpc');
};

/**
 * Get a thumbnail for an image. This method currently supports files with the
 * following file extensions: jpg, jpeg, png, tiff, tif, gif and bmp. Photos
 * that are larger than 20MB in size won't be converted to a thumbnail.
 * @function Dropbox#filesGetThumbnail
 * @arg {FilesThumbnailArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesThumbnailError>>}
 */
routes.filesGetThumbnail = function (arg) {
  return this.request('files/get_thumbnail', arg, 'user', 'content', 'download');
};

/**
 * Get thumbnails for a list of images. We allow up to 25 thumbnails in a single
 * batch. This method currently supports files with the following file
 * extensions: jpg, jpeg, png, tiff, tif, gif and bmp. Photos that are larger
 * than 20MB in size won't be converted to a thumbnail.
 * @function Dropbox#filesGetThumbnailBatch
 * @arg {FilesGetThumbnailBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesGetThumbnailBatchResult, Error.<FilesGetThumbnailBatchError>>}
 */
routes.filesGetThumbnailBatch = function (arg) {
  return this.request('files/get_thumbnail_batch', arg, 'user', 'content', 'rpc');
};

/**
 * Starts returning the contents of a folder. If the result's
 * ListFolderResult.has_more field is true, call list_folder/continue with the
 * returned ListFolderResult.cursor to retrieve more entries. If you're using
 * ListFolderArg.recursive set to true to keep a local cache of the contents of
 * a Dropbox account, iterate through each entry in order and process them as
 * follows to keep your local state in sync: For each FileMetadata, store the
 * new entry at the given path in your local state. If the required parent
 * folders don't exist yet, create them. If there's already something else at
 * the given path, replace it and remove all its children. For each
 * FolderMetadata, store the new entry at the given path in your local state. If
 * the required parent folders don't exist yet, create them. If there's already
 * something else at the given path, replace it but leave the children as they
 * are. Check the new entry's FolderSharingInfo.read_only and set all its
 * children's read-only statuses to match. For each DeletedMetadata, if your
 * local state has something at the given path, remove it and all its children.
 * If there's nothing at the given path, ignore this entry. Note:
 * auth.RateLimitError may be returned if multiple list_folder or
 * list_folder/continue calls with same parameters are made simultaneously by
 * same API app for same user. If your app implements retry logic, please hold
 * off the retry until the previous request finishes.
 * @function Dropbox#filesListFolder
 * @arg {FilesListFolderArg} arg - The request parameters.
 * @returns {Promise.<FilesListFolderResult, Error.<FilesListFolderError>>}
 */
routes.filesListFolder = function (arg) {
  return this.request('files/list_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_folder, use this to paginate
 * through all files and retrieve updates to the folder, following the same
 * rules as documented for list_folder.
 * @function Dropbox#filesListFolderContinue
 * @arg {FilesListFolderContinueArg} arg - The request parameters.
 * @returns {Promise.<FilesListFolderResult, Error.<FilesListFolderContinueError>>}
 */
routes.filesListFolderContinue = function (arg) {
  return this.request('files/list_folder/continue', arg, 'user', 'api', 'rpc');
};

/**
 * A way to quickly get a cursor for the folder's state. Unlike list_folder,
 * list_folder/get_latest_cursor doesn't return any entries. This endpoint is
 * for app which only needs to know about new files and modifications and
 * doesn't need to know about files that already exist in Dropbox.
 * @function Dropbox#filesListFolderGetLatestCursor
 * @arg {FilesListFolderArg} arg - The request parameters.
 * @returns {Promise.<FilesListFolderGetLatestCursorResult, Error.<FilesListFolderError>>}
 */
routes.filesListFolderGetLatestCursor = function (arg) {
  return this.request('files/list_folder/get_latest_cursor', arg, 'user', 'api', 'rpc');
};

/**
 * A longpoll endpoint to wait for changes on an account. In conjunction with
 * list_folder/continue, this call gives you a low-latency way to monitor an
 * account for file changes. The connection will block until there are changes
 * available or a timeout occurs. This endpoint is useful mostly for client-side
 * apps. If you're looking for server-side notifications, check out our webhooks
 * documentation https://www.dropbox.com/developers/reference/webhooks.
 * @function Dropbox#filesListFolderLongpoll
 * @arg {FilesListFolderLongpollArg} arg - The request parameters.
 * @returns {Promise.<FilesListFolderLongpollResult, Error.<FilesListFolderLongpollError>>}
 */
routes.filesListFolderLongpoll = function (arg) {
  return this.request('files/list_folder/longpoll', arg, 'noauth', 'notify', 'rpc');
};

/**
 * Returns revisions for files based on a file path or a file id. The file path
 * or file id is identified from the latest file entry at the given file path or
 * id. This end point allows your app to query either by file path or file id by
 * setting the mode parameter appropriately. In the ListRevisionsMode.path
 * (default) mode, all revisions at the same file path as the latest file entry
 * are returned. If revisions with the same file id are desired, then mode must
 * be set to ListRevisionsMode.id. The ListRevisionsMode.id mode is useful to
 * retrieve revisions for a given file across moves or renames.
 * @function Dropbox#filesListRevisions
 * @arg {FilesListRevisionsArg} arg - The request parameters.
 * @returns {Promise.<FilesListRevisionsResult, Error.<FilesListRevisionsError>>}
 */
routes.filesListRevisions = function (arg) {
  return this.request('files/list_revisions', arg, 'user', 'api', 'rpc');
};

/**
 * Move a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be moved.
 * @function Dropbox#filesMove
 * @deprecated
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<(FilesFileMetadata|FilesFolderMetadata|FilesDeletedMetadata), Error.<FilesRelocationError>>}
 */
routes.filesMove = function (arg) {
  return this.request('files/move', arg, 'user', 'api', 'rpc');
};

/**
 * Move multiple files or folders to different locations at once in the user's
 * Dropbox. This route is 'all or nothing', which means if one entry fails, the
 * whole transaction will abort. This route will return job ID immediately and
 * do the async moving job in background. Please use move_batch/check to check
 * the job status.
 * @function Dropbox#filesMoveBatch
 * @arg {FilesRelocationBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchLaunch, Error.<void>>}
 */
routes.filesMoveBatch = function (arg) {
  return this.request('files/move_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for move_batch. If success, it
 * returns list of results for each entry.
 * @function Dropbox#filesMoveBatchCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationBatchJobStatus, Error.<AsyncPollError>>}
 */
routes.filesMoveBatchCheck = function (arg) {
  return this.request('files/move_batch/check', arg, 'user', 'api', 'rpc');
};

/**
 * Move a file or folder to a different location in the user's Dropbox. If the
 * source path is a folder all its contents will be moved.
 * @function Dropbox#filesMoveV2
 * @arg {FilesRelocationArg} arg - The request parameters.
 * @returns {Promise.<FilesRelocationResult, Error.<FilesRelocationError>>}
 */
routes.filesMoveV2 = function (arg) {
  return this.request('files/move_v2', arg, 'user', 'api', 'rpc');
};

/**
 * Permanently delete the file or folder at a given path (see
 * https://www.dropbox.com/en/help/40). Note: This endpoint is only available
 * for Dropbox Business apps.
 * @function Dropbox#filesPermanentlyDelete
 * @arg {FilesDeleteArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilesDeleteError>>}
 */
routes.filesPermanentlyDelete = function (arg) {
  return this.request('files/permanently_delete', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesAdd
 * @deprecated
 * @arg {FilePropertiesAddPropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesAddPropertiesError>>}
 */
routes.filesPropertiesAdd = function (arg) {
  return this.request('files/properties/add', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesOverwrite
 * @deprecated
 * @arg {FilePropertiesOverwritePropertyGroupArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesInvalidPropertyGroupError>>}
 */
routes.filesPropertiesOverwrite = function (arg) {
  return this.request('files/properties/overwrite', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesRemove
 * @deprecated
 * @arg {FilePropertiesRemovePropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesRemovePropertiesError>>}
 */
routes.filesPropertiesRemove = function (arg) {
  return this.request('files/properties/remove', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesTemplateGet
 * @deprecated
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filesPropertiesTemplateGet = function (arg) {
  return this.request('files/properties/template/get', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesTemplateList
 * @deprecated
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes.filesPropertiesTemplateList = function (arg) {
  return this.request('files/properties/template/list', arg, 'user', 'api', 'rpc');
};

/**
 * @function Dropbox#filesPropertiesUpdate
 * @deprecated
 * @arg {FilePropertiesUpdatePropertiesArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilePropertiesUpdatePropertiesError>>}
 */
routes.filesPropertiesUpdate = function (arg) {
  return this.request('files/properties/update', arg, 'user', 'api', 'rpc');
};

/**
 * Restore a file to a specific revision.
 * @function Dropbox#filesRestore
 * @arg {FilesRestoreArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesRestoreError>>}
 */
routes.filesRestore = function (arg) {
  return this.request('files/restore', arg, 'user', 'api', 'rpc');
};

/**
 * Save a specified URL into a file in user's Dropbox. If the given path already
 * exists, the file will be renamed to avoid the conflict (e.g. myfile (1).txt).
 * @function Dropbox#filesSaveUrl
 * @arg {FilesSaveUrlArg} arg - The request parameters.
 * @returns {Promise.<FilesSaveUrlResult, Error.<FilesSaveUrlError>>}
 */
routes.filesSaveUrl = function (arg) {
  return this.request('files/save_url', arg, 'user', 'api', 'rpc');
};

/**
 * Check the status of a save_url job.
 * @function Dropbox#filesSaveUrlCheckJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesSaveUrlJobStatus, Error.<AsyncPollError>>}
 */
routes.filesSaveUrlCheckJobStatus = function (arg) {
  return this.request('files/save_url/check_job_status', arg, 'user', 'api', 'rpc');
};

/**
 * Searches for files and folders. Note: Recent changes may not immediately be
 * reflected in search results due to a short delay in indexing.
 * @function Dropbox#filesSearch
 * @arg {FilesSearchArg} arg - The request parameters.
 * @returns {Promise.<FilesSearchResult, Error.<FilesSearchError>>}
 */
routes.filesSearch = function (arg) {
  return this.request('files/search', arg, 'user', 'api', 'rpc');
};

/**
 * Create a new file with the contents provided in the request. Do not use this
 * to upload a file larger than 150 MB. Instead, create an upload session with
 * upload_session/start.
 * @function Dropbox#filesUpload
 * @arg {FilesCommitInfo} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesUploadError>>}
 */
routes.filesUpload = function (arg) {
  return this.request('files/upload', arg, 'user', 'content', 'upload');
};

/**
 * Append more data to an upload session. A single request should not upload
 * more than 150 MB.
 * @function Dropbox#filesUploadSessionAppend
 * @deprecated
 * @arg {FilesUploadSessionCursor} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilesUploadSessionLookupError>>}
 */
routes.filesUploadSessionAppend = function (arg) {
  return this.request('files/upload_session/append', arg, 'user', 'content', 'upload');
};

/**
 * Append more data to an upload session. When the parameter close is set, this
 * call will close the session. A single request should not upload more than 150
 * MB.
 * @function Dropbox#filesUploadSessionAppendV2
 * @arg {FilesUploadSessionAppendArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<FilesUploadSessionLookupError>>}
 */
routes.filesUploadSessionAppendV2 = function (arg) {
  return this.request('files/upload_session/append_v2', arg, 'user', 'content', 'upload');
};

/**
 * Finish an upload session and save the uploaded data to the given file path. A
 * single request should not upload more than 150 MB.
 * @function Dropbox#filesUploadSessionFinish
 * @arg {FilesUploadSessionFinishArg} arg - The request parameters.
 * @returns {Promise.<FilesFileMetadata, Error.<FilesUploadSessionFinishError>>}
 */
routes.filesUploadSessionFinish = function (arg) {
  return this.request('files/upload_session/finish', arg, 'user', 'content', 'upload');
};

/**
 * This route helps you commit many files at once into a user's Dropbox. Use
 * upload_session/start and upload_session/append_v2 to upload file contents. We
 * recommend uploading many files in parallel to increase throughput. Once the
 * file contents have been uploaded, rather than calling upload_session/finish,
 * use this route to finish all your upload sessions in a single request.
 * UploadSessionStartArg.close or UploadSessionAppendArg.close needs to be true
 * for the last upload_session/start or upload_session/append_v2 call. This
 * route will return a job_id immediately and do the async commit job in
 * background. Use upload_session/finish_batch/check to check the job status.
 * For the same account, this route should be executed serially. That means you
 * should not start the next job before current job finishes. We allow up to
 * 1000 entries in a single request.
 * @function Dropbox#filesUploadSessionFinishBatch
 * @arg {FilesUploadSessionFinishBatchArg} arg - The request parameters.
 * @returns {Promise.<FilesUploadSessionFinishBatchLaunch, Error.<void>>}
 */
routes.filesUploadSessionFinishBatch = function (arg) {
  return this.request('files/upload_session/finish_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for upload_session/finish_batch. If
 * success, it returns list of result for each entry.
 * @function Dropbox#filesUploadSessionFinishBatchCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<FilesUploadSessionFinishBatchJobStatus, Error.<AsyncPollError>>}
 */
routes.filesUploadSessionFinishBatchCheck = function (arg) {
  return this.request('files/upload_session/finish_batch/check', arg, 'user', 'api', 'rpc');
};

/**
 * Upload sessions allow you to upload a single file in one or more requests,
 * for example where the size of the file is greater than 150 MB.  This call
 * starts a new upload session with the given data. You can then use
 * upload_session/append_v2 to add more data and upload_session/finish to save
 * all the data to a file in Dropbox. A single request should not upload more
 * than 150 MB. An upload session can be used for a maximum of 48 hours.
 * Attempting to use an UploadSessionStartResult.session_id with
 * upload_session/append_v2 or upload_session/finish more than 48 hours after
 * its creation will return a UploadSessionLookupError.not_found.
 * @function Dropbox#filesUploadSessionStart
 * @arg {FilesUploadSessionStartArg} arg - The request parameters.
 * @returns {Promise.<FilesUploadSessionStartResult, Error.<void>>}
 */
routes.filesUploadSessionStart = function (arg) {
  return this.request('files/upload_session/start', arg, 'user', 'content', 'upload');
};

/**
 * Marks the given Paper doc as archived. Note: This action can be performed or
 * undone by anyone with edit permissions to the doc.
 * @function Dropbox#paperDocsArchive
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
 */
routes.paperDocsArchive = function (arg) {
  return this.request('paper/docs/archive', arg, 'user', 'api', 'rpc');
};

/**
 * Creates a new Paper doc with the provided content.
 * @function Dropbox#paperDocsCreate
 * @arg {PaperPaperDocCreateArgs} arg - The request parameters.
 * @returns {Promise.<PaperPaperDocCreateUpdateResult, Error.<PaperPaperDocCreateError>>}
 */
routes.paperDocsCreate = function (arg) {
  return this.request('paper/docs/create', arg, 'user', 'api', 'upload');
};

/**
 * Exports and downloads Paper doc either as HTML or markdown.
 * @function Dropbox#paperDocsDownload
 * @arg {PaperPaperDocExport} arg - The request parameters.
 * @returns {Promise.<PaperPaperDocExportResult, Error.<PaperDocLookupError>>}
 */
routes.paperDocsDownload = function (arg) {
  return this.request('paper/docs/download', arg, 'user', 'api', 'download');
};

/**
 * Lists the users who are explicitly invited to the Paper folder in which the
 * Paper doc is contained. For private folders all users (including owner)
 * shared on the folder are listed and for team folders all non-team users
 * shared on the folder are returned.
 * @function Dropbox#paperDocsFolderUsersList
 * @arg {PaperListUsersOnFolderArgs} arg - The request parameters.
 * @returns {Promise.<PaperListUsersOnFolderResponse, Error.<PaperDocLookupError>>}
 */
routes.paperDocsFolderUsersList = function (arg) {
  return this.request('paper/docs/folder_users/list', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from docs/folder_users/list, use this to
 * paginate through all users on the Paper folder.
 * @function Dropbox#paperDocsFolderUsersListContinue
 * @arg {PaperListUsersOnFolderContinueArgs} arg - The request parameters.
 * @returns {Promise.<PaperListUsersOnFolderResponse, Error.<PaperListUsersCursorError>>}
 */
routes.paperDocsFolderUsersListContinue = function (arg) {
  return this.request('paper/docs/folder_users/list/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Retrieves folder information for the given Paper doc. This includes:   -
 * folder sharing policy; permissions for subfolders are set by the top-level
 * folder.   - full 'filepath', i.e. the list of folders (both folderId and
 * folderName) from     the root folder to the folder directly containing the
 * Paper doc.  Note: If the Paper doc is not in any folder (aka unfiled) the
 * response will be empty.
 * @function Dropbox#paperDocsGetFolderInfo
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<PaperFoldersContainingPaperDoc, Error.<PaperDocLookupError>>}
 */
routes.paperDocsGetFolderInfo = function (arg) {
  return this.request('paper/docs/get_folder_info', arg, 'user', 'api', 'rpc');
};

/**
 * Return the list of all Paper docs according to the argument specifications.
 * To iterate over through the full pagination, pass the cursor to
 * docs/list/continue.
 * @function Dropbox#paperDocsList
 * @arg {PaperListPaperDocsArgs} arg - The request parameters.
 * @returns {Promise.<PaperListPaperDocsResponse, Error.<void>>}
 */
routes.paperDocsList = function (arg) {
  return this.request('paper/docs/list', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from docs/list, use this to paginate through
 * all Paper doc.
 * @function Dropbox#paperDocsListContinue
 * @arg {PaperListPaperDocsContinueArgs} arg - The request parameters.
 * @returns {Promise.<PaperListPaperDocsResponse, Error.<PaperListDocsCursorError>>}
 */
routes.paperDocsListContinue = function (arg) {
  return this.request('paper/docs/list/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Permanently deletes the given Paper doc. This operation is final as the doc
 * cannot be recovered.  Note: This action can be performed only by the doc
 * owner.
 * @function Dropbox#paperDocsPermanentlyDelete
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
 */
routes.paperDocsPermanentlyDelete = function (arg) {
  return this.request('paper/docs/permanently_delete', arg, 'user', 'api', 'rpc');
};

/**
 * Gets the default sharing policy for the given Paper doc.
 * @function Dropbox#paperDocsSharingPolicyGet
 * @arg {PaperRefPaperDoc} arg - The request parameters.
 * @returns {Promise.<PaperSharingPolicy, Error.<PaperDocLookupError>>}
 */
routes.paperDocsSharingPolicyGet = function (arg) {
  return this.request('paper/docs/sharing_policy/get', arg, 'user', 'api', 'rpc');
};

/**
 * Sets the default sharing policy for the given Paper doc. The default
 * 'team_sharing_policy' can be changed only by teams, omit this field for
 * personal accounts.  Note: 'public_sharing_policy' cannot be set to the value
 * 'disabled' because this setting can be changed only via the team admin
 * console.
 * @function Dropbox#paperDocsSharingPolicySet
 * @arg {PaperPaperDocSharingPolicy} arg - The request parameters.
 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
 */
routes.paperDocsSharingPolicySet = function (arg) {
  return this.request('paper/docs/sharing_policy/set', arg, 'user', 'api', 'rpc');
};

/**
 * Updates an existing Paper doc with the provided content.
 * @function Dropbox#paperDocsUpdate
 * @arg {PaperPaperDocUpdateArgs} arg - The request parameters.
 * @returns {Promise.<PaperPaperDocCreateUpdateResult, Error.<PaperPaperDocUpdateError>>}
 */
routes.paperDocsUpdate = function (arg) {
  return this.request('paper/docs/update', arg, 'user', 'api', 'upload');
};

/**
 * Allows an owner or editor to add users to a Paper doc or change their
 * permissions using their email address or Dropbox account ID.  Note: The Doc
 * owner's permissions cannot be changed.
 * @function Dropbox#paperDocsUsersAdd
 * @arg {PaperAddPaperDocUser} arg - The request parameters.
 * @returns {Promise.<Array.<PaperAddPaperDocUserMemberResult>, Error.<PaperDocLookupError>>}
 */
routes.paperDocsUsersAdd = function (arg) {
  return this.request('paper/docs/users/add', arg, 'user', 'api', 'rpc');
};

/**
 * Lists all users who visited the Paper doc or users with explicit access. This
 * call excludes users who have been removed. The list is sorted by the date of
 * the visit or the share date. The list will include both users, the explicitly
 * shared ones as well as those who came in using the Paper url link.
 * @function Dropbox#paperDocsUsersList
 * @arg {PaperListUsersOnPaperDocArgs} arg - The request parameters.
 * @returns {Promise.<PaperListUsersOnPaperDocResponse, Error.<PaperDocLookupError>>}
 */
routes.paperDocsUsersList = function (arg) {
  return this.request('paper/docs/users/list', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from docs/users/list, use this to paginate
 * through all users on the Paper doc.
 * @function Dropbox#paperDocsUsersListContinue
 * @arg {PaperListUsersOnPaperDocContinueArgs} arg - The request parameters.
 * @returns {Promise.<PaperListUsersOnPaperDocResponse, Error.<PaperListUsersCursorError>>}
 */
routes.paperDocsUsersListContinue = function (arg) {
  return this.request('paper/docs/users/list/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Allows an owner or editor to remove users from a Paper doc using their email
 * address or Dropbox account ID.  Note: Doc owner cannot be removed.
 * @function Dropbox#paperDocsUsersRemove
 * @arg {PaperRemovePaperDocUser} arg - The request parameters.
 * @returns {Promise.<void, Error.<PaperDocLookupError>>}
 */
routes.paperDocsUsersRemove = function (arg) {
  return this.request('paper/docs/users/remove', arg, 'user', 'api', 'rpc');
};

/**
 * Adds specified members to a file.
 * @function Dropbox#sharingAddFileMember
 * @arg {SharingAddFileMemberArgs} arg - The request parameters.
 * @returns {Promise.<Array.<SharingFileMemberActionResult>, Error.<SharingAddFileMemberError>>}
 */
routes.sharingAddFileMember = function (arg) {
  return this.request('sharing/add_file_member', arg, 'user', 'api', 'rpc');
};

/**
 * Allows an owner or editor (if the ACL update policy allows) of a shared
 * folder to add another member. For the new member to get access to all the
 * functionality for this folder, you will need to call mount_folder on their
 * behalf. Apps must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingAddFolderMember
 * @arg {SharingAddFolderMemberArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingAddFolderMemberError>>}
 */
routes.sharingAddFolderMember = function (arg) {
  return this.request('sharing/add_folder_member', arg, 'user', 'api', 'rpc');
};

/**
 * Identical to update_file_member but with less information returned.
 * @function Dropbox#sharingChangeFileMemberAccess
 * @deprecated
 * @arg {SharingChangeFileMemberAccessArgs} arg - The request parameters.
 * @returns {Promise.<SharingFileMemberActionResult, Error.<SharingFileMemberActionError>>}
 */
routes.sharingChangeFileMemberAccess = function (arg) {
  return this.request('sharing/change_file_member_access', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job. Apps must have full Dropbox access
 * to use this endpoint.
 * @function Dropbox#sharingCheckJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<SharingJobStatus, Error.<AsyncPollError>>}
 */
routes.sharingCheckJobStatus = function (arg) {
  return this.request('sharing/check_job_status', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for sharing a folder. Apps must
 * have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingCheckRemoveMemberJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<SharingRemoveMemberJobStatus, Error.<AsyncPollError>>}
 */
routes.sharingCheckRemoveMemberJobStatus = function (arg) {
  return this.request('sharing/check_remove_member_job_status', arg, 'user', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for sharing a folder. Apps must
 * have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingCheckShareJobStatus
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<SharingShareFolderJobStatus, Error.<AsyncPollError>>}
 */
routes.sharingCheckShareJobStatus = function (arg) {
  return this.request('sharing/check_share_job_status', arg, 'user', 'api', 'rpc');
};

/**
 * Create a shared link. If a shared link already exists for the given path,
 * that link is returned. Note that in the returned PathLinkMetadata, the
 * PathLinkMetadata.url field is the shortened URL if
 * CreateSharedLinkArg.short_url argument is set to true. Previously, it was
 * technically possible to break a shared link by moving or renaming the
 * corresponding file or folder. In the future, this will no longer be the case,
 * so your app shouldn't rely on this behavior. Instead, if your app needs to
 * revoke a shared link, use revoke_shared_link.
 * @function Dropbox#sharingCreateSharedLink
 * @deprecated
 * @arg {SharingCreateSharedLinkArg} arg - The request parameters.
 * @returns {Promise.<SharingPathLinkMetadata, Error.<SharingCreateSharedLinkError>>}
 */
routes.sharingCreateSharedLink = function (arg) {
  return this.request('sharing/create_shared_link', arg, 'user', 'api', 'rpc');
};

/**
 * Create a shared link with custom settings. If no settings are given then the
 * default visibility is RequestedVisibility.public (The resolved visibility,
 * though, may depend on other aspects such as team and shared folder settings).
 * @function Dropbox#sharingCreateSharedLinkWithSettings
 * @arg {SharingCreateSharedLinkWithSettingsArg} arg - The request parameters.
 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingCreateSharedLinkWithSettingsError>>}
 */
routes.sharingCreateSharedLinkWithSettings = function (arg) {
  return this.request('sharing/create_shared_link_with_settings', arg, 'user', 'api', 'rpc');
};

/**
 * Returns shared file metadata.
 * @function Dropbox#sharingGetFileMetadata
 * @arg {SharingGetFileMetadataArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFileMetadata, Error.<SharingGetFileMetadataError>>}
 */
routes.sharingGetFileMetadata = function (arg) {
  return this.request('sharing/get_file_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Returns shared file metadata.
 * @function Dropbox#sharingGetFileMetadataBatch
 * @arg {SharingGetFileMetadataBatchArg} arg - The request parameters.
 * @returns {Promise.<Array.<SharingGetFileMetadataBatchResult>, Error.<SharingSharingUserError>>}
 */
routes.sharingGetFileMetadataBatch = function (arg) {
  return this.request('sharing/get_file_metadata/batch', arg, 'user', 'api', 'rpc');
};

/**
 * Returns shared folder metadata by its folder ID. Apps must have full Dropbox
 * access to use this endpoint.
 * @function Dropbox#sharingGetFolderMetadata
 * @arg {SharingGetMetadataArgs} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMetadata, Error.<SharingSharedFolderAccessError>>}
 */
routes.sharingGetFolderMetadata = function (arg) {
  return this.request('sharing/get_folder_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Download the shared link's file from a user's Dropbox.
 * @function Dropbox#sharingGetSharedLinkFile
 * @arg {Object} arg - The request parameters.
 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingGetSharedLinkFileError>>}
 */
routes.sharingGetSharedLinkFile = function (arg) {
  return this.request('sharing/get_shared_link_file', arg, 'user', 'content', 'download');
};

/**
 * Get the shared link's metadata.
 * @function Dropbox#sharingGetSharedLinkMetadata
 * @arg {SharingGetSharedLinkMetadataArg} arg - The request parameters.
 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingSharedLinkError>>}
 */
routes.sharingGetSharedLinkMetadata = function (arg) {
  return this.request('sharing/get_shared_link_metadata', arg, 'user', 'api', 'rpc');
};

/**
 * Returns a list of LinkMetadata objects for this user, including collection
 * links. If no path is given, returns a list of all shared links for the
 * current user, including collection links, up to a maximum of 1000 links. If a
 * non-empty path is given, returns a list of all shared links that allow access
 * to the given path.  Collection links are never returned in this case. Note
 * that the url field in the response is never the shortened URL.
 * @function Dropbox#sharingGetSharedLinks
 * @deprecated
 * @arg {SharingGetSharedLinksArg} arg - The request parameters.
 * @returns {Promise.<SharingGetSharedLinksResult, Error.<SharingGetSharedLinksError>>}
 */
routes.sharingGetSharedLinks = function (arg) {
  return this.request('sharing/get_shared_links', arg, 'user', 'api', 'rpc');
};

/**
 * Use to obtain the members who have been invited to a file, both inherited and
 * uninherited members.
 * @function Dropbox#sharingListFileMembers
 * @arg {SharingListFileMembersArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFileMembers, Error.<SharingListFileMembersError>>}
 */
routes.sharingListFileMembers = function (arg) {
  return this.request('sharing/list_file_members', arg, 'user', 'api', 'rpc');
};

/**
 * Get members of multiple files at once. The arguments to this route are more
 * limited, and the limit on query result size per file is more strict. To
 * customize the results more, use the individual file endpoint. Inherited users
 * and groups are not included in the result, and permissions are not returned
 * for this endpoint.
 * @function Dropbox#sharingListFileMembersBatch
 * @arg {SharingListFileMembersBatchArg} arg - The request parameters.
 * @returns {Promise.<Array.<SharingListFileMembersBatchResult>, Error.<SharingSharingUserError>>}
 */
routes.sharingListFileMembersBatch = function (arg) {
  return this.request('sharing/list_file_members/batch', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_file_members or
 * list_file_members/batch, use this to paginate through all shared file
 * members.
 * @function Dropbox#sharingListFileMembersContinue
 * @arg {SharingListFileMembersContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFileMembers, Error.<SharingListFileMembersContinueError>>}
 */
routes.sharingListFileMembersContinue = function (arg) {
  return this.request('sharing/list_file_members/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Returns shared folder membership by its folder ID. Apps must have full
 * Dropbox access to use this endpoint.
 * @function Dropbox#sharingListFolderMembers
 * @arg {SharingListFolderMembersArgs} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMembers, Error.<SharingSharedFolderAccessError>>}
 */
routes.sharingListFolderMembers = function (arg) {
  return this.request('sharing/list_folder_members', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_folder_members, use this to
 * paginate through all shared folder members. Apps must have full Dropbox
 * access to use this endpoint.
 * @function Dropbox#sharingListFolderMembersContinue
 * @arg {SharingListFolderMembersContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMembers, Error.<SharingListFolderMembersContinueError>>}
 */
routes.sharingListFolderMembersContinue = function (arg) {
  return this.request('sharing/list_folder_members/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Return the list of all shared folders the current user has access to. Apps
 * must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingListFolders
 * @arg {SharingListFoldersArgs} arg - The request parameters.
 * @returns {Promise.<SharingListFoldersResult, Error.<void>>}
 */
routes.sharingListFolders = function (arg) {
  return this.request('sharing/list_folders', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_folders, use this to paginate
 * through all shared folders. The cursor must come from a previous call to
 * list_folders or list_folders/continue. Apps must have full Dropbox access to
 * use this endpoint.
 * @function Dropbox#sharingListFoldersContinue
 * @arg {SharingListFoldersContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingListFoldersResult, Error.<SharingListFoldersContinueError>>}
 */
routes.sharingListFoldersContinue = function (arg) {
  return this.request('sharing/list_folders/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Return the list of all shared folders the current user can mount or unmount.
 * Apps must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingListMountableFolders
 * @arg {SharingListFoldersArgs} arg - The request parameters.
 * @returns {Promise.<SharingListFoldersResult, Error.<void>>}
 */
routes.sharingListMountableFolders = function (arg) {
  return this.request('sharing/list_mountable_folders', arg, 'user', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from list_mountable_folders, use this to
 * paginate through all mountable shared folders. The cursor must come from a
 * previous call to list_mountable_folders or list_mountable_folders/continue.
 * Apps must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingListMountableFoldersContinue
 * @arg {SharingListFoldersContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingListFoldersResult, Error.<SharingListFoldersContinueError>>}
 */
routes.sharingListMountableFoldersContinue = function (arg) {
  return this.request('sharing/list_mountable_folders/continue', arg, 'user', 'api', 'rpc');
};

/**
 * Returns a list of all files shared with current user.  Does not include files
 * the user has received via shared folders, and does  not include unclaimed
 * invitations.
 * @function Dropbox#sharingListReceivedFiles
 * @arg {SharingListFilesArg} arg - The request parameters.
 * @returns {Promise.<SharingListFilesResult, Error.<SharingSharingUserError>>}
 */
routes.sharingListReceivedFiles = function (arg) {
  return this.request('sharing/list_received_files', arg, 'user', 'api', 'rpc');
};

/**
 * Get more results with a cursor from list_received_files.
 * @function Dropbox#sharingListReceivedFilesContinue
 * @arg {SharingListFilesContinueArg} arg - The request parameters.
 * @returns {Promise.<SharingListFilesResult, Error.<SharingListFilesContinueError>>}
 */
routes.sharingListReceivedFilesContinue = function (arg) {
  return this.request('sharing/list_received_files/continue', arg, 'user', 'api', 'rpc');
};

/**
 * List shared links of this user. If no path is given, returns a list of all
 * shared links for the current user. If a non-empty path is given, returns a
 * list of all shared links that allow access to the given path - direct links
 * to the given path and links to parent folders of the given path. Links to
 * parent folders can be suppressed by setting direct_only to true.
 * @function Dropbox#sharingListSharedLinks
 * @arg {SharingListSharedLinksArg} arg - The request parameters.
 * @returns {Promise.<SharingListSharedLinksResult, Error.<SharingListSharedLinksError>>}
 */
routes.sharingListSharedLinks = function (arg) {
  return this.request('sharing/list_shared_links', arg, 'user', 'api', 'rpc');
};

/**
 * Modify the shared link's settings. If the requested visibility conflict with
 * the shared links policy of the team or the shared folder (in case the linked
 * file is part of a shared folder) then the LinkPermissions.resolved_visibility
 * of the returned SharedLinkMetadata will reflect the actual visibility of the
 * shared link and the LinkPermissions.requested_visibility will reflect the
 * requested visibility.
 * @function Dropbox#sharingModifySharedLinkSettings
 * @arg {SharingModifySharedLinkSettingsArgs} arg - The request parameters.
 * @returns {Promise.<(SharingFileLinkMetadata|SharingFolderLinkMetadata|SharingSharedLinkMetadata), Error.<SharingModifySharedLinkSettingsError>>}
 */
routes.sharingModifySharedLinkSettings = function (arg) {
  return this.request('sharing/modify_shared_link_settings', arg, 'user', 'api', 'rpc');
};

/**
 * The current user mounts the designated folder. Mount a shared folder for a
 * user after they have been added as a member. Once mounted, the shared folder
 * will appear in their Dropbox. Apps must have full Dropbox access to use this
 * endpoint.
 * @function Dropbox#sharingMountFolder
 * @arg {SharingMountFolderArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMetadata, Error.<SharingMountFolderError>>}
 */
routes.sharingMountFolder = function (arg) {
  return this.request('sharing/mount_folder', arg, 'user', 'api', 'rpc');
};

/**
 * The current user relinquishes their membership in the designated file. Note
 * that the current user may still have inherited access to this file through
 * the parent folder. Apps must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingRelinquishFileMembership
 * @arg {SharingRelinquishFileMembershipArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingRelinquishFileMembershipError>>}
 */
routes.sharingRelinquishFileMembership = function (arg) {
  return this.request('sharing/relinquish_file_membership', arg, 'user', 'api', 'rpc');
};

/**
 * The current user relinquishes their membership in the designated shared
 * folder and will no longer have access to the folder.  A folder owner cannot
 * relinquish membership in their own folder. This will run synchronously if
 * leave_a_copy is false, and asynchronously if leave_a_copy is true. Apps must
 * have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingRelinquishFolderMembership
 * @arg {SharingRelinquishFolderMembershipArg} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<SharingRelinquishFolderMembershipError>>}
 */
routes.sharingRelinquishFolderMembership = function (arg) {
  return this.request('sharing/relinquish_folder_membership', arg, 'user', 'api', 'rpc');
};

/**
 * Identical to remove_file_member_2 but with less information returned.
 * @function Dropbox#sharingRemoveFileMember
 * @deprecated
 * @arg {SharingRemoveFileMemberArg} arg - The request parameters.
 * @returns {Promise.<SharingFileMemberActionIndividualResult, Error.<SharingRemoveFileMemberError>>}
 */
routes.sharingRemoveFileMember = function (arg) {
  return this.request('sharing/remove_file_member', arg, 'user', 'api', 'rpc');
};

/**
 * Removes a specified member from the file.
 * @function Dropbox#sharingRemoveFileMember2
 * @arg {SharingRemoveFileMemberArg} arg - The request parameters.
 * @returns {Promise.<SharingFileMemberRemoveActionResult, Error.<SharingRemoveFileMemberError>>}
 */
routes.sharingRemoveFileMember2 = function (arg) {
  return this.request('sharing/remove_file_member_2', arg, 'user', 'api', 'rpc');
};

/**
 * Allows an owner or editor (if the ACL update policy allows) of a shared
 * folder to remove another member. Apps must have full Dropbox access to use
 * this endpoint.
 * @function Dropbox#sharingRemoveFolderMember
 * @arg {SharingRemoveFolderMemberArg} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchResultBase, Error.<SharingRemoveFolderMemberError>>}
 */
routes.sharingRemoveFolderMember = function (arg) {
  return this.request('sharing/remove_folder_member', arg, 'user', 'api', 'rpc');
};

/**
 * Revoke a shared link. Note that even after revoking a shared link to a file,
 * the file may be accessible if there are shared links leading to any of the
 * file parent folders. To list all shared links that enable access to a
 * specific file, you can use the list_shared_links with the file as the
 * ListSharedLinksArg.path argument.
 * @function Dropbox#sharingRevokeSharedLink
 * @arg {SharingRevokeSharedLinkArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingRevokeSharedLinkError>>}
 */
routes.sharingRevokeSharedLink = function (arg) {
  return this.request('sharing/revoke_shared_link', arg, 'user', 'api', 'rpc');
};

/**
 * Share a folder with collaborators. Most sharing will be completed
 * synchronously. Large folders will be completed asynchronously. To make
 * testing the async case repeatable, set `ShareFolderArg.force_async`. If a
 * ShareFolderLaunch.async_job_id is returned, you'll need to call
 * check_share_job_status until the action completes to get the metadata for the
 * folder. Apps must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingShareFolder
 * @arg {SharingShareFolderArg} arg - The request parameters.
 * @returns {Promise.<SharingShareFolderLaunch, Error.<SharingShareFolderError>>}
 */
routes.sharingShareFolder = function (arg) {
  return this.request('sharing/share_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Transfer ownership of a shared folder to a member of the shared folder. User
 * must have AccessLevel.owner access to the shared folder to perform a
 * transfer. Apps must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingTransferFolder
 * @arg {SharingTransferFolderArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingTransferFolderError>>}
 */
routes.sharingTransferFolder = function (arg) {
  return this.request('sharing/transfer_folder', arg, 'user', 'api', 'rpc');
};

/**
 * The current user unmounts the designated folder. They can re-mount the folder
 * at a later time using mount_folder. Apps must have full Dropbox access to use
 * this endpoint.
 * @function Dropbox#sharingUnmountFolder
 * @arg {SharingUnmountFolderArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingUnmountFolderError>>}
 */
routes.sharingUnmountFolder = function (arg) {
  return this.request('sharing/unmount_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Remove all members from this file. Does not remove inherited members.
 * @function Dropbox#sharingUnshareFile
 * @arg {SharingUnshareFileArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<SharingUnshareFileError>>}
 */
routes.sharingUnshareFile = function (arg) {
  return this.request('sharing/unshare_file', arg, 'user', 'api', 'rpc');
};

/**
 * Allows a shared folder owner to unshare the folder. You'll need to call
 * check_job_status to determine if the action has completed successfully. Apps
 * must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingUnshareFolder
 * @arg {SharingUnshareFolderArg} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<SharingUnshareFolderError>>}
 */
routes.sharingUnshareFolder = function (arg) {
  return this.request('sharing/unshare_folder', arg, 'user', 'api', 'rpc');
};

/**
 * Changes a member's access on a shared file.
 * @function Dropbox#sharingUpdateFileMember
 * @arg {SharingUpdateFileMemberArgs} arg - The request parameters.
 * @returns {Promise.<SharingMemberAccessLevelResult, Error.<SharingFileMemberActionError>>}
 */
routes.sharingUpdateFileMember = function (arg) {
  return this.request('sharing/update_file_member', arg, 'user', 'api', 'rpc');
};

/**
 * Allows an owner or editor of a shared folder to update another member's
 * permissions. Apps must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingUpdateFolderMember
 * @arg {SharingUpdateFolderMemberArg} arg - The request parameters.
 * @returns {Promise.<SharingMemberAccessLevelResult, Error.<SharingUpdateFolderMemberError>>}
 */
routes.sharingUpdateFolderMember = function (arg) {
  return this.request('sharing/update_folder_member', arg, 'user', 'api', 'rpc');
};

/**
 * Update the sharing policies for a shared folder. User must have
 * AccessLevel.owner access to the shared folder to update its policies. Apps
 * must have full Dropbox access to use this endpoint.
 * @function Dropbox#sharingUpdateFolderPolicy
 * @arg {SharingUpdateFolderPolicyArg} arg - The request parameters.
 * @returns {Promise.<SharingSharedFolderMetadata, Error.<SharingUpdateFolderPolicyError>>}
 */
routes.sharingUpdateFolderPolicy = function (arg) {
  return this.request('sharing/update_folder_policy', arg, 'user', 'api', 'rpc');
};

/**
 * Retrieves team events. Permission : Team Auditing.
 * @function Dropbox#teamLogGetEvents
 * @arg {TeamLogGetTeamEventsArg} arg - The request parameters.
 * @returns {Promise.<TeamLogGetTeamEventsResult, Error.<TeamLogGetTeamEventsError>>}
 */
routes.teamLogGetEvents = function (arg) {
  return this.request('team_log/get_events', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from get_events, use this to paginate
 * through all events. Permission : Team Auditing.
 * @function Dropbox#teamLogGetEventsContinue
 * @arg {TeamLogGetTeamEventsContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamLogGetTeamEventsResult, Error.<TeamLogGetTeamEventsContinueError>>}
 */
routes.teamLogGetEventsContinue = function (arg) {
  return this.request('team_log/get_events/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Get information about a user's account.
 * @function Dropbox#usersGetAccount
 * @arg {UsersGetAccountArg} arg - The request parameters.
 * @returns {Promise.<UsersBasicAccount, Error.<UsersGetAccountError>>}
 */
routes.usersGetAccount = function (arg) {
  return this.request('users/get_account', arg, 'user', 'api', 'rpc');
};

/**
 * Get information about multiple user accounts.  At most 300 accounts may be
 * queried per request.
 * @function Dropbox#usersGetAccountBatch
 * @arg {UsersGetAccountBatchArg} arg - The request parameters.
 * @returns {Promise.<Object, Error.<UsersGetAccountBatchError>>}
 */
routes.usersGetAccountBatch = function (arg) {
  return this.request('users/get_account_batch', arg, 'user', 'api', 'rpc');
};

/**
 * Get information about the current user's account.
 * @function Dropbox#usersGetCurrentAccount
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<UsersFullAccount, Error.<void>>}
 */
routes.usersGetCurrentAccount = function (arg) {
  return this.request('users/get_current_account', arg, 'user', 'api', 'rpc');
};

/**
 * Get the space usage information for the current user's account.
 * @function Dropbox#usersGetSpaceUsage
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<UsersSpaceUsage, Error.<void>>}
 */
routes.usersGetSpaceUsage = function (arg) {
  return this.request('users/get_space_usage', arg, 'user', 'api', 'rpc');
};

var RPC = 'rpc';
var UPLOAD = 'upload';
var DOWNLOAD = 'download';

function getSafeUnicode(c) {
  var unicode = ('000' + c.charCodeAt(0).toString(16)).slice(-4);
  return '\\u' + unicode;
}

/* global WorkerGlobalScope */
function isWindowOrWorker() {
  return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope || typeof module === 'undefined';
}

function getBaseURL(host) {
  return 'https://' + host + '.dropboxapi.com/2/';
}

// source https://www.dropboxforum.com/t5/API-support/HTTP-header-quot-Dropbox-API-Arg-quot-could-not-decode-input-as/m-p/173823/highlight/true#M6786
function httpHeaderSafeJson(args) {
  return JSON.stringify(args).replace(/[\u007f-\uffff]/g, getSafeUnicode);
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

function getDataFromConsumer(res) {
  if (!res.ok) {
    return res.text();
  }

  return isWindowOrWorker() ? res.blob() : res.buffer();
}

function responseHandler(res, data) {
  if (!res.ok) {
    // eslint-disable-next-line no-throw-literal
    throw {
      error: data,
      response: res,
      status: res.status
    };
  }

  var result = JSON.parse(res.headers.get('dropbox-api-result'));

  if (isWindowOrWorker()) {
    result.fileBlob = data;
  } else {
    result.fileBinary = data;
  }

  return result;
}

function downloadRequest(path, args, auth, host, accessToken, options) {
  if (auth !== 'user') {
    throw new Error('Unexpected auth type: ' + auth);
  }

  var fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Dropbox-API-Arg': httpHeaderSafeJson(args)
    }
  };

  if (options) {
    if (options.selectUser) {
      fetchOptions.headers['Dropbox-API-Select-User'] = options.selectUser;
    }
    if (options.selectAdmin) {
      fetchOptions.headers['Dropbox-API-Select-Admin'] = options.selectAdmin;
    }
  }

  return fetch(getBaseURL(host) + path, fetchOptions).then(function (res) {
    return getDataFromConsumer(res).then(function (data) {
      return [res, data];
    });
  }).then(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        res = _ref2[0],
        data = _ref2[1];

    return responseHandler(res, data);
  });
}

function parseBodyToType$1(res) {
  var clone = res.clone();
  return new Promise(function (resolve) {
    res.json().then(function (data) {
      return resolve(data);
    }).catch(function () {
      return clone.text().then(function (data) {
        return resolve(data);
      });
    });
  }).then(function (data) {
    return [res, data];
  });
}

function uploadRequest(path, args, auth, host, accessToken, options) {
  if (auth !== 'user') {
    throw new Error('Unexpected auth type: ' + auth);
  }

  var contents = args.contents;

  delete args.contents;

  var fetchOptions = {
    body: contents,
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': httpHeaderSafeJson(args)
    }
  };

  if (options) {
    if (options.selectUser) {
      fetchOptions.headers['Dropbox-API-Select-User'] = options.selectUser;
    }
    if (options.selectAdmin) {
      fetchOptions.headers['Dropbox-API-Select-Admin'] = options.selectAdmin;
    }
  }

  return fetch(getBaseURL(host) + path, fetchOptions).then(function (res) {
    return parseBodyToType$1(res);
  }).then(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        res = _ref2[0],
        data = _ref2[1];

    // maintaining existing API for error codes not equal to 200 range
    if (!res.ok) {
      // eslint-disable-next-line no-throw-literal
      throw {
        error: data,
        response: res,
        status: res.status
      };
    }

    return data;
  });
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var byteLength_1 = byteLength;
var toByteArray_1 = toByteArray;
var fromByteArray_1 = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function placeHoldersCount (b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr;
  var len = b64.length;
  placeHolders = placeHoldersCount(b64);

  arr = new Arr((len * 3 / 4) - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

var base64Js = {
	byteLength: byteLength_1,
	toByteArray: toByteArray_1,
	fromByteArray: fromByteArray_1
};

var read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
};

var write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

var ieee754 = {
	read: read,
	write: write
};

var buffer = createCommonjsModule(function (module, exports) {
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict';




exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;

var K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  );
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }};
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length);
  buf.__proto__ = Buffer.prototype;
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  });
}

Buffer.poolSize = 8192; // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value)) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
};

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype;
Buffer.__proto__ = Uint8Array;

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
};

function allocUnsafe (size) {
  assertSize(size);
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
};

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  var buf = createBuffer(length);

  var actual = buf.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  var buf = createBuffer(length);
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255;
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  var buf;
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array);
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset);
  } else {
    buf = new Uint8Array(array, byteOffset, length);
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype;
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    var buf = createBuffer(len);

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len);
    return buf
  }

  if (obj) {
    if (isArrayBufferView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
};

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (isArrayBufferView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0;
    if (isFinite(length)) {
      length = length >>> 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64Js.fromByteArray(buf)
  } else {
    return base64Js.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256));
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf = this.subarray(start, end);
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype;
  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0;
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  byteLength = byteLength >>> 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  this[offset] = (value & 0xff);
  this[offset + 1] = (value >>> 8);
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  this[offset] = (value >>> 8);
  this[offset + 1] = (value & 0xff);
  return offset + 2
};

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  this[offset + 3] = (value >>> 24);
  this[offset + 2] = (value >>> 16);
  this[offset + 1] = (value >>> 8);
  this[offset] = (value & 0xff);
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  this[offset] = (value >>> 24);
  this[offset + 1] = (value >>> 16);
  this[offset + 2] = (value >>> 8);
  this[offset + 3] = (value & 0xff);
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  this[offset] = (value & 0xff);
  this[offset + 1] = (value >>> 8);
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  this[offset] = (value >>> 8);
  this[offset + 1] = (value & 0xff);
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  this[offset] = (value & 0xff);
  this[offset + 1] = (value >>> 8);
  this[offset + 2] = (value >>> 16);
  this[offset + 3] = (value >>> 24);
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  this[offset] = (value >>> 24);
  this[offset + 1] = (value >>> 16);
  this[offset + 2] = (value >>> 8);
  this[offset + 3] = (value & 0xff);
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value;
  offset = offset >>> 0;
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding);
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64Js.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}
});

var buffer_1 = buffer.Buffer;

function parseBodyToType$2(res) {
  var clone = res.clone();
  return new Promise(function (resolve) {
    res.json().then(function (data) {
      return resolve(data);
    }).catch(function () {
      return clone.text().then(function (data) {
        return resolve(data);
      });
    });
  }).then(function (data) {
    return [res, data];
  });
}

function rpcRequest(path, body, auth, host, accessToken, options) {
  var fetchOptions = {
    method: 'POST',
    body: body ? JSON.stringify(body) : null
  };
  var headers = {};
  if (body) {
    headers['Content-Type'] = 'application/json';
  }
  var authHeader = '';

  switch (auth) {
    case 'app':
      if (!options.clientId || !options.clientSecret) {
        throw new Error('A client id and secret is required for this function');
      }
      authHeader = new buffer_1(options.clientId + ':' + options.clientSecret).toString('base64');
      headers.Authorization = 'Basic ' + authHeader;
      break;
    case 'team':
    case 'user':
      headers.Authorization = 'Bearer ' + accessToken;
      break;
    case 'noauth':
      break;
    default:
      throw new Error('Unhandled auth type: ' + auth);
  }

  if (options) {
    if (options.selectUser) {
      headers['Dropbox-API-Select-User'] = options.selectUser;
    }
    if (options.selectAdmin) {
      headers['Dropbox-API-Select-Admin'] = options.selectAdmin;
    }
  }

  fetchOptions.headers = headers;
  return fetch(getBaseURL(host) + path, fetchOptions).then(function (res) {
    return parseBodyToType$2(res);
  }).then(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        res = _ref2[0],
        data = _ref2[1];

    // maintaining existing API for error codes not equal to 200 range
    if (!res.ok) {
      // eslint-disable-next-line no-throw-literal
      throw {
        error: data,
        response: res,
        status: res.status
      };
    }

    return data;
  });
}

/* eslint-disable */
// Polyfill object.assign for legacy browsers
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign !== 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';

      var output;
      var index;
      var source;
      var nextKey;
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      output = Object(target);
      for (index = 1; index < arguments.length; index++) {
        source = arguments[index];
        if (source !== undefined && source !== null) {
          for (nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

// Polyfill Array.includes for legacy browsers
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function value(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1.
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}
/* eslint-enable */

/**
 * @private
 * @class DropboxBase
 * @classdesc The main Dropbox SDK class. This contains the methods that are
 * shared between Dropbox and DropboxTeam classes. It is marked as private so
 * that it doesn't show up in the docs because it is never used directly.
 * @arg {Object} options
 * @arg {String} [options.accessToken] - An access token for making authenticated
 * requests.
 * @arg {String} [options.clientId] - The client id for your app. Used to create
 * authentication URL.
 * @arg {String} [options.clientSecret] - The client secret for your app.
 * @arg {Number} [options.selectUser] - User that the team access token would like
 * to act as.
 * @arg {String} [options.selectAdmin] - Team admin that the team access token would like
 * to act as.
 */

function parseBodyToType(res) {
  var clone = res.clone();
  return new Promise(function (resolve) {
    res.json().then(function (data) {
      return resolve(data);
    }).catch(function () {
      return clone.text().then(function (data) {
        return resolve(data);
      });
    });
  }).then(function (data) {
    return [res, data];
  });
}

var DropboxBase = function () {
  function DropboxBase(options) {
    classCallCheck(this, DropboxBase);

    options = options || {};
    this.accessToken = options.accessToken;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.selectUser = options.selectUser;
    this.selectAdmin = options.selectAdmin;
  }

  /**
   * Set the access token used to authenticate requests to the API.
   * @arg {String} accessToken - An access token
   * @returns {undefined}
   */


  createClass(DropboxBase, [{
    key: 'setAccessToken',
    value: function setAccessToken(accessToken) {
      this.accessToken = accessToken;
    }

    /**
     * Get the access token
     * @returns {String} Access token
     */

  }, {
    key: 'getAccessToken',
    value: function getAccessToken() {
      return this.accessToken;
    }

    /**
     * Set the client id, which is used to help gain an access token.
     * @arg {String} clientId - Your apps client id
     * @returns {undefined}
     */

  }, {
    key: 'setClientId',
    value: function setClientId(clientId) {
      this.clientId = clientId;
    }

    /**
     * Get the client id
     * @returns {String} Client id
     */

  }, {
    key: 'getClientId',
    value: function getClientId() {
      return this.clientId;
    }

    /**
     * Set the client secret
     * @arg {String} clientId - Your apps client secret
     * @returns {undefined}
     */

  }, {
    key: 'setClientSecret',
    value: function setClientSecret(clientSecret) {
      this.clientSecret = clientSecret;
    }

    /**
     * Get the client secret
     * @returns {String} Client secret
     */

  }, {
    key: 'getClientSecret',
    value: function getClientSecret() {
      return this.clientSecret;
    }

    /**
     * Get a URL that can be used to authenticate users for the Dropbox API.
     * @arg {String} redirectUri - A URL to redirect the user to after
     * authenticating. This must be added to your app through the admin interface.
     * @arg {String} [state] - State that will be returned in the redirect URL to help
     * prevent cross site scripting attacks.
     * @arg {String} [authType] - auth type, defaults to 'token', other option is 'code'
     * @returns {String} Url to send user to for Dropbox API authentication
     */

  }, {
    key: 'getAuthenticationUrl',
    value: function getAuthenticationUrl(redirectUri, state) {
      var authType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'token';

      var clientId = this.getClientId();
      var baseUrl = 'https://www.dropbox.com/oauth2/authorize';

      if (!clientId) {
        throw new Error('A client id is required. You can set the client id using .setClientId().');
      }
      if (authType !== 'code' && !redirectUri) {
        throw new Error('A redirect uri is required.');
      }
      if (!['code', 'token'].includes(authType)) {
        throw new Error('Authorization type must be code or token');
      }

      var authUrl = void 0;
      if (authType === 'code') {
        authUrl = baseUrl + '?response_type=code&client_id=' + clientId;
      } else {
        authUrl = baseUrl + '?response_type=token&client_id=' + clientId;
      }

      if (redirectUri) {
        authUrl += '&redirect_uri=' + redirectUri;
      }
      if (state) {
        authUrl += '&state=' + state;
      }
      return authUrl;
    }

    /**
     * Get an OAuth2 access token from an OAuth2 Code.
     * @arg {String} redirectUri - A URL to redirect the user to after
     * authenticating. This must be added to your app through the admin interface.
     * @arg {String} code - An OAuth2 code.
    */

  }, {
    key: 'getAccessTokenFromCode',
    value: function getAccessTokenFromCode(redirectUri, code) {
      var clientId = this.getClientId();
      var clientSecret = this.getClientSecret();

      if (!clientId) {
        throw new Error('A client id is required. You can set the client id using .setClientId().');
      }
      if (!clientSecret) {
        throw new Error('A client secret is required. You can set the client id using .setClientSecret().');
      }
      var path = 'https://api.dropboxapi.com/oauth2/token?code=' + code + '&grant_type=authorization_code&redirect_uri=' + redirectUri + '&client_id=' + clientId + '&client_secret=' + clientSecret;

      var fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      return fetch(path, fetchOptions).then(function (res) {
        return parseBodyToType(res);
      }).then(function (_ref) {
        var _ref2 = slicedToArray(_ref, 2),
            res = _ref2[0],
            data = _ref2[1];

        // maintaining existing API for error codes not equal to 200 range
        if (!res.ok) {
          // eslint-disable-next-line no-throw-literal
          throw {
            error: data,
            response: res,
            status: res.status
          };
        }
        return data.access_token;
      });
    }

    /**
     * Called when the authentication succeed
     * @callback successCallback
     * @param {string} access_token The application's access token
     */

    /**
     * Called when the authentication failed.
     * @callback errorCallback
     */

    /**
     * An authentication process that works with cordova applications.
     * @param {successCallback} successCallback
     * @param {errorCallback} errorCallback
     */

  }, {
    key: 'authenticateWithCordova',
    value: function authenticateWithCordova(successCallback, errorCallback) {
      var redirectUrl = 'https://www.dropbox.com/1/oauth2/redirect_receiver';
      var url = this.getAuthenticationUrl(redirectUrl);

      var removed = false;
      var browser = window.open(url, '_blank');

      function onLoadError() {
        // Try to avoid a browser crash on browser.close().
        window.setTimeout(function () {
          browser.close();
        }, 10);
        errorCallback();
      }

      function onLoadStop(event) {
        var errorLabel = '&error=';
        var errorIndex = event.url.indexOf(errorLabel);

        if (errorIndex > -1) {
          // Try to avoid a browser crash on browser.close().
          window.setTimeout(function () {
            browser.close();
          }, 10);
          errorCallback();
        } else {
          var tokenLabel = '#access_token=';
          var tokenIndex = event.url.indexOf(tokenLabel);
          var tokenTypeIndex = event.url.indexOf('&token_type=');
          if (tokenIndex > -1) {
            tokenIndex += tokenLabel.length;
            // Try to avoid a browser crash on browser.close().
            window.setTimeout(function () {
              browser.close();
            }, 10);

            var accessToken = event.url.substring(tokenIndex, tokenTypeIndex);
            successCallback(accessToken);
          }
        }
      }

      function onExit() {
        if (removed) {
          return;
        }
        browser.removeEventListener('loaderror', onLoadError);
        browser.removeEventListener('loadstop', onLoadStop);
        browser.removeEventListener('exit', onExit);
        removed = true;
      }

      browser.addEventListener('loaderror', onLoadError);
      browser.addEventListener('loadstop', onLoadStop);
      browser.addEventListener('exit', onExit);
    }
  }, {
    key: 'request',
    value: function request(path, args, auth, host, style) {
      var request = null;
      switch (style) {
        case RPC:
          request = this.getRpcRequest();
          break;
        case DOWNLOAD:
          request = this.getDownloadRequest();
          break;
        case UPLOAD:
          request = this.getUploadRequest();
          break;
        default:
          throw new Error('Invalid request style: ' + style);
      }
      var options = {
        selectUser: this.selectUser,
        selectAdmin: this.selectAdmin,
        clientId: this.getClientId(),
        clientSecret: this.getClientSecret()
      };
      return request(path, args, auth, host, this.getAccessToken(), options);
    }
  }, {
    key: 'setRpcRequest',
    value: function setRpcRequest(newRpcRequest) {
      this.rpcRequest = newRpcRequest;
    }
  }, {
    key: 'getRpcRequest',
    value: function getRpcRequest() {
      if (this.rpcRequest === undefined) {
        this.rpcRequest = rpcRequest;
      }
      return this.rpcRequest;
    }
  }, {
    key: 'setDownloadRequest',
    value: function setDownloadRequest(newDownloadRequest) {
      this.downloadRequest = newDownloadRequest;
    }
  }, {
    key: 'getDownloadRequest',
    value: function getDownloadRequest() {
      if (this.downloadRequest === undefined) {
        this.downloadRequest = downloadRequest;
      }
      return this.downloadRequest;
    }
  }, {
    key: 'setUploadRequest',
    value: function setUploadRequest(newUploadRequest) {
      this.uploadRequest = newUploadRequest;
    }
  }, {
    key: 'getUploadRequest',
    value: function getUploadRequest() {
      if (this.uploadRequest === undefined) {
        this.uploadRequest = uploadRequest;
      }
      return this.uploadRequest;
    }
  }]);
  return DropboxBase;
}();

/**
 * @class Dropbox
 * @extends DropboxBase
 * @classdesc The Dropbox SDK class that provides methods to read, write and
 * create files or folders in a user's Dropbox.
 * @arg {Object} options
 * @arg {String} [options.accessToken] - An access token for making authenticated
 * requests.
 * @arg {String} [options.clientId] - The client id for your app. Used to create
 * authentication URL.
 * @arg {String} [options.selectUser] - Select user is only used by DropboxTeam.
 * It specifies which user the team access token should be acting as.
 */
var Dropbox = function (_DropboxBase) {
  inherits(Dropbox, _DropboxBase);

  function Dropbox(options) {
    classCallCheck(this, Dropbox);

    var _this = possibleConstructorReturn(this, (Dropbox.__proto__ || Object.getPrototypeOf(Dropbox)).call(this, options));

    Object.assign(_this, routes);
    return _this;
  }

  createClass(Dropbox, [{
    key: 'filesGetSharedLinkFile',
    value: function filesGetSharedLinkFile(arg) {
      return this.request('sharing/get_shared_link_file', arg, 'api', 'download');
    }
  }]);
  return Dropbox;
}(DropboxBase);

// Auto-generated by Stone, do not modify.
var routes$1 = {};

/**
 * List all device sessions of a team's member.
 * @function DropboxTeam#teamDevicesListMemberDevices
 * @arg {TeamListMemberDevicesArg} arg - The request parameters.
 * @returns {Promise.<TeamListMemberDevicesResult, Error.<TeamListMemberDevicesError>>}
 */
routes$1.teamDevicesListMemberDevices = function (arg) {
  return this.request('team/devices/list_member_devices', arg, 'team', 'api', 'rpc');
};

/**
 * List all device sessions of a team.
 * @function DropboxTeam#teamDevicesListMembersDevices
 * @arg {TeamListMembersDevicesArg} arg - The request parameters.
 * @returns {Promise.<TeamListMembersDevicesResult, Error.<TeamListMembersDevicesError>>}
 */
routes$1.teamDevicesListMembersDevices = function (arg) {
  return this.request('team/devices/list_members_devices', arg, 'team', 'api', 'rpc');
};

/**
 * List all device sessions of a team.
 * @function DropboxTeam#teamDevicesListTeamDevices
 * @deprecated
 * @arg {TeamListTeamDevicesArg} arg - The request parameters.
 * @returns {Promise.<TeamListTeamDevicesResult, Error.<TeamListTeamDevicesError>>}
 */
routes$1.teamDevicesListTeamDevices = function (arg) {
  return this.request('team/devices/list_team_devices', arg, 'team', 'api', 'rpc');
};

/**
 * Revoke a device session of a team's member.
 * @function DropboxTeam#teamDevicesRevokeDeviceSession
 * @arg {TeamRevokeDeviceSessionArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamRevokeDeviceSessionError>>}
 */
routes$1.teamDevicesRevokeDeviceSession = function (arg) {
  return this.request('team/devices/revoke_device_session', arg, 'team', 'api', 'rpc');
};

/**
 * Revoke a list of device sessions of team members.
 * @function DropboxTeam#teamDevicesRevokeDeviceSessionBatch
 * @arg {TeamRevokeDeviceSessionBatchArg} arg - The request parameters.
 * @returns {Promise.<TeamRevokeDeviceSessionBatchResult, Error.<TeamRevokeDeviceSessionBatchError>>}
 */
routes$1.teamDevicesRevokeDeviceSessionBatch = function (arg) {
  return this.request('team/devices/revoke_device_session_batch', arg, 'team', 'api', 'rpc');
};

/**
 * Get the values for one or more featues. This route allows you to check your
 * account's capability for what feature you can access or what value you have
 * for certain features. Permission : Team information.
 * @function DropboxTeam#teamFeaturesGetValues
 * @arg {TeamFeaturesGetValuesBatchArg} arg - The request parameters.
 * @returns {Promise.<TeamFeaturesGetValuesBatchResult, Error.<TeamFeaturesGetValuesBatchError>>}
 */
routes$1.teamFeaturesGetValues = function (arg) {
  return this.request('team/features/get_values', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves information about a team.
 * @function DropboxTeam#teamGetInfo
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<TeamTeamGetInfoResult, Error.<void>>}
 */
routes$1.teamGetInfo = function (arg) {
  return this.request('team/get_info', arg, 'team', 'api', 'rpc');
};

/**
 * Creates a new, empty group, with a requested name. Permission : Team member
 * management.
 * @function DropboxTeam#teamGroupsCreate
 * @arg {TeamGroupCreateArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupFullInfo, Error.<TeamGroupCreateError>>}
 */
routes$1.teamGroupsCreate = function (arg) {
  return this.request('team/groups/create', arg, 'team', 'api', 'rpc');
};

/**
 * Deletes a group. The group is deleted immediately. However the revoking of
 * group-owned resources may take additional time. Use the groups/job_status/get
 * to determine whether this process has completed. Permission : Team member
 * management.
 * @function DropboxTeam#teamGroupsDelete
 * @arg {TeamGroupSelector} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<TeamGroupDeleteError>>}
 */
routes$1.teamGroupsDelete = function (arg) {
  return this.request('team/groups/delete', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves information about one or more groups. Note that the optional field
 * GroupFullInfo.members is not returned for system-managed groups. Permission :
 * Team Information.
 * @function DropboxTeam#teamGroupsGetInfo
 * @arg {TeamGroupsSelector} arg - The request parameters.
 * @returns {Promise.<Object, Error.<TeamGroupsGetInfoError>>}
 */
routes$1.teamGroupsGetInfo = function (arg) {
  return this.request('team/groups/get_info', arg, 'team', 'api', 'rpc');
};

/**
 * Once an async_job_id is returned from groups/delete, groups/members/add , or
 * groups/members/remove use this method to poll the status of granting/revoking
 * group members' access to group-owned resources. Permission : Team member
 * management.
 * @function DropboxTeam#teamGroupsJobStatusGet
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<AsyncPollEmptyResult, Error.<TeamGroupsPollError>>}
 */
routes$1.teamGroupsJobStatusGet = function (arg) {
  return this.request('team/groups/job_status/get', arg, 'team', 'api', 'rpc');
};

/**
 * Lists groups on a team. Permission : Team Information.
 * @function DropboxTeam#teamGroupsList
 * @arg {TeamGroupsListArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupsListResult, Error.<void>>}
 */
routes$1.teamGroupsList = function (arg) {
  return this.request('team/groups/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from groups/list, use this to paginate
 * through all groups. Permission : Team Information.
 * @function DropboxTeam#teamGroupsListContinue
 * @arg {TeamGroupsListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupsListResult, Error.<TeamGroupsListContinueError>>}
 */
routes$1.teamGroupsListContinue = function (arg) {
  return this.request('team/groups/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Adds members to a group. The members are added immediately. However the
 * granting of group-owned resources may take additional time. Use the
 * groups/job_status/get to determine whether this process has completed.
 * Permission : Team member management.
 * @function DropboxTeam#teamGroupsMembersAdd
 * @arg {TeamGroupMembersAddArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupMembersChangeResult, Error.<TeamGroupMembersAddError>>}
 */
routes$1.teamGroupsMembersAdd = function (arg) {
  return this.request('team/groups/members/add', arg, 'team', 'api', 'rpc');
};

/**
 * Lists members of a group. Permission : Team Information.
 * @function DropboxTeam#teamGroupsMembersList
 * @arg {TeamGroupsMembersListArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupsMembersListResult, Error.<TeamGroupSelectorError>>}
 */
routes$1.teamGroupsMembersList = function (arg) {
  return this.request('team/groups/members/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from groups/members/list, use this to
 * paginate through all members of the group. Permission : Team information.
 * @function DropboxTeam#teamGroupsMembersListContinue
 * @arg {TeamGroupsMembersListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupsMembersListResult, Error.<TeamGroupsMembersListContinueError>>}
 */
routes$1.teamGroupsMembersListContinue = function (arg) {
  return this.request('team/groups/members/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Removes members from a group. The members are removed immediately. However
 * the revoking of group-owned resources may take additional time. Use the
 * groups/job_status/get to determine whether this process has completed. This
 * method permits removing the only owner of a group, even in cases where this
 * is not possible via the web client. Permission : Team member management.
 * @function DropboxTeam#teamGroupsMembersRemove
 * @arg {TeamGroupMembersRemoveArg} arg - The request parameters.
 * @returns {Promise.<TeamGroupMembersChangeResult, Error.<TeamGroupMembersRemoveError>>}
 */
routes$1.teamGroupsMembersRemove = function (arg) {
  return this.request('team/groups/members/remove', arg, 'team', 'api', 'rpc');
};

/**
 * Sets a member's access type in a group. Permission : Team member management.
 * @function DropboxTeam#teamGroupsMembersSetAccessType
 * @arg {TeamGroupMembersSetAccessTypeArg} arg - The request parameters.
 * @returns {Promise.<Object, Error.<TeamGroupMemberSetAccessTypeError>>}
 */
routes$1.teamGroupsMembersSetAccessType = function (arg) {
  return this.request('team/groups/members/set_access_type', arg, 'team', 'api', 'rpc');
};

/**
 * Updates a group's name and/or external ID. Permission : Team member
 * management.
 * @function DropboxTeam#teamGroupsUpdate
 * @arg {TeamGroupUpdateArgs} arg - The request parameters.
 * @returns {Promise.<TeamGroupFullInfo, Error.<TeamGroupUpdateError>>}
 */
routes$1.teamGroupsUpdate = function (arg) {
  return this.request('team/groups/update', arg, 'team', 'api', 'rpc');
};

/**
 * List all linked applications of the team member. Note, this endpoint does not
 * list any team-linked applications.
 * @function DropboxTeam#teamLinkedAppsListMemberLinkedApps
 * @arg {TeamListMemberAppsArg} arg - The request parameters.
 * @returns {Promise.<TeamListMemberAppsResult, Error.<TeamListMemberAppsError>>}
 */
routes$1.teamLinkedAppsListMemberLinkedApps = function (arg) {
  return this.request('team/linked_apps/list_member_linked_apps', arg, 'team', 'api', 'rpc');
};

/**
 * List all applications linked to the team members' accounts. Note, this
 * endpoint does not list any team-linked applications.
 * @function DropboxTeam#teamLinkedAppsListMembersLinkedApps
 * @arg {TeamListMembersAppsArg} arg - The request parameters.
 * @returns {Promise.<TeamListMembersAppsResult, Error.<TeamListMembersAppsError>>}
 */
routes$1.teamLinkedAppsListMembersLinkedApps = function (arg) {
  return this.request('team/linked_apps/list_members_linked_apps', arg, 'team', 'api', 'rpc');
};

/**
 * List all applications linked to the team members' accounts. Note, this
 * endpoint doesn't list any team-linked applications.
 * @function DropboxTeam#teamLinkedAppsListTeamLinkedApps
 * @deprecated
 * @arg {TeamListTeamAppsArg} arg - The request parameters.
 * @returns {Promise.<TeamListTeamAppsResult, Error.<TeamListTeamAppsError>>}
 */
routes$1.teamLinkedAppsListTeamLinkedApps = function (arg) {
  return this.request('team/linked_apps/list_team_linked_apps', arg, 'team', 'api', 'rpc');
};

/**
 * Revoke a linked application of the team member.
 * @function DropboxTeam#teamLinkedAppsRevokeLinkedApp
 * @arg {TeamRevokeLinkedApiAppArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamRevokeLinkedAppError>>}
 */
routes$1.teamLinkedAppsRevokeLinkedApp = function (arg) {
  return this.request('team/linked_apps/revoke_linked_app', arg, 'team', 'api', 'rpc');
};

/**
 * Revoke a list of linked applications of the team members.
 * @function DropboxTeam#teamLinkedAppsRevokeLinkedAppBatch
 * @arg {TeamRevokeLinkedApiAppBatchArg} arg - The request parameters.
 * @returns {Promise.<TeamRevokeLinkedAppBatchResult, Error.<TeamRevokeLinkedAppBatchError>>}
 */
routes$1.teamLinkedAppsRevokeLinkedAppBatch = function (arg) {
  return this.request('team/linked_apps/revoke_linked_app_batch', arg, 'team', 'api', 'rpc');
};

/**
 * Add users to member space limits excluded users list.
 * @function DropboxTeam#teamMemberSpaceLimitsExcludedUsersAdd
 * @arg {TeamExcludedUsersUpdateArg} arg - The request parameters.
 * @returns {Promise.<TeamExcludedUsersUpdateResult, Error.<TeamExcludedUsersUpdateError>>}
 */
routes$1.teamMemberSpaceLimitsExcludedUsersAdd = function (arg) {
  return this.request('team/member_space_limits/excluded_users/add', arg, 'team', 'api', 'rpc');
};

/**
 * List member space limits excluded users.
 * @function DropboxTeam#teamMemberSpaceLimitsExcludedUsersList
 * @arg {TeamExcludedUsersListArg} arg - The request parameters.
 * @returns {Promise.<TeamExcludedUsersListResult, Error.<TeamExcludedUsersListError>>}
 */
routes$1.teamMemberSpaceLimitsExcludedUsersList = function (arg) {
  return this.request('team/member_space_limits/excluded_users/list', arg, 'team', 'api', 'rpc');
};

/**
 * Continue listing member space limits excluded users.
 * @function DropboxTeam#teamMemberSpaceLimitsExcludedUsersListContinue
 * @arg {TeamExcludedUsersListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamExcludedUsersListResult, Error.<TeamExcludedUsersListContinueError>>}
 */
routes$1.teamMemberSpaceLimitsExcludedUsersListContinue = function (arg) {
  return this.request('team/member_space_limits/excluded_users/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Remove users from member space limits excluded users list.
 * @function DropboxTeam#teamMemberSpaceLimitsExcludedUsersRemove
 * @arg {TeamExcludedUsersUpdateArg} arg - The request parameters.
 * @returns {Promise.<TeamExcludedUsersUpdateResult, Error.<TeamExcludedUsersUpdateError>>}
 */
routes$1.teamMemberSpaceLimitsExcludedUsersRemove = function (arg) {
  return this.request('team/member_space_limits/excluded_users/remove', arg, 'team', 'api', 'rpc');
};

/**
 * Get users custom quota. Returns none as the custom quota if none was set. A
 * maximum of 1000 members can be specified in a single call.
 * @function DropboxTeam#teamMemberSpaceLimitsGetCustomQuota
 * @arg {TeamCustomQuotaUsersArg} arg - The request parameters.
 * @returns {Promise.<Array.<TeamCustomQuotaResult>, Error.<TeamCustomQuotaError>>}
 */
routes$1.teamMemberSpaceLimitsGetCustomQuota = function (arg) {
  return this.request('team/member_space_limits/get_custom_quota', arg, 'team', 'api', 'rpc');
};

/**
 * Remove users custom quota. A maximum of 1000 members can be specified in a
 * single call.
 * @function DropboxTeam#teamMemberSpaceLimitsRemoveCustomQuota
 * @arg {TeamCustomQuotaUsersArg} arg - The request parameters.
 * @returns {Promise.<Array.<TeamRemoveCustomQuotaResult>, Error.<TeamCustomQuotaError>>}
 */
routes$1.teamMemberSpaceLimitsRemoveCustomQuota = function (arg) {
  return this.request('team/member_space_limits/remove_custom_quota', arg, 'team', 'api', 'rpc');
};

/**
 * Set users custom quota. Custom quota has to be at least 15GB. A maximum of
 * 1000 members can be specified in a single call.
 * @function DropboxTeam#teamMemberSpaceLimitsSetCustomQuota
 * @arg {TeamSetCustomQuotaArg} arg - The request parameters.
 * @returns {Promise.<Array.<TeamCustomQuotaResult>, Error.<TeamSetCustomQuotaError>>}
 */
routes$1.teamMemberSpaceLimitsSetCustomQuota = function (arg) {
  return this.request('team/member_space_limits/set_custom_quota', arg, 'team', 'api', 'rpc');
};

/**
 * Adds members to a team. Permission : Team member management A maximum of 20
 * members can be specified in a single call. If no Dropbox account exists with
 * the email address specified, a new Dropbox account will be created with the
 * given email address, and that account will be invited to the team. If a
 * personal Dropbox account exists with the email address specified in the call,
 * this call will create a placeholder Dropbox account for the user on the team
 * and send an email inviting the user to migrate their existing personal
 * account onto the team. Team member management apps are required to set an
 * initial given_name and surname for a user to use in the team invitation and
 * for 'Perform as team member' actions taken on the user before they become
 * 'active'.
 * @function DropboxTeam#teamMembersAdd
 * @arg {TeamMembersAddArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersAddLaunch, Error.<void>>}
 */
routes$1.teamMembersAdd = function (arg) {
  return this.request('team/members/add', arg, 'team', 'api', 'rpc');
};

/**
 * Once an async_job_id is returned from members/add , use this to poll the
 * status of the asynchronous request. Permission : Team member management.
 * @function DropboxTeam#teamMembersAddJobStatusGet
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersAddJobStatus, Error.<AsyncPollError>>}
 */
routes$1.teamMembersAddJobStatusGet = function (arg) {
  return this.request('team/members/add/job_status/get', arg, 'team', 'api', 'rpc');
};

/**
 * Returns information about multiple team members. Permission : Team
 * information This endpoint will return MembersGetInfoItem.id_not_found, for
 * IDs (or emails) that cannot be matched to a valid team member.
 * @function DropboxTeam#teamMembersGetInfo
 * @arg {TeamMembersGetInfoArgs} arg - The request parameters.
 * @returns {Promise.<Object, Error.<TeamMembersGetInfoError>>}
 */
routes$1.teamMembersGetInfo = function (arg) {
  return this.request('team/members/get_info', arg, 'team', 'api', 'rpc');
};

/**
 * Lists members of a team. Permission : Team information.
 * @function DropboxTeam#teamMembersList
 * @arg {TeamMembersListArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersListResult, Error.<TeamMembersListError>>}
 */
routes$1.teamMembersList = function (arg) {
  return this.request('team/members/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from members/list, use this to paginate
 * through all team members. Permission : Team information.
 * @function DropboxTeam#teamMembersListContinue
 * @arg {TeamMembersListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersListResult, Error.<TeamMembersListContinueError>>}
 */
routes$1.teamMembersListContinue = function (arg) {
  return this.request('team/members/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Recover a deleted member. Permission : Team member management Exactly one of
 * team_member_id, email, or external_id must be provided to identify the user
 * account.
 * @function DropboxTeam#teamMembersRecover
 * @arg {TeamMembersRecoverArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamMembersRecoverError>>}
 */
routes$1.teamMembersRecover = function (arg) {
  return this.request('team/members/recover', arg, 'team', 'api', 'rpc');
};

/**
 * Removes a member from a team. Permission : Team member management Exactly one
 * of team_member_id, email, or external_id must be provided to identify the
 * user account. Accounts can be recovered via members/recover for a 7 day
 * period or until the account has been permanently deleted or transferred to
 * another account (whichever comes first). Calling members/add while a user is
 * still recoverable on your team will return with
 * MemberAddResult.user_already_on_team. Accounts can have their files
 * transferred via the admin console for a limited time, based on the version
 * history length associated with the team (120 days for most teams). This
 * endpoint may initiate an asynchronous job. To obtain the final result of the
 * job, the client should periodically poll members/remove/job_status/get.
 * @function DropboxTeam#teamMembersRemove
 * @arg {TeamMembersRemoveArg} arg - The request parameters.
 * @returns {Promise.<AsyncLaunchEmptyResult, Error.<TeamMembersRemoveError>>}
 */
routes$1.teamMembersRemove = function (arg) {
  return this.request('team/members/remove', arg, 'team', 'api', 'rpc');
};

/**
 * Once an async_job_id is returned from members/remove , use this to poll the
 * status of the asynchronous request. Permission : Team member management.
 * @function DropboxTeam#teamMembersRemoveJobStatusGet
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<AsyncPollEmptyResult, Error.<AsyncPollError>>}
 */
routes$1.teamMembersRemoveJobStatusGet = function (arg) {
  return this.request('team/members/remove/job_status/get', arg, 'team', 'api', 'rpc');
};

/**
 * Sends welcome email to pending team member. Permission : Team member
 * management Exactly one of team_member_id, email, or external_id must be
 * provided to identify the user account. No-op if team member is not pending.
 * @function DropboxTeam#teamMembersSendWelcomeEmail
 * @arg {TeamUserSelectorArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamMembersSendWelcomeError>>}
 */
routes$1.teamMembersSendWelcomeEmail = function (arg) {
  return this.request('team/members/send_welcome_email', arg, 'team', 'api', 'rpc');
};

/**
 * Updates a team member's permissions. Permission : Team member management.
 * @function DropboxTeam#teamMembersSetAdminPermissions
 * @arg {TeamMembersSetPermissionsArg} arg - The request parameters.
 * @returns {Promise.<TeamMembersSetPermissionsResult, Error.<TeamMembersSetPermissionsError>>}
 */
routes$1.teamMembersSetAdminPermissions = function (arg) {
  return this.request('team/members/set_admin_permissions', arg, 'team', 'api', 'rpc');
};

/**
 * Updates a team member's profile. Permission : Team member management.
 * @function DropboxTeam#teamMembersSetProfile
 * @arg {TeamMembersSetProfileArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamMemberInfo, Error.<TeamMembersSetProfileError>>}
 */
routes$1.teamMembersSetProfile = function (arg) {
  return this.request('team/members/set_profile', arg, 'team', 'api', 'rpc');
};

/**
 * Suspend a member from a team. Permission : Team member management Exactly one
 * of team_member_id, email, or external_id must be provided to identify the
 * user account.
 * @function DropboxTeam#teamMembersSuspend
 * @arg {TeamMembersDeactivateArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamMembersSuspendError>>}
 */
routes$1.teamMembersSuspend = function (arg) {
  return this.request('team/members/suspend', arg, 'team', 'api', 'rpc');
};

/**
 * Unsuspend a member from a team. Permission : Team member management Exactly
 * one of team_member_id, email, or external_id must be provided to identify the
 * user account.
 * @function DropboxTeam#teamMembersUnsuspend
 * @arg {TeamMembersUnsuspendArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamMembersUnsuspendError>>}
 */
routes$1.teamMembersUnsuspend = function (arg) {
  return this.request('team/members/unsuspend', arg, 'team', 'api', 'rpc');
};

/**
 * Returns a list of all team-accessible namespaces. This list includes team
 * folders, shared folders containing team members, team members' home
 * namespaces, and team members' app folders. Home namespaces and app folders
 * are always owned by this team or members of the team, but shared folders may
 * be owned by other users or other teams. Duplicates may occur in the list.
 * @function DropboxTeam#teamNamespacesList
 * @arg {TeamTeamNamespacesListArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamNamespacesListResult, Error.<void>>}
 */
routes$1.teamNamespacesList = function (arg) {
  return this.request('team/namespaces/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from namespaces/list, use this to paginate
 * through all team-accessible namespaces. Duplicates may occur in the list.
 * @function DropboxTeam#teamNamespacesListContinue
 * @arg {TeamTeamNamespacesListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamNamespacesListResult, Error.<TeamTeamNamespacesListContinueError>>}
 */
routes$1.teamNamespacesListContinue = function (arg) {
  return this.request('team/namespaces/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * @function DropboxTeam#teamPropertiesTemplateAdd
 * @deprecated
 * @arg {FilePropertiesAddTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesAddTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes$1.teamPropertiesTemplateAdd = function (arg) {
  return this.request('team/properties/template/add', arg, 'team', 'api', 'rpc');
};

/**
 * @function DropboxTeam#teamPropertiesTemplateGet
 * @deprecated
 * @arg {FilePropertiesGetTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesGetTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes$1.teamPropertiesTemplateGet = function (arg) {
  return this.request('team/properties/template/get', arg, 'team', 'api', 'rpc');
};

/**
 * @function DropboxTeam#teamPropertiesTemplateList
 * @deprecated
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<FilePropertiesListTemplateResult, Error.<FilePropertiesTemplateError>>}
 */
routes$1.teamPropertiesTemplateList = function (arg) {
  return this.request('team/properties/template/list', arg, 'team', 'api', 'rpc');
};

/**
 * @function DropboxTeam#teamPropertiesTemplateUpdate
 * @deprecated
 * @arg {FilePropertiesUpdateTemplateArg} arg - The request parameters.
 * @returns {Promise.<FilePropertiesUpdateTemplateResult, Error.<FilePropertiesModifyTemplateError>>}
 */
routes$1.teamPropertiesTemplateUpdate = function (arg) {
  return this.request('team/properties/template/update', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves reporting data about a team's user activity.
 * @function DropboxTeam#teamReportsGetActivity
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<TeamGetActivityReport, Error.<TeamDateRangeError>>}
 */
routes$1.teamReportsGetActivity = function (arg) {
  return this.request('team/reports/get_activity', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves reporting data about a team's linked devices.
 * @function DropboxTeam#teamReportsGetDevices
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<TeamGetDevicesReport, Error.<TeamDateRangeError>>}
 */
routes$1.teamReportsGetDevices = function (arg) {
  return this.request('team/reports/get_devices', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves reporting data about a team's membership.
 * @function DropboxTeam#teamReportsGetMembership
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<TeamGetMembershipReport, Error.<TeamDateRangeError>>}
 */
routes$1.teamReportsGetMembership = function (arg) {
  return this.request('team/reports/get_membership', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves reporting data about a team's storage usage.
 * @function DropboxTeam#teamReportsGetStorage
 * @arg {TeamDateRange} arg - The request parameters.
 * @returns {Promise.<TeamGetStorageReport, Error.<TeamDateRangeError>>}
 */
routes$1.teamReportsGetStorage = function (arg) {
  return this.request('team/reports/get_storage', arg, 'team', 'api', 'rpc');
};

/**
 * Sets an archived team folder's status to active. Permission : Team member
 * file access.
 * @function DropboxTeam#teamTeamFolderActivate
 * @arg {TeamTeamFolderIdArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderMetadata, Error.<TeamTeamFolderActivateError>>}
 */
routes$1.teamTeamFolderActivate = function (arg) {
  return this.request('team/team_folder/activate', arg, 'team', 'api', 'rpc');
};

/**
 * Sets an active team folder's status to archived and removes all folder and
 * file members. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderArchive
 * @arg {TeamTeamFolderArchiveArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderArchiveLaunch, Error.<TeamTeamFolderArchiveError>>}
 */
routes$1.teamTeamFolderArchive = function (arg) {
  return this.request('team/team_folder/archive', arg, 'team', 'api', 'rpc');
};

/**
 * Returns the status of an asynchronous job for archiving a team folder.
 * Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderArchiveCheck
 * @arg {AsyncPollArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderArchiveJobStatus, Error.<AsyncPollError>>}
 */
routes$1.teamTeamFolderArchiveCheck = function (arg) {
  return this.request('team/team_folder/archive/check', arg, 'team', 'api', 'rpc');
};

/**
 * Creates a new, active, team folder with no members. Permission : Team member
 * file access.
 * @function DropboxTeam#teamTeamFolderCreate
 * @arg {TeamTeamFolderCreateArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderMetadata, Error.<TeamTeamFolderCreateError>>}
 */
routes$1.teamTeamFolderCreate = function (arg) {
  return this.request('team/team_folder/create', arg, 'team', 'api', 'rpc');
};

/**
 * Retrieves metadata for team folders. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderGetInfo
 * @arg {TeamTeamFolderIdListArg} arg - The request parameters.
 * @returns {Promise.<Array.<TeamTeamFolderGetInfoItem>, Error.<void>>}
 */
routes$1.teamTeamFolderGetInfo = function (arg) {
  return this.request('team/team_folder/get_info', arg, 'team', 'api', 'rpc');
};

/**
 * Lists all team folders. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderList
 * @arg {TeamTeamFolderListArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderListResult, Error.<TeamTeamFolderListError>>}
 */
routes$1.teamTeamFolderList = function (arg) {
  return this.request('team/team_folder/list', arg, 'team', 'api', 'rpc');
};

/**
 * Once a cursor has been retrieved from team_folder/list, use this to paginate
 * through all team folders. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderListContinue
 * @arg {TeamTeamFolderListContinueArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderListResult, Error.<TeamTeamFolderListContinueError>>}
 */
routes$1.teamTeamFolderListContinue = function (arg) {
  return this.request('team/team_folder/list/continue', arg, 'team', 'api', 'rpc');
};

/**
 * Permanently deletes an archived team folder. Permission : Team member file
 * access.
 * @function DropboxTeam#teamTeamFolderPermanentlyDelete
 * @arg {TeamTeamFolderIdArg} arg - The request parameters.
 * @returns {Promise.<void, Error.<TeamTeamFolderPermanentlyDeleteError>>}
 */
routes$1.teamTeamFolderPermanentlyDelete = function (arg) {
  return this.request('team/team_folder/permanently_delete', arg, 'team', 'api', 'rpc');
};

/**
 * Changes an active team folder's name. Permission : Team member file access.
 * @function DropboxTeam#teamTeamFolderRename
 * @arg {TeamTeamFolderRenameArg} arg - The request parameters.
 * @returns {Promise.<TeamTeamFolderMetadata, Error.<TeamTeamFolderRenameError>>}
 */
routes$1.teamTeamFolderRename = function (arg) {
  return this.request('team/team_folder/rename', arg, 'team', 'api', 'rpc');
};

/**
 * Returns the member profile of the admin who generated the team access token
 * used to make the call.
 * @function DropboxTeam#teamTokenGetAuthenticatedAdmin
 * @arg {void} arg - The request parameters.
 * @returns {Promise.<TeamTokenGetAuthenticatedAdminResult, Error.<TeamTokenGetAuthenticatedAdminError>>}
 */
routes$1.teamTokenGetAuthenticatedAdmin = function (arg) {
  return this.request('team/token/get_authenticated_admin', arg, 'team', 'api', 'rpc');
};

/**
 * @class DropboxTeam
 * @extends DropboxBase
 * @classdesc The Dropbox SDK class that provides access to team endpoints.
 * @arg {Object} options
 * @arg {String} [options.accessToken] - An access token for making authenticated
 * requests.
 * @arg {String} [options.clientId] - The client id for your app. Used to create
 * authentication URL.
 */
var DropboxTeam = function (_DropboxBase) {
  inherits(DropboxTeam, _DropboxBase);

  function DropboxTeam(options) {
    classCallCheck(this, DropboxTeam);

    var _this = possibleConstructorReturn(this, (DropboxTeam.__proto__ || Object.getPrototypeOf(DropboxTeam)).call(this, options));

    Object.assign(_this, routes$1);
    return _this;
  }

  /**
   * Returns an instance of Dropbox that can make calls to user api endpoints on
   * behalf of the passed user id, using the team access token.
   * @arg {String} userId - The user id to use the Dropbox class as
   * @returns {Dropbox} An instance of Dropbox used to make calls to user api
   * endpoints
   */


  createClass(DropboxTeam, [{
    key: 'actAsUser',
    value: function actAsUser(userId) {
      return new Dropbox({
        accessToken: this.accessToken,
        clientId: this.clientId,
        selectUser: userId
      });
    }
  }]);
  return DropboxTeam;
}(DropboxBase);



var dropboxTeam = Object.freeze({
	DropboxTeam: DropboxTeam
});

var team = dropboxTeam.DropboxTeam;

return team;

})));
//# sourceMappingURL=DropboxTeam-sdk.js.map
