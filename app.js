(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
var haxe = {}
haxe.Http = function(url) {
	this.url = url;
	this.headers = new haxe.ds.StringMap();
	this.params = new haxe.ds.StringMap();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe.Http;
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.prototype = {
	onStatus: function(status) {
	}
	,onError: function(msg) {
	}
	,onData: function(data) {
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = r.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) me.onData(me.responseData = r.responseText); else if(s == null) me.onError("Failed to connect or resolve host"); else switch(s) {
			case 12029:
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.onError("Unknown host");
				break;
			default:
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.keys();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(this.params.get(p));
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		if(this.headers.get("Content-Type") == null && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.keys();
		while( $it1.hasNext() ) {
			var h = $it1.next();
			r.setRequestHeader(h,this.headers.get(h));
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,setParameter: function(param,value) {
		this.params.set(param,value);
		return this;
	}
	,setHeader: function(header,value) {
		this.headers.set(header,value);
		return this;
	}
	,__class__: haxe.Http
}
haxe.Serializer = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new haxe.ds.StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe.Serializer;
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.prototype = {
	serialize: function(v) {
		var _g = Type["typeof"](v);
		var $e = (_g);
		switch( $e[1] ) {
		case 0:
			this.buf.b += "n";
			break;
		case 1:
			if(v == 0) {
				this.buf.b += "z";
				return;
			}
			this.buf.b += "i";
			this.buf.b += Std.string(v);
			break;
		case 2:
			if(Math.isNaN(v)) this.buf.b += "k"; else if(!Math.isFinite(v)) this.buf.b += Std.string(v < 0?"m":"p"); else {
				this.buf.b += "d";
				this.buf.b += Std.string(v);
			}
			break;
		case 3:
			this.buf.b += Std.string(v?"t":"f");
			break;
		case 6:
			var _g_eTClass_0 = $e[2];
			if(_g_eTClass_0 == String) {
				this.serializeString(v);
				return;
			}
			if(this.useCache && this.serializeRef(v)) return;
			switch(_g_eTClass_0) {
			case Array:
				var ucount = 0;
				this.buf.b += "a";
				var l = v.length;
				var _g1 = 0;
				while(_g1 < l) {
					var i = _g1++;
					if(v[i] == null) ucount++; else {
						if(ucount > 0) {
							if(ucount == 1) this.buf.b += "n"; else {
								this.buf.b += "u";
								this.buf.b += Std.string(ucount);
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
				if(ucount > 0) {
					if(ucount == 1) this.buf.b += "n"; else {
						this.buf.b += "u";
						this.buf.b += Std.string(ucount);
					}
				}
				this.buf.b += "h";
				break;
			case List:
				this.buf.b += "l";
				var v1 = v;
				var $it0 = v1.iterator();
				while( $it0.hasNext() ) {
					var i = $it0.next();
					this.serialize(i);
				}
				this.buf.b += "h";
				break;
			case Date:
				var d = v;
				this.buf.b += "v";
				this.buf.b += Std.string(HxOverrides.dateStr(d));
				break;
			case haxe.ds.StringMap:
				this.buf.b += "b";
				var v1 = v;
				var $it1 = v1.keys();
				while( $it1.hasNext() ) {
					var k = $it1.next();
					this.serializeString(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += "h";
				break;
			case haxe.ds.IntMap:
				this.buf.b += "q";
				var v1 = v;
				var $it2 = v1.keys();
				while( $it2.hasNext() ) {
					var k = $it2.next();
					this.buf.b += ":";
					this.buf.b += Std.string(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += "h";
				break;
			case haxe.ds.ObjectMap:
				this.buf.b += "M";
				var v1 = v;
				var $it3 = v1.keys();
				while( $it3.hasNext() ) {
					var k = $it3.next();
					var id = Reflect.field(k,"__id__");
					Reflect.deleteField(k,"__id__");
					this.serialize(k);
					k.__id__ = id;
					this.serialize(v1.h[k.__id__]);
				}
				this.buf.b += "h";
				break;
			case haxe.io.Bytes:
				var v1 = v;
				var i = 0;
				var max = v1.length - 2;
				var charsBuf = new StringBuf();
				var b64 = haxe.Serializer.BASE64;
				while(i < max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					var b3 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt((b2 << 2 | b3 >> 6) & 63));
					charsBuf.b += Std.string(b64.charAt(b3 & 63));
				}
				if(i == max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt(b2 << 2 & 63));
				} else if(i == max + 1) {
					var b1 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt(b1 << 4 & 63));
				}
				var chars = charsBuf.b;
				this.buf.b += "s";
				this.buf.b += Std.string(chars.length);
				this.buf.b += ":";
				this.buf.b += Std.string(chars);
				break;
			default:
				this.cache.pop();
				if(v.hxSerialize != null) {
					this.buf.b += "C";
					this.serializeString(Type.getClassName(_g_eTClass_0));
					this.cache.push(v);
					v.hxSerialize(this);
					this.buf.b += "g";
				} else {
					this.buf.b += "c";
					this.serializeString(Type.getClassName(_g_eTClass_0));
					this.cache.push(v);
					this.serializeFields(v);
				}
			}
			break;
		case 4:
			if(this.useCache && this.serializeRef(v)) return;
			this.buf.b += "o";
			this.serializeFields(v);
			break;
		case 7:
			var _g_eTEnum_0 = $e[2];
			if(this.useCache && this.serializeRef(v)) return;
			this.cache.pop();
			this.buf.b += Std.string(this.useEnumIndex?"j":"w");
			this.serializeString(Type.getEnumName(_g_eTEnum_0));
			if(this.useEnumIndex) {
				this.buf.b += ":";
				this.buf.b += Std.string(v[1]);
			} else this.serializeString(v[0]);
			this.buf.b += ":";
			var l = v.length;
			this.buf.b += Std.string(l - 2);
			var _g1 = 2;
			while(_g1 < l) {
				var i = _g1++;
				this.serialize(v[i]);
			}
			this.cache.push(v);
			break;
		case 5:
			throw "Cannot serialize function";
			break;
		default:
			throw "Cannot serialize " + Std.string(v);
		}
	}
	,serializeFields: function(v) {
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				this.buf.b += Std.string(i);
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			this.buf.b += Std.string(x);
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = StringTools.urlEncode(s);
		this.buf.b += Std.string(s.length);
		this.buf.b += ":";
		this.buf.b += Std.string(s);
	}
	,toString: function() {
		return this.buf.b;
	}
	,__class__: haxe.Serializer
}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.prototype = {
	run: function() {
		console.log("run");
	}
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,__class__: haxe.Timer
}
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		var _g = this.buf.charCodeAt(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new haxe.ds.IntMap();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) throw "Invalid IntMap format";
			return h;
		case 77:
			var h = new haxe.ds.ObjectMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,__class__: haxe.Unserializer
}
haxe.ds = {}
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe.ds.IntMap
}
haxe.ds.ObjectMap = function(weakKeys) {
	if(weakKeys == null) weakKeys = false;
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,set: function(key,value) {
		var id = key.__id__ != null?key.__id__:key.__id__ = ++haxe.ds.ObjectMap.count;
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe.ds.ObjectMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.prototype = {
	__class__: haxe.io.Bytes
}
haxe.remoting = {}
haxe.remoting.AsyncConnection = function() { }
$hxClasses["haxe.remoting.AsyncConnection"] = haxe.remoting.AsyncConnection;
haxe.remoting.AsyncConnection.__name__ = ["haxe","remoting","AsyncConnection"];
haxe.remoting.AsyncConnection.prototype = {
	__class__: haxe.remoting.AsyncConnection
}
haxe.remoting.HttpAsyncConnection = function(data,path) {
	this.__data = data;
	this.__path = path;
};
$hxClasses["haxe.remoting.HttpAsyncConnection"] = haxe.remoting.HttpAsyncConnection;
haxe.remoting.HttpAsyncConnection.__name__ = ["haxe","remoting","HttpAsyncConnection"];
haxe.remoting.HttpAsyncConnection.__interfaces__ = [haxe.remoting.AsyncConnection];
haxe.remoting.HttpAsyncConnection.urlConnect = function(url) {
	return new haxe.remoting.HttpAsyncConnection({ url : url, error : function(e) {
		throw e;
	}},[]);
}
haxe.remoting.HttpAsyncConnection.prototype = {
	call: function(params,onResult) {
		var h = new haxe.Http(this.__data.url);
		var s = new haxe.Serializer();
		s.serialize(this.__path);
		s.serialize(params);
		h.setHeader("X-Haxe-Remoting","1");
		h.setParameter("__x",s.toString());
		var error = this.__data.error;
		h.onData = function(response) {
			var ok = true;
			var ret;
			try {
				if(HxOverrides.substr(response,0,3) != "hxr") throw "Invalid response : '" + response + "'";
				var s1 = new haxe.Unserializer(HxOverrides.substr(response,3,null));
				ret = s1.unserialize();
			} catch( err ) {
				ret = null;
				ok = false;
				error(err);
			}
			if(ok && onResult != null) onResult(ret);
		};
		h.onError = error;
		h.request(true);
	}
	,resolve: function(name) {
		var c = new haxe.remoting.HttpAsyncConnection(this.__data,this.__path.slice());
		c.__path.push(name);
		return c;
	}
	,__class__: haxe.remoting.HttpAsyncConnection
}
var js = {}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Browser = function() { }
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
}
var prime = {}
prime.wwx2013 = {}
prime.wwx2013.PrimeEditor = function(t) {
	var _g = this;
	this.textarea = t;
	this.id = t.prop("id");
	var editorId = "#demo-" + this.id + " ";
	this.initUI(this.id);
	var options = { id : "", className : "Test", targets : 3, defaultTarget : 1, defaultJsArgs : [], defaultSwfArgs : [], haxeCode : { theme : "default", lineWrapping : true, lineNumbers : true, mode : "haxe", styleActiveLine : true, extraKeys : { 'Ctrl-Space' : "autocomplete", 'Ctrl-Enter' : "compile", F8 : "compile", F5 : "compile"}, indentUnit : 4}, jsOutput : { theme : "default", lineWrapping : true, lineNumbers : false, mode : "javascript", readOnly : true}, apiURI : "/compiler", root : ""};
	options.haxeCode.lineNumbers = false;
	options.haxeCode.theme = "monokai";
	options.jsOutput.theme = "monokai";
	options.root = "components/try-haxe/";
	options.id = "demo-" + this.id;
	options.apiURI = new js.JQuery("body").data("api") + "/compiler";
	this.editor = new tryhaxe.Editor(options);
	this.editor.handleLoaded = $bind(this,this.updateTargetRadio);
	this.editor.handleCompile = $bind(this,this.handleCompile);
	this.editor.handleCompiled = $bind(this,this.handleCompiled);
	this.editor.handleCompleted = function() {
		_g.compileBtn.button("reset");
	};
	this.haxeOutput = new js.JQuery(editorId + "iframe[name='js-run']");
	this.messages = new js.JQuery(editorId + ".messages");
	this.compileBtn = new js.JQuery(editorId + ".compile-btn");
	this.targets = new js.JQuery(editorId + ".hx-targets");
	this.jsTab = new js.JQuery(editorId + "a[href='.js-source']");
	this.outDisplay = new js.JQuery(editorId + ".compiler-out");
	new js.JQuery("body").bind("keyup",$bind(this,this.onKey));
	new js.JQuery(editorId + "a[data-toggle='tab']").bind("shown",function(_) {
		_g.editor.refreshSources();
	});
	this.compileBtn.bind("click",function(e) {
		e.preventDefault();
		_g.editor.compile();
	});
	this.targets.delegate("input.hx-target","change",$bind(this,this.changeTarget));
	this.editor.startNewProgram();
};
$hxClasses["prime.wwx2013.PrimeEditor"] = prime.wwx2013.PrimeEditor;
prime.wwx2013.PrimeEditor.__name__ = ["prime","wwx2013","PrimeEditor"];
prime.wwx2013.PrimeEditor.main = function() {
	Reveal.addEventListener("slidechanged",prime.wwx2013.PrimeEditor.loadEditor);
}
prime.wwx2013.PrimeEditor.loadEditor = function(e) {
	var slide = new js.JQuery(e.currentSlide);
	var fields = slide.find("textarea[name='hx-source']");
	var $it0 = (fields.iterator)();
	while( $it0.hasNext() ) {
		var code = $it0.next();
		if(!(function($this) {
			var $r;
			var key = code.prop("id");
			$r = prime.wwx2013.PrimeEditor.editors.exists(key);
			return $r;
		}(this))) {
			var key = code.prop("id");
			prime.wwx2013.PrimeEditor.editors.set(key,new prime.wwx2013.PrimeEditor(code));
		}
	}
}
prime.wwx2013.PrimeEditor.prototype = {
	initUI: function(id) {
		this.textarea.wrap("<div class=\"demo\" id=\"demo-" + id + "\" />").before("<div class=\"control-group hx-targets\">\n        <a href=\"#\" class=\"compile-btn btn\" data-loading-text=\"Compiling\"><i class=\"icon-cog\"></i> Run</a>\n        <div class=\"target-controls\">\n            <input type=\"radio\" name=\"target-" + id + "\" class=\"hx-target\" value=\"" + 2 + "\" id=\"js-radio-" + id + "\"><label for=\"js-radio-" + id + "\" class=\"radio inline\">JS</label>\n            <input type=\"radio\" name=\"target-" + id + "\" class=\"hx-target\" value=\"" + 1 + "\" id=\"swf-radio-" + id + "\"><label for=\"swf-radio-" + id + "\" class=\"radio inline\"> SWF</label>\n        </div>\n    </div>").after("<div class=\"compiler-out\">\n        <ul class=\"nav nav-tabs\">\n            <li class=\"active\"><a href=\".js-output\" data-toggle=\"tab\">Output</a></li>\n            <li><a href=\".js-source\" data-toggle=\"tab\">JS Source</a></li>\n        </ul>\n        <div class=\"tab-content\">\n            <div class=\"tab-pane js-output active\"><iframe class=\"js-run\" src=\"about:blank\" name=\"js-run\" frameborder=\"no\" scrolling=\"no\"></iframe></div>\n            <div class=\"tab-pane js-source\"><textarea name=\"js-source\" class=\"code js-source\"></textarea></div>\n            <div class=\"messages\"></div>\n        </div>\n    </div>");
	}
	,handleCompiled: function() {
		var o = this.editor.output;
		var jsSourceElem = new js.JQuery(this.editor.jsSource.getWrapperElement());
		var msgType = "";
		this.outDisplay.show();
		if(o.success) {
			jsSourceElem.show();
			this.haxeOutput.show();
			var _g = this;
			switch( (_g.editor.program.target)[1] ) {
			case 0:
				this.jsTab.show();
				break;
			default:
				this.jsTab.hide();
			}
			this.haxeOutput.attr("src",o.href + "?r=" + Std.string(Math.random()));
		} else {
			this.haxeOutput.hide();
			this.jsTab.hide();
			jsSourceElem.hide();
			this.haxeOutput.attr("src","about:blank");
		}
		this.messages.html("<i class='msg icon-" + (o.success?"check":"cancel") + "'></i><div class='message'></div>");
		if(o.stderr != null) {
			this.messages.append(new js.JQuery("<pre>").text(o.stderr));
			if(!o.success) {
				var args = [], i = 0;
				while(i < o.args.length) {
					args.push(o.args[i] + " " + o.args[i + 1]);
					i += 2;
				}
				this.messages.append(new js.JQuery("<pre class='args'>").text(args.join("\n")));
			}
		}
		this.messages.fadeIn();
		this.compileBtn.button("reset");
	}
	,handleCompile: function() {
		this.messages.fadeOut(0);
		this.compileBtn.button("loading");
		this.editor.program.options = [new js.JQuery("#demo-" + this.id + " textarea[name='hx-source']").data("haxe-" + this.editor.program.target[0].toLowerCase())];
	}
	,updateTargetRadio: function() {
		var _g = this;
		switch( (_g.editor.program.target)[1] ) {
		case 0:
			this.jsTab.fadeIn();
			break;
		case 1:
			this.jsTab.hide();
			break;
		}
		new js.JQuery("#demo-" + this.id + " input#" + this.editor.program.target[0].toLowerCase() + "-radio-" + this.id).attr("checked","checked");
	}
	,changeTarget: function(e) {
		this.editor.program.target = this.editor.toTarget(Std.parseInt(new js.JQuery(e.target).val()));
		this.updateTargetRadio();
	}
	,onKey: function(e) {
		if(e.ctrlKey && e.keyCode == 13 || e.keyCode == 119) {
			e.preventDefault();
			this.editor.compile();
		}
	}
	,__class__: prime.wwx2013.PrimeEditor
}
var tryhaxe = {}
tryhaxe.Editor = function(o) {
	this.initialized = false;
	this.options = o;
	this.cnx = haxe.remoting.HttpAsyncConnection.urlConnect(o.apiURI);
	if(!tryhaxe.Editor.loadedResources) {
		tryhaxe.Editor.loadResources(o);
		haxe.Timer.delay($bind(this,this.init),300);
	} else this.init();
};
$hxClasses["tryhaxe.Editor"] = tryhaxe.Editor;
tryhaxe.Editor.__name__ = ["tryhaxe","Editor"];
tryhaxe.Editor.showHint = function(cm,opt) {
	var doc = cm.getDoc();
	var editor = tryhaxe.Editor.cmToEditor(cm);
	var src = doc.getValue();
	var cursor = doc.indexFromPos(doc.getCursor());
	var from = (function($this) {
		var $r;
		var $char = cursor;
		var iniChar = $char;
		while($char > 0 && src.charAt($char - 1) != ".") $char--;
		$r = new EReg("[^a-zA-Z0-9_\\s]","").match(src.substring(iniChar,$char))?null:$char;
		return $r;
	}(this));
	var token = src.substring(from,cursor);
	var list = [];
	var _g = 0, _g1 = editor.completions;
	while(_g < _g1.length) {
		var c = _g1[_g];
		++_g;
		if(StringTools.startsWith(c.toLowerCase(),token.toLowerCase())) list.push(c);
	}
	return { list : list, from : doc.posFromIndex(from), to : doc.posFromIndex(cursor)};
}
tryhaxe.Editor.loadResources = function(opt) {
	new js.JQuery("head").append("\n            <link rel=\"stylesheet\" href=\"" + opt.root + "lib/CodeMirror2/lib/codemirror.css\"/>\n            <link rel=\"stylesheet\" href=\"" + opt.root + "lib/CodeMirror2/addon/hint/show-hint.css\"/>");
	if(opt.haxeCode.theme != "default") new js.JQuery("head").append("<link rel=\"stylesheet\" href=\"" + opt.root + "lib/CodeMirror2/theme/" + opt.haxeCode.theme + ".css\"/>");
	new js.JQuery("body").append("<script type=\"text/javascript\" src=\"" + opt.root + "lib/CodeMirror2/lib/codemirror.js\"></script>" + "<script type=\"text/javascript\" src=\"" + opt.root + "lib/CodeMirror2/mode/haxe/haxe.js\"></script>" + "<script type=\"text/javascript\" src=\"" + opt.root + "lib/CodeMirror2/mode/javascript/javascript.js\"></script>" + "<script type=\"text/javascript\" src=\"" + opt.root + "lib/CodeMirror2/addon/hint/show-hint.js\"></script>" + "<script type=\"text/javascript\" src=\"" + opt.root + "lib/CodeMirror2/addon/selection/active-line.js\"></script>" + "<script type=\"text/javascript\" src=\"" + opt.root + "lib/haxe-hint.js\"></script>");
	CodeMirror.commands.autocomplete = function(cm) {
		tryhaxe.Editor.cmToEditor(cm).autocomplete();
	};
	CodeMirror.commands.compile = function(cm) {
		tryhaxe.Editor.cmToEditor(cm).compile();
	};
	tryhaxe.Editor.loadedResources = true;
}
tryhaxe.Editor.cmToEditor = function(cm) {
	return tryhaxe.Editor.editorMap.h[cm.__id__];
}
tryhaxe.Editor.prototype = {
	markErrors: function() {
		var errLine = new EReg("([^:]*):([0-9]+): characters ([0-9]+)-([0-9]+) :(.*)","g");
		var _g = 0, _g1 = this.output.errors;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(errLine.match(e)) {
				var err = { file : errLine.matched(1), line : Std.parseInt(errLine.matched(2)) - 1, from : Std.parseInt(errLine.matched(3)), to : Std.parseInt(errLine.matched(4)), msg : errLine.matched(5)};
				if(StringTools.trim(err.file) == this.options.className + ".hx") {
					this.lineHandles.push(this.haxeSource.setGutterMarker(err.line,"error",new js.JQuery("<i class='icon-warning-sign icon-white'></i>").toArray()[0]));
					this.markers.push(this.haxeDoc.markText({ line : err.line, ch : err.from},{ line : err.line, ch : err.to},{ className : "error"}));
				}
			}
		}
	}
	,clearErrors: function() {
		var _g = 0, _g1 = this.markers;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			m.clear();
		}
		var _g = 0, _g1 = this.lineHandles;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			this.haxeSource.setGutterMarker(this.haxeDoc.getLineNumber(l),null,null);
		}
		this.markers = [];
	}
	,onCompiled: function(o) {
		this.output = o;
		this.program.uid = o.uid;
		if(!o.success) this.markErrors(); else {
			this.jsSource.getDoc().setValue(o.source);
			this.jsSource.refresh();
		}
		if(this.handleCompiled != null) this.handleCompiled();
	}
	,compile: function() {
		this.clearErrors();
		this.program.main.source = this.haxeDoc.getValue();
		if(this.handleCompile != null) this.handleCompile();
		this.cnx.resolve("Compiler").resolve("compile").call([this.program],$bind(this,this.onCompiled));
	}
	,openAutoComplete: function(cm,e) {
		if(e.text.pop() == ".") this.autocomplete();
	}
	,displayCompletions: function(comps) {
		this.completions = comps;
		CodeMirror.showHint(this.haxeSource,tryhaxe.Editor.showHint);
		if(this.handleCompleted != null) this.handleCompleted();
	}
	,autocomplete: function() {
		this.program.main.source = this.haxeDoc.getValue();
		if(this.handleCompile != null) this.handleCompile();
		var src = this.haxeDoc.getValue();
		var idx = this.haxeDoc.indexFromPos(this.haxeDoc.getCursor());
		if(idx == null) return;
		if(idx == this.completionIndex) {
			this.displayCompletions(this.completions);
			return;
		}
		this.completionIndex = idx;
		if(src.length > 1000) this.program.main.source = src.substring(0,idx);
		this.cnx.resolve("Compiler").resolve("autocomplete").call([this.program,idx],$bind(this,this.displayCompletions));
	}
	,onProgramLoaded: function(c) {
		if(c != null) {
			this.program = c.program;
			this.output = c.out;
			if(this.initialized) {
				this.haxeDoc.setValue(this.program.main.source);
				if(this.handleLoaded != null) this.handleLoaded();
				if(c.out != null) this.onCompiled(c.out);
			}
		}
	}
	,refreshSources: function() {
		this.jsSource.refresh();
		this.haxeSource.refresh();
	}
	,toTarget: function(target) {
		var n = this.options.className.toLowerCase();
		return (function($this) {
			var $r;
			switch(target) {
			case 1:
				$r = tryhaxe.api.Target.SWF(n,11);
				break;
			case 2:
				$r = tryhaxe.api.Target.JS(n);
				break;
			default:
				$r = (function($this) {
					var $r;
					throw "Unknown target " + target;
					return $r;
				}($this));
			}
			return $r;
		}(this));
	}
	,startNewProgram: function() {
		if(this.initialized) this.onProgramLoaded({ out : null, program : { uid : null, main : { name : this.options.className, source : this.haxeDoc.getValue()}, target : this.toTarget(this.options.defaultTarget), options : this.options.defaultTarget == 2?this.options.defaultJsArgs:this.options.defaultSwfArgs}});
	}
	,init: function() {
		this.markers = [];
		this.lineHandles = [];
		this.haxeSource = CodeMirror.fromTextArea(new js.JQuery("#" + this.options.id + " textarea[name='hx-source']")[0],this.options.haxeCode);
		this.haxeSource.on("change",$bind(this,this.openAutoComplete));
		this.haxeDoc = this.haxeSource.getDoc();
		tryhaxe.Editor.editorMap.set(this.haxeSource,this);
		if(this.options.jsOutput != null) this.jsSource = CodeMirror.fromTextArea(new js.JQuery("#" + this.options.id + " textarea[name='js-source']")[0],this.options.jsOutput);
		this.initialized = true;
		if(this.program != null) this.onProgramLoaded({ out : this.output, program : this.program}); else this.startNewProgram();
	}
	,__class__: tryhaxe.Editor
}
tryhaxe.api = {}
tryhaxe.api.Target = $hxClasses["tryhaxe.api.Target"] = { __ename__ : ["tryhaxe","api","Target"], __constructs__ : ["JS","SWF"] }
tryhaxe.api.Target.JS = function(name) { var $x = ["JS",0,name]; $x.__enum__ = tryhaxe.api.Target; $x.toString = $estr; return $x; }
tryhaxe.api.Target.SWF = function(name,version) { var $x = ["SWF",1,name,version]; $x.__enum__ = tryhaxe.api.Target; $x.toString = $estr; return $x; }
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var q = window.jQuery;
js.JQuery = q;
q.fn.iterator = function() {
	return { pos : 0, j : this, hasNext : function() {
		return this.pos < this.j.length;
	}, next : function() {
		return $(this.j[this.pos++]);
	}};
};
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
prime.wwx2013.PrimeEditor.editors = new haxe.ds.StringMap();
tryhaxe.Editor.loadedResources = false;
tryhaxe.Editor.editorMap = new haxe.ds.ObjectMap();
prime.wwx2013.PrimeEditor.main();
})();
