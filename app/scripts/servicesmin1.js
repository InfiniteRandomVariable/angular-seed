var phonecatServices = angular.module("phonecatServices", ["ngResource"]);
phonecatServices.constant("ArticlesCtrlResolve", {Articles:function(asyncService) {
  for (var e = parseInt((new Date).getTime() / 60 / 1E3 / 30), a = "nytimes guardian atlantic nydailynews youtube hulu wired bloomberg techcrunch wsj amzbooks rtomatoes billboard".split(" "), d = [], f = a.length, g = 0;f > g;g++) {
    var c = "http://d2invxie986h3w.cloudfront.net/" + a[g] + "/" + e + ".json";
    console.log(c);
    d.push(c);
  }
  return asyncService.loadDataFromUrls(d);
}}).factory("tagSortCriteria", function() {
  function b(d, f) {
    var b = a.mode != f;
    return void 0 === a.mode || void 0 === f ? (a.mode = e, void 0) : b ? (a.mode = f.toString(), a.reverse = !0, void 0) : (a.reverse = !a.reverse, console.log("Query.Mode: ", a.mode), void 0);
  }
  var e = "age", a = {selectedId:-1, mode:e, reverse:!0, positions:{start:-1, end:-1}};
  return{popMode:function(a) {
    b(a, "topCommentNum");
  }, scoreMode:function(a) {
    b(a, "score");
  }, ageMode:function(a) {
    b(a, e);
  }, pubMode:function(a) {
    b(a, "pub");
  }, typeMode:function(a) {
    b(a, "tag");
  }, query:function() {
    return console.log(" 1 query positions start: ", a.positions.start, a.positions.end, "queryMode: ", a.mode), a;
  }, setPositions:function(d) {
    return 0 == -2 < d.start || 0 == -2 < d.end ? (console.log("WARNING: start/end positions must be bigger than -2"), void 0) : d.end < d.start ? (console.log("WARNING: start position must be smaller than end position"), void 0) : (a.positions.start = d.start, a.positions.end = d.end, console.log(" 2 query positions start: ", a.positions.start, a.positions.end), a.positions);
  }, getPositions:function() {
    return console.log(" 3 query positions start: ", a.positions.start, a.positions.end), a.positions;
  }, POP:function() {
    return "topCommentNum";
  }, AGE:function() {
    return e;
  }, PUB:function() {
    return "pub";
  }, SCORE:function() {
    return "score";
  }, TYPE:function() {
    return "tag";
  }, setSelectedId:function(d) {
    return 0 > d && console.log("WARNING: trigger an error, selected index cannot be n < 0"), a.selectedId = d, a.selectedId;
  }, getSelectedId:function() {
    return a.selectedId;
  }, setQueryReverse:function(d) {
    a.reverse = d;
  }, setQueryMode:function(d) {
    a.mode = d;
  }};
}).factory("data", function() {
  var b, e = !1, a = function() {
    return{get:function() {
      return b;
    }, set:function(a) {
      for (var e = 0, b = a.length;b > e;e++) {
        a[e].id = e, console.log("Added: " + e);
      }
      return a;
    }};
  }();
  return{friends:function(d) {
    return console.log("about to call _friends"), "[object Array]" === Object.prototype.toString.call(d) && 0 < d.length && !1 === e ? (e = !0, console.log("try to add id to each object"), a.set(d)) : a.get();
  }, setFriends:function(a) {
    console.log("setting friends");
    b = a;
  }};
}).factory("articleFormatter", function() {
  return{merge:function(b) {
    var e = [];
    if (0 > b.constructor.toString().indexOf("Array") || 1 > b.length) {
      return console.log("Empty object 1"), void 0;
    }
    for (var a = b.length, d = 0;a > d;d++) {
      var f = b[d];
      if (void 0 !== f) {
        for (var g in f) {
          console.log("Prop name: " + g);
          var c = f[g];
          if (-1 < c.constructor.toString().indexOf("Array") && 0 < c.length) {
            for (var m = c.length, k = 0;m > k;k++) {
              var h = c[k];
              (h.pub = g, 0 < h.topCommentNum && 0 < h.numComments) ? h.score = parseInt(h.topCommentNum / h.numComments * 100) : h.score = 0;
              e.push(h);
              console.log("Added article: " + h.title);
              for (var l in h) {
                console.log("ObjectPropName " + l + " value: " + h[l]);
              }
            }
          }
        }
      } else {
        console.log("undefined data");
      }
    }
    return e;
  }, sort:function() {
    return[];
  }};
}).factory("asyncService", ["$resource", "$q", "$http", "articleFormatter", "data", function($resource, $q, $http, articleFormatter, data) {
	var d = articleFormatter;
  function f(d) {
    var c = $q.defer();
    return $http.get(d).success(function(a) {
      c.resolve(a);
    }).error(function(a, d, e, b) {
      a = b.url.match(/(people|nytimes|wsj|billboard|hulu|rtomatoes|amzbooks|techcrunch|bloomberg|wired|youtube|nydailynews|atlantic|guardian){1}/gi);
      if (console.log("pubName1: " + b.url), a && 0 < a.length) {
        a = a[0], b = {pub:[]}, console.log("pubName2: " + a), c.resolve(b);
      }
    }), c.promise;
  }
  return{loadDataFromUrls:function(a) {
    var c = $q.defer(), b = [];
    return angular.forEach(a, function(a) {
      b.push(f(a));
    }), $q.all(b).then(function(a) {
      console.log("success");
      a = d.merge(a);
      c.resolve(a);
    }, function(a) {
      return console.log("fail"), $q.reject(a);
    }), c.promise;
  }};	//b, e, a
}]).factory("tagSorterController", ["$filter", "data", "tagSortCriteria", function($filter, data,tagSortCriteria) {
	var a = tagSortCriteria;
	var b = $filter;
	var e = data;
  var d = b("orderBy"), f = function() {
    return{get:function(a, d, e) {
      if (!(0 > d)) {
        void 0 === e ? (e = "id", console.log("CHECKING 1")) : console.log("CHECKING 2");
        for (var b = 0, f = a.length;f > b;b++) {
          var g = a[b];
          if (g[e] === d) {
            return g;
          }
        }
      }
    }};
  }(), g = function() {
    var c = {start:-1, end:-1};
    return{set:function(d, e) {
      var b = a.query(), f = a.setPositions(c);
      if (0 > b.selectedId || b.mode === a.AGE() || b.mode === a.POP()) {
        return console.log("prohibit to proceed string search in age and pop mode or selectId < 0 " + b.selectedId.toString()), void 0;
      }
      console.log("SearchStr: " + e);
      for (var g = 0, n = d.length;n > g;g++) {
        if (d[g][b.mode] === e) {
          0 > f.start ? f.start = g : f.end = g + 1;
        } else {
          if (0 < f.end) {
            return;
          }
        }
      }
      0 > f.end && 1 == -1 < f.start && (f.end = f.start + 1);
    }, get:function() {
      return a.getPositions();
    }};
  }();
  return{setAge:function(c) {
    a.ageMode(c);
  }, setPop:function(c) {
    a.popMode(c);
  }, setPub:function(c) {
    a.pubMode(c);
  }, setScore:function(c) {
    a.scoreMode(c);
  }, setType:function(c) {
    a.typeMode(c);
  }, sorter:function(c) {
    var b = a.query();
    console.log("SORTER index:" + c.toString(), "previous search mode: ", b.mode, " previousQuery.selectedId: ", b.selectedId);
    var k = f.get(e.friends(), b.selectedId);
    console.log("PREVSearchObject", k);
    b = void 0 === k || void 0 === b.mode ? void 0 : k[b.mode];
    a.setSelectedId(c);
    c = a.query();
    k = f.get(e.friends(), c.selectedId)[c.mode];
    if (k === b) {
      return a.setSelectedId(-1), c.mode === a.POP() || c.mode === a.AGE() || c.mode === a.SCORE() || (a.setQueryMode(a.AGE()), a.setQueryReverse(!0)), b = d(e.friends(), c.mode, c.reverse), e.setFriends(b), a.setPositions({start:-1, end:-1}), void 0;
    }
    console.log("MODE: ", c.mode, " reverse: ", c.reverse);
    b = d(e.friends(), c.mode, c.reverse);
    if (c.mode == a.PUB() || c.mode == a.TYPE()) {
      g.set(b, k), c = a.getPositions(), console.log("positions: start", c.start);
    }
    e.setFriends(b);
  }};
}]);