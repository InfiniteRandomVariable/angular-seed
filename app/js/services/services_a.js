'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);


function articleFormatterFunc($filter){
  return{

    merge: function(articleObject){

      //console.log('ObjectType: ' + typeof(articleObject));
      var error = true;
      var dataArray  = [];

      if (articleObject.constructor.toString().indexOf("Array") < 0  || articleObject.length < 1 ){
        console.log('Empty object 1');
        return;
      }
      var aLen = articleObject.length;

      for(var c = 0; c < aLen; c++){

        //WARNING: this line is for q.deferred call which doesn't have a data property;
        var data = articleObject[c];
        //WARNING: this line is for http call as it has data property;
        //var data = articleObject[c].data;
        if(data === undefined){
            console.log('undefined data')
            continue;
        }
        for(var prop in data){
              console.log('Prop name: ' + prop);


              //sorting the data array by publication names to satisfy reader experience.
              var articles = data[prop];
              if(articles.constructor.toString().indexOf("Array") > -1 && articles.length > 0 ){

                  var arLen = articles.length;

                  for(var cc = 0; cc < arLen; cc++ ){
                    //dataArray[i].id = i;
                    var article = articles[cc];
                    article['pub'] = prop;
                    if(article.topCommentNum > 0 && article.numComments > 0){
                         var score = article.topCommentNum / article.numComments ; 
                         article['score'] = parseInt(score * 100);
                    }else {
                       article['score'] = 0;
                    }
                    // if(article.age === undefined){
                    //   console.log('article.age === undefined')
                    // }
                    dataArray.push(article);
                    // console.log('Added article: ' + article.title);
                    // for(var pprop in article){
                    //   console.log('ObjectPropName ' + pprop +  ' value: ' + article[pprop]);
                    // } 
                  }// for 

               }// if
          } //for

        } //for

        dataArray = $filter('orderBy')(dataArray, 'age' , true);


        return dataArray;


    },
    sort: function(mergedArticleArray){

      var emptyArray = [];
      //return mergedArticleArray;
      return emptyArray;
    }

  };
};


function tagSorterControllerFunc($filter, data,tagSortCriteria){
  
    var orderBy = $filter('orderBy');

    function printEachVariables(results){

      results.forEach(function(obj){
        Object.keys(obj).forEach(function(key) {
              console.log(key, obj[key])        
        } );
        console.log('#################################################');
        }
      );
    };
    var findObjectsByAttribute = (function (){

      return{
        get: function(_array, index,mode){

        if(index < 0) return;
        if (mode === undefined){
            mode = 'id';
            console.log('CHECKING 1');
          }else{
            console.log('CHECKING 2');
          }

          for (var counter = 0, len = _array.length; counter < len; counter++){
            var object = _array[counter];
            var propertyValue = object[mode];
            if (propertyValue === index) {return object};

          }
        }
      }

    }());
    // findObjectsByAttribute([0,1,2], 3,'id');

//beaware of race condition
    var findMatchingValuePositions = (function (){

      var startingPositions = { start:-1, end: -1};

       return{
               set:function(sortedParentArray, searchStr){


                  //NOTE: don't use query.positions since it will be changed. 
                  var query = tagSortCriteria.query();
                  var positions = tagSortCriteria.setPositions(startingPositions); //default start, end position is -1

                  if(query.selectedId <0 || query.mode ===  tagSortCriteria.AGE() || query.mode === tagSortCriteria.POP() ) {
                    console.log('prohibit to proceed string search in age and pop mode or selectId < 0 ' + query.selectedId.toString());
                    return;
                  }

                  
                  
                  console.log('SearchStr: ' + searchStr);



          for (var counter = 0, len = sortedParentArray.length; counter < len; counter++){

            var obj = sortedParentArray[counter];
              

            if(obj[query.mode] === searchStr){

              if(positions.start < 0){
                  positions.start = counter;
              }else{
                  positions.end = counter + 1;  
                }

            }else if(positions.end > 0){
                return;
            }

           }

           if(positions.end <0 && positions.start > -1 === true){
            positions.end = positions.start + 1;
           }
          return ;
          },
                 get:function(){
                  return tagSortCriteria.getPositions();
                 }
       };
    }()); //return immediately

//custom filter
// sort the array by the requested type of attribute and produce a new array - parent arrray
// sort with only the matching value of the attribute and produce a new array and record the beginning and end position of matches in this parent array - match record array
// splice the parent array with this position records from the match procedure and append/concat this array to match record array with concat().


    return {
     setAge: function(index){
      tagSortCriteria.ageMode(index);
     },
     setPop: function(index){
      tagSortCriteria.popMode(index);
     },
     setPub: function(index){
      tagSortCriteria.pubMode(index);
     },
     setScore: function(index){
      tagSortCriteria.scoreMode(index);
     },      
     setType: function(index){
      tagSortCriteria.typeMode(index);
     },
     sorter : function(index){
      


          //check the previous search string is identical to the current search.
      var previousQuery = tagSortCriteria.query();
      console.log('SORTER index:' + index.toString(), 'previous search mode: ', previousQuery.mode,' previousQuery.selectedId: ', previousQuery.selectedId);

      var prevSearchObj = findObjectsByAttribute.get(data.friends(),previousQuery.selectedId);
      console.log('PREVSearchObject', prevSearchObj);
      var prevSearchStr = (prevSearchObj === undefined || previousQuery.mode === undefined)? undefined: prevSearchObj[previousQuery.mode];


      tagSortCriteria.setSelectedId(index);
      var query = tagSortCriteria.query();
      var searchObj = findObjectsByAttribute.get(data.friends(),query.selectedId);
      var searchStr = searchObj[query.mode];


        //if click the same string same as the selection before, it will change to age mode.
        //the page will be position to the top

        if(searchStr === prevSearchStr ){
            
            tagSortCriteria.setSelectedId(-1);

             if (query.mode === tagSortCriteria.POP() || query.mode === tagSortCriteria.AGE() || query.mode === tagSortCriteria.SCORE()){
              //tagSortCriteria.setQueryReverse(!query.reverse);
             // return;
            }else {
              tagSortCriteria.setQueryMode(tagSortCriteria.AGE());
              tagSortCriteria.setQueryReverse(true);
            }

            var sortedParentArray = orderBy(data.friends(), query.mode ,query.reverse);
            data.setFriends(sortedParentArray);
            var startingPositions = { start:-1, end: -1};
            tagSortCriteria.setPositions(startingPositions);
            return;
          }


      console.log('MODE: ', query.mode,' reverse: ', query.reverse );


      //if  the same selection string as before and reset query return
      //else update query


      
      
      var sortedParentArray = orderBy(data.friends(), query.mode ,query.reverse);

      if(query.mode == tagSortCriteria.PUB() || query.mode == tagSortCriteria.TYPE()){

             //IMPORTANT UNCOMMENT        
              findMatchingValuePositions.set(sortedParentArray, searchStr);
              var positions = tagSortCriteria.getPositions();
              console.log('positions: start', positions.start);

              data.setFriends(sortedParentArray);

      }else{ //POP or AGE Mode

        
        data.setFriends(sortedParentArray);
      }

    }
  };
  
}

function asyncServiceFunc($resource, $q, $http, articleFormatter) {


        function fetchHttp(url, requestCounter) {
    // There will always be a promise so always declare it.
            var deferred = $q.defer();
            // else- not in cache 
            $http.get(url).success(function(data){
                // Store your data or what ever.... 
                // Then resolve
                deferred.resolve(data);
                
            }).error(function(data, status, headers, config) {

                var pubName = config.url.match(/(people|nytimes|wsj|billboard|hulu|rtomatoes|amzbooks|techcrunch|bloomberg|wired|youtube|nydailynews|atlantic|guardian){1}/ig);
                 var dataObj;
                 console.log('pubName1: ' + config.url)
                 //console.log('completedRequestCounter: ' + requestCounter())
                if(pubName && pubName.length> 0){

                          var pub = pubName[0];
                          var dataObj = {pub: []};
                          console.log('pubName2: ' + pub)
                          deferred.resolve(dataObj); 
                      }

                //deferred.reject("Error: request returned status " + status); 
          });
          return deferred.promise;

      };


      return {
        loadDataFromUrls: function(urls) {
         
          var deferred = $q.defer();
          var urlCalls = [];
         
          //var theurl = urls[0];

           angular.forEach(urls, function(url) {
            urlCalls.push(

              fetchHttp(url)

              );

           });

          var resultStr = '';
          $q.all(urlCalls)
          .then(
            function(results) {

            console.log("success");
            var _a = articleFormatter.merge(results);
            deferred.resolve(_a);

            
          }, function(reason) {

            console.log("fail");

  // error: handle the error if possible and
  //        resolve promiseB with newPromiseOrValue,
  //        otherwise forward the rejection to promiseB
         // if (canHandle(reason)) {
        // handle the error and recover
        //  return newPromiseOrValue;
      //}

             // return deferred.resolve(_a);

             return $q.reject(reason);
            }
        );
          return deferred.promise;
        }
      };
    }



phonecatServices.constant('ArticlesCtrlResolve', {
  Articles: function(asyncService) {
     // var urls = ["https://s3-us-west-1.amazonaws.com/data.hotoppy.com/rottentomatoes/7.json"]
   // var urls = ["http://api.github.com/gists"];
   // var urls = ["http://www.inorthwind.com/Service1.svc/getAllCustomers"];

   //var urls = ["file:///Users/pro001/Desktop/Dev/Learning/tests/angular/angular-seed/app/phones/rottentomatoes/789.json"];
  //  var urls = ["app/phones/rottentomatoes/789.json"];
      var d1 = new Date();
      // d1.toUTCString();
      //var time = parseInt(Math.floor(d1.getTime()/ 1000000), 10);

      //30 minutes intervals
      var durationMins = 30;

      var time = parseInt(d1.getTime()/60/1000/durationMins);
      var base = "http://d2invxie986h3w.cloudfront.net";
    //var base = "http://data.hotoppy.com";
    //var base = "http://s3-us-west-1.amazonaws.com/data.hotoppy.com";

    //BUG:if the return data is low. The page may not loaded. Reproduce: allow only one request to return successfully. Content will not be displayed.

    var publications = ["nytimes",
                        "guardian",
                        "atlantic",
                        "nydailynews",
                        "youtube",
                        "hulu", 
                        "wired", 
                        "bloomberg", 
                        "techcrunch", 
                        "wsj", 
                        "amzbooks",
                         "people", 
                        "rtomatoes", 
                        "billboard"  ];

    var urls = [];
    var pubLen = publications.length;
    for (var c = 0; c < pubLen; c++ ){

    //var time = 789803
    //var time =  789966
    // var time = 789907
     var theU = base + '/' + publications[c] + '/' + time + '.json';
      console.log(theU);
      urls.push(theU);
    }

    return asyncService.loadDataFromUrls(urls);
  }
})
.factory('tagSortCriteria',function() {

  //http://ejohn.org/blog/javascript-getters-and-setters/
	  var SCORE = 'score';
  	var POP = 'numComments';
  	var PUB = 'pub';
  	var TYPE = 'tag';
  	var AGE = 'age';
    var query = {
        selectedId: -1,
        mode: AGE,
        reverse: true,
        positions:{start:-1, end:-1}
      };
    

    function setQueryOrResetToAge(msg, MODE ){
	
    //if same selection string and same mode as the previous records trigger reset mode
    // else set the mode

      var didChangeMode = query.mode != MODE;
      if(query.mode === undefined || MODE === undefined){
          query.mode = AGE;

          return;
      }else if ( didChangeMode){

          query.mode = MODE.toString();
          query.reverse = true;
        return;  
      }else {

        query.reverse = !query.reverse;
      }
      
    	//query.mode = (query.mode === undefined || MODE === undefined) ? AGE: MODE.toString();
    	console.log('Query.Mode: ', query.mode);
      

      //query.reverse = (query.mode === TYPE || query.mode === PUB) ? false: !query.reverse;

    	
    };


    return {
      popMode:function(msg){
      	setQueryOrResetToAge(msg,POP);
      },
      scoreMode:function(msg){
        setQueryOrResetToAge(msg,SCORE);
      },      
      ageMode:function(msg){
      	setQueryOrResetToAge(msg,AGE);
      },
      pubMode:function(msg){
		setQueryOrResetToAge(msg,PUB);
      },
      typeMode:function(msg){
      	setQueryOrResetToAge(msg,TYPE);
      },
      query:function(){
      	console.log(' 1 query positions start: ', query.positions.start, query.positions.end, 'queryMode: ', query.mode);
        //WARNING: change to private object and replace this with getter functions
      	return query;
      },
      setPositions:function(positions){

      	if(positions.start > -2 === false || positions.end > -2 === false) {
			console.log('WARNING: start/end positions must be bigger than -2');

			//trigger error;
      		return;
      	}
      	if (positions.end < positions.start){
      		console.log('WARNING: start position must be smaller than end position');
      		//trigger error;
      		return; 
      	}

      	  //!isNaN(parseInt(value, 10)) //should check integers /string?
      	  
      	 query.positions.start = positions.start;
      	 query.positions.end = positions.end;

      	 console.log(' 2 query positions start: ', query.positions.start, query.positions.end);
      	 //query.positions.end = end;
      	 return query.positions;
      },
      getPositions:function(){
      	console.log(' 3 query positions start: ', query.positions.start, query.positions.end);
      	return query.positions;
      },
      POP:function(){
      	return POP;
      },
      AGE:function(){
      	return AGE;
      },
      PUB:function(){
      	return PUB;
      },
      SCORE:function(){
        return SCORE;
      },      
      TYPE:function(){
      	return TYPE;
      },
      setSelectedId:function(index){
       	if(index < 0){ 
       		console.log('WARNING: trigger an error, selected index cannot be n < 0');
       		//return; //Error: trigger an error

       	}   
       	query.selectedId = index;

      	return query.selectedId;
      },
       getSelectedId:function(){
      	return query.selectedId;
      },
       setQueryReverse:function(reverse){
      	query.reverse = reverse;
      },       
        setQueryMode:function(mode){
      	query.mode = mode;
      }

    }; //return

  }) //factory
   
.factory('data',function() {
//['$filter', 'data','tagSortCriteria', function($filter, data,tagSortCriteria)
	var initData = false;
    // var friends = [
    //   { nam: '1John',    phone: '555-1212',    age: 10,		msg:'hello john',	pub:'NYT',		type:'Life',			pop:4},
    //   { nam: '2Mary',    phone: '555-9876',    age: 70,		msg:'hello john',	pub:'GDN',		type:'Politics',		pop:95 },
    //   { nam: '3Mike',    phone: '555-4321',    age: 1,		msg:'hello john',	pub:'WAPOST',	type:'Entertainment',	pop:105 },
    //   { nam: '8Adam1',    phone: '555-5678',    age: 60,   msg:'hello john1',  pub:'GDN',    type:'Health',      pop:85 }
    // ];

    var friends;

     var jsonData = (function(){
     	return {
     		get:function(){

     			return friends;
     		},

     		set: function (dataArray){
			     for (var i = 0, len = dataArray.length; i < len; i++) {
					   dataArray[i].id = i;
             console.log('Added: ' + i);
		        	 //lookup[array[i].id] = array[i];
				    }
				return dataArray;
        // set: function (dataArray){
        //    for (var i = 0, len = dataArray.length; i < len; i++) {
        //      dataArray[i].id = i;
        //      console.log('Added: ' + i);
        //        //lookup[array[i].id] = array[i];
        //     }
        // return dataArray;

		    }
     	};
     }());

    return {
      friends:function(_friends){
          console.log('about to call _friends');
      	 if(Object.prototype.toString.call(_friends) === '[object Array]' && _friends.length > 0 && initData === false){
      	 	
      	 	initData = true;
          console.log('try to add id to each object');
          // calling different assets
          // if all the reuqest are done
          // return call jsonDate.set(friends)
          
      	 	return jsonData.set(_friends);

      	 }else{

      	 	 return jsonData.get();
      	 }
      },
      setFriends:function(_friends){
      	console.log('setting friends');
        friends = _friends;
   
      }
    };

  })


.factory('articleFormatter', articleFormatterFunc)
.factory('asyncService',['$resource', '$q', '$http', 'articleFormatter', 'data', asyncServiceFunc])

.factory('tagSorterController', ['$filter', 'data','tagSortCriteria', tagSorterControllerFunc ]);
