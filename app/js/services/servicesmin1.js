var phonecatServices = angular.module("phonecatServices", ["ngResource"]);

function articleFormatterFunc($filter){return{merge:function(b){var k = $filter; var d=[];if(0>b.constructor.toString().indexOf("Array")||1>b.length)console.log("Empty object 1");else{for(var l=b.length,e=0;e<l;e++){var f=b[e];if(void 0===f)console.log("undefined data");else for(var g in f){var c=f[g];if(-1<c.constructor.toString().indexOf("Array")&&0<c.length)for(var m=c.length,h=0;h<m;h++){var a=c[h];a.pub=g;a.score=0<a.topCommentNum&&0<a.numComments?parseInt(a.topCommentNum/a.numComments* 100):0;d.push(a)}}}return d=k("orderBy")(d,"age",!0)}},sort:function(b){return[]}}};
phonecatServices.constant("ArticlesCtrlResolve", {Articles:function(asyncService) {
  for (var e = parseInt((new Date).getTime() / 60 / 1E3 / 30), a = "nytimes guardian atlantic nydailynews youtube hulu wired techcrunch wsj amzbooks rtomatoes billboard people".split(" "), d = [], f = a.length, g = 0;f > g;g++) {
    var c = "http://d2invxie986h3w.cloudfront.net/" + a[g] + "/" + e + ".json";
    console.log(c);
    d.push(c);
  }
  return asyncService.loadDataFromUrls(d);
}}).factory("tagSortCriteria",function(){function c(b,c){var e=a.mode!=c;return void 0===a.mode||void 0===c?(a.mode=d,void 0):e?(a.mode=c.toString(),a.reverse=!0,void 0):(a.reverse=!a.reverse,console.log("Query.Mode: ",a.mode),void 0)}var d="age",a={selectedId:-1,mode:d,reverse:!0,positions:{start:-1,end:-1}};return{popMode:function(a){c(a,"topCommentNum")},scoreMode:function(a){c(a,"score")},ageMode:function(a){c(a,d)},pubMode:function(a){c(a,"pub")},typeMode:function(a){c(a,"tag")},query:function(){return console.log(" 1 query positions start: ", a.positions.start,a.positions.end,"queryMode: ",a.mode),a},setPositions:function(b){return 0==-2<b.start||0==-2<b.end?(console.log("WARNING: start/end positions must be bigger than -2"),void 0):b.end<b.start?(console.log("WARNING: start position must be smaller than end position"),void 0):(a.positions.start=b.start,a.positions.end=b.end,console.log(" 2 query positions start: ",a.positions.start,a.positions.end),a.positions)},getPositions:function(){return console.log(" 3 query positions start: ", a.positions.start,a.positions.end),a.positions},POP:function(){return"topCommentNum"},AGE:function(){return d},PUB:function(){return"pub"},SCORE:function(){return"score"},TYPE:function(){return"tag"},setSelectedId:function(b){return 0>b&&console.log("WARNING: trigger an error, selected index cannot be n < 0"),a.selectedId=b,a.selectedId},getSelectedId:function(){return a.selectedId},setQueryReverse:function(b){a.reverse=b},setQueryMode:function(b){a.mode=b}}})
.factory("data",function(){var d,a=!1,c=function(){return{get:function(){return d},set:function(b){for(var a=0,c=b.length;c>a;a++)b[a].id=a;return b}}}();return{friends:function(b){return console.log("about to call _friends"),"[object Array]"===Object.prototype.toString.call(b)&&0<b.length&&!1===a?(a=!0,console.log("try to add id to each object"),c.set(b)):c.get()},setFriends:function(a){console.log("setting friends");d=a}}}).factory("articleFormatter",articleFormatterFunc).factory("asyncService", ["$resource","$q","$http","articleFormatter","data",function(d,a,c,b,h){function g(b){var e=a.defer();return c.get(b).success(function(a){e.resolve(a)}).error(function(a,b,c,f){a=f.url.match(/(people|nytimes|wsj|billboard|hulu|rtomatoes|amzbooks|techcrunch|bloomberg|wired|youtube|nydailynews|atlantic|guardian){1}/gi);if(console.log("pubName1: "+f.url),a&&0<a.length)a=a[0],f={pub:[]},console.log("pubName2: "+a),e.resolve(f)}),e.promise}return{loadDataFromUrls:function(c){var e=a.defer(),d=[];return angular.forEach(c, function(a){d.push(g(a))}),a.all(d).then(function(a){console.log("success");a=b.merge(a);e.resolve(a)},function(b){return console.log("fail"),a.reject(b)}),e.promise}}}])
.factory("tagSorterController",["$filter","data","tagSortCriteria",function($filter,data,tagSortCriteria){var m = $filter; var g = data; var b = tagSortCriteria; var k=m("orderBy"),l=function(){return{get:function(a,b,d){if(!(0>b)){void 0===d?(d="id",console.log("CHECKING 1")):console.log("CHECKING 2");for(var f=0,e=a.length;e>f;f++){var h=a[f];if(h[d]===b)return h}}}}}(),n=function(){var a={start:-1,end:-1};return{set:function(c,d){var f=b.query(),e=b.setPositions(a);if(0>f.selectedId||f.mode===b.AGE()||f.mode===b.POP())return console.log("prohibit to proceed string search in age and pop mode or selectId < 0 "+ f.selectedId.toString()),void 0;console.log("SearchStr: "+d);for(var h=0,g=c.length;g>h;h++)if(c[h][f.mode]===d)0>e.start?e.start=h:e.end=h+1;else if(0<e.end)return;0>e.end&&1==-1<e.start&&(e.end=e.start+1)},get:function(){return b.getPositions()}}}();return{setAge:function(a){b.ageMode(a)},setPop:function(a){b.popMode(a)},setPub:function(a){b.pubMode(a)},setScore:function(a){b.scoreMode(a)},setType:function(a){b.typeMode(a)},sorter:function(a){var c=b.query();console.log("SORTER index:"+a.toString(), "previous search mode: ",c.mode," previousQuery.selectedId: ",c.selectedId);var d=l.get(g.friends(),c.selectedId);console.log("PREVSearchObject",d);c=void 0===d||void 0===c.mode?void 0:d[c.mode];b.setSelectedId(a);a=b.query();d=l.get(g.friends(),a.selectedId)[a.mode];if(d===c)return b.setSelectedId(-1),a.mode===b.POP()||a.mode===b.AGE()||a.mode===b.SCORE()||(b.setQueryMode(b.AGE()),b.setQueryReverse(!0)),c=k(g.friends(),a.mode,a.reverse),g.setFriends(c),b.setPositions({start:-1,end:-1}),void 0;console.log("MODE: ", a.mode," reverse: ",a.reverse);c=k(g.friends(),a.mode,a.reverse);if(a.mode==b.PUB()||a.mode==b.TYPE())n.set(c,d),a=b.getPositions(),console.log("positions: start",a.start);g.setFriends(c)}}}]);