'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices

.constant('ArticlesCtrlResolve', {
  Articles: function(asyncService) {
     // var urls = ["https://s3-us-west-1.amazonaws.com/data.hotoppy.com/rottentomatoes/7.json"]
   // var urls = ["http://api.github.com/gists"];
   // var urls = ["http://www.inorthwind.com/Service1.svc/getAllCustomers"];

    //var urls = ["/app/phones/rottentomatoes/789.json"]
     var urls = ["http://s3-us-west-1.amazonaws.com/data.hotoppy.com/rottentomatoes/789.json"];
    return asyncService.loadDataFromUrls(urls);
  }
})
.factory('tagSortCriteria',function() {
	
  	var POP = 'pop';
  	var PUB = 'pub';
  	var TYPE = 'type';
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

    	query.mode = (query.mode === undefined || MODE === undefined) ? AGE: MODE.toString();
    	console.log('Query.Mode: ', query.mode);
      query.reverse = (query.mode === TYPE || query.mode === PUB) ? false: !query.reverse;

    	
    };


    return {
      popMode:function(msg){
      	setQueryOrResetToAge(msg,POP);
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

.factory('data', function() {

	var initData = false;
    var friends = [
      { name: '1John',    phone: '555-1212',    age: 10,		msg:'hello john',	pub:'NYT',		type:'Life',			pop:4},
      { name: '2Mary',    phone: '555-9876',    age: 70,		msg:'hello john',	pub:'GDN',		type:'Politics',		pop:95 },
      { name: '3Mike',    phone: '555-4321',    age: 1,		msg:'hello john',	pub:'WAPOST',	type:'Entertainment',	pop:105 },
      { name: '8Adam1',    phone: '555-5678',    age: 60,   msg:'hello john1',  pub:'GDN',    type:'Health',      pop:85 }
    ];


    //     var friends = [
    //   { name: '1John',    phone: '555-1212',    age: 10,    msg:'hello john', pub:'NYT',    type:'Life',      pop:4},
    //   { name: '2Mary',    phone: '555-9876',    age: 70,    msg:'hello john', pub:'GDN',    type:'Politics',    pop:95 },
    //   { name: '3Mike',    phone: '555-4321',    age: 1,   msg:'hello john', pub:'WAPOST', type:'Entertainment', pop:105 },
    //   { name: '4Adam',    phone: '555-5678',    age: 24,    msg:'hello john', pub:'Times',    type:'Sports',      pop:65 },
    //   { name: '5Mary1',    phone: '555-9876',    age: 37,   msg:'hello john1',  pub:'GDN',    type:'Politics',    pop:95 },
    //   { name: '6Mike1',    phone: '555-4321',    age: 3,    msg:'hello john1',  pub:'WAPOST', type:'Finance', pop:5 },
    //   { name: '7Adam1',    phone: '555-5678',    age: 9,    msg:'hello john1',  pub:'JJ',   type:'News',      pop:25 },
    //   { name: '8Adam1',    phone: '555-5678',    age: 60,   msg:'hello john1',  pub:'GDN',    type:'Health',      pop:85 },
    //   { name: '9Mary',    phone: '555-9876',    age: 20,    msg:'hello john', pub:'GDN',    type:'Politics',    pop:95 },
    //   { name: '10Mike',    phone: '555-4321',    age: 7,    msg:'hello john', pub:'WAPOST', type:'Entertainment', pop:105 },
    //   { name: '11Adam',    phone: '555-5678',    age: 73,   msg:'hello john', pub:'HUNT',   type:'Sports',      pop:65 },
    //   { name: '12Mary1',    phone: '555-9876',    age: 103,   msg:'hello john1',  pub:'Times',    type:'Politics',    pop:95 },
    //   { name: '13Mike1',    phone: '555-4321',    age: 40,    msg:'hello john1',  pub:'WAPOST', type:'Finance', pop:5 },
    //   { name: '14Adam1',    phone: '555-5678',    age: 13,    msg:'hello john1',  pub:'GDN',    type:'Health',      pop:25 },
    //   { name: '15Adam1',    phone: '555-5678',    age: 15,    msg:'hello john1',  pub:'JJ',   type:'Life',      pop:85 },
    //   { name: '16Mary',    phone: '555-9876',    age: 93,   msg:'hello john', pub:'GDN',    type:'Politics',    pop:95 },
    //   { name: '17Mike',    phone: '555-4321',    age: 8,    msg:'hello john', pub:'WAPOST', type:'Business',  pop:105 },
    //   { name: '18Adam',    phone: '555-5678',    age: 63,   msg:'hello john', pub:'Times',    type:'Sports',      pop:65 },
    //   { name: '19Mary1',    phone: '555-9876',    age: 42,    msg:'hello john1',  pub:'GDN',    type:'Politics',    pop:95 },
    //   { name: '20Mike1',    phone: '555-4321',    age: 39,    msg:'hello john1',  pub:'HUNT', type:'Business',  pop:5 },
    //   { name: '21Adam1',    phone: '555-5678',    age: 56,    msg:'hello john1',  pub:'GDN',    type:'Finance',     pop:25 },
    //   { name: '22Adam1',    phone: '555-5678',    age: 88,    msg:'hello john1',  pub:'JJ',   type:'Sports',      pop:85 },
    //   { name: '23Mary',    phone: '555-9876',    age: 84,   msg:'hello john', pub:'GDN',    type:'Politics',    pop:95 },
    //   { name: '24Mike',    phone: '555-4321',    age: 75,   msg:'hello john', pub:'WAPOST', type:'Entertainment', pop:105 },
    //   { name: '25Adam',    phone: '555-5678',    age: 61,   msg:'hello john', pub:'GDN',    type:'Sports',      pop:65 },
    //   { name: '26Mary1',    phone: '555-9876',    age: 93,    msg:'hello john1',  pub:'JJ',   type:'Politics',    pop:95 },
    //   { name: '27Mike1',    phone: '555-4321',    age: 27,    msg:'hello john1',  pub:'WAPOST', type:'Health',  pop:5 },
    //   { name: '28Adam1',    phone: '555-5678',    age: 120,   msg:'hello john1',  pub:'GDN',    type:'Finance',     pop:25 },
    //   { name: '29Adam1',    phone: '555-5678',    age: 36,    msg:'hello john1',  pub:'GDN',    type:'Health',      pop:85 },
    //   { name: '30Mary',    phone: '555-9876',    age: 50,   msg:'hello john', pub:'GDN',    type:'Politics',    pop:95 },
    //   { name: '31Mike',    phone: '555-4321',    age: 80,   msg:'hello john', pub:'HUNT', type:'Entertainment', pop:105 },
    //   { name: '32Adam',    phone: '555-5678',    age: 90,   msg:'hello john', pub:'GDN',    type:'Health',      pop:65 },
    //   { name: '33Mary1',    phone: '555-9876',    age: 100,   msg:'hello john1',  pub:'Times',    type:'Finance',   pop:95 },
    //   { name: '34Mike1',    phone: '555-4321',    age: 89,    msg:'hello john1',  pub:'WAPOST', type:'Entertainment', pop:5 },
    //   { name: '35Adam1',    phone: '555-5678',    age: 5,   msg:'hello john1',  pub:'GDN',    type:'Finance',     pop:25 },
    //   { name: '36Adam1',    phone: '555-5678',    age: 15,    msg:'hello john1',  pub:'Times',    type:'Sports',      pop:85 },
    //   { name: '37Julie1',   phone: '555-8765',    age: 29,    msg:'hello john1',  pub:'HUNT',   type:'Business',    pop:15 }
    // ];


     var jsonData = (function(){
     	return {
     		get:function(){

     			return friends;
     		},

     		set: function (dataArray){
			     for (var i = 0, len = dataArray.length; i < len; i++) {
					   dataArray[i].id = i;
		        	 //lookup[array[i].id] = array[i];
				    }
				return dataArray;
		    }
     	};
     }());

    return {
      friends:function(){
      	 if(initData === false){
      	 	
      	 	initData = true;
          // calling different assets
          // if all the reuqest are done
          // return call jsonDate.set(friends)


      	 	return jsonData.set(friends);
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


.factory('asyncService',['$resource', '$q', '$http', function ($resource, $q, $http) {
      return {
        loadDataFromUrls: function(urls) {
         
          var deferred = $q.defer();
          var urlCalls = [];
          //var theurl = urls[0];



           angular.forEach(urls, function(url) {
            urlCalls.push($http.get(url));

           });

          var resultStr = '';
          $q.all(urlCalls)
          .then(
            function(results) {

            var resL = results.length;
            for(var c = 0; c < resL; c++){

              var obj = results[c];
              var oData = obj.data;


              var arrayLength = oData.rottentomatoes.length;
              for (var i = 0; i < arrayLength; i++) {
                 alert(c + ' URL:' + oData.rottentomatoes[i].url);
                //Do something
              }
            }

            deferred.resolve(results) 
          }, function(reason) {
  // error: handle the error if possible and
  //        resolve promiseB with newPromiseOrValue,
  //        otherwise forward the rejection to promiseB
         // if (canHandle(reason)) {
        // handle the error and recover
        //  return newPromiseOrValue;
      //}
                alert('reason: ' + reason.toString());
              return $q.reject(reason);
            }
        );
          return deferred.promise;
        }
      };
    }])

.factory('tagSorterController', ['$filter', 'data','tagSortCriteria', function($filter, data,tagSortCriteria){
	
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



				if(searchStr === prevSearchStr ){
		    		
		    		tagSortCriteria.setSelectedId(-1);

		    		if(query.mode === tagSortCriteria.POP() || query.mode === tagSortCriteria.AGE()){
		    			tagSortCriteria.setQueryReverse(!query.reverse);

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
			
			findMatchingValuePositions.set(sortedParentArray, searchStr);

			if(query.mode != tagSortCriteria.POP() && query.mode != tagSortCriteria.AGE()){

							

							var positions = tagSortCriteria.getPositions();
							//var positions = tagSortCriteria.getPositions();
							console.log('positions: start', positions.start);
							//console.log("START###########################################START");
							//console.log('Start: ' + positions.start + ' MODE: ' + query.mode + ' pop string: ' + tagSortCriteria.POP());
							//console.log('End(+1): ' + positions.end);
							//console.log("START###########################################START");
							//sortedParentArray.slice(positions.start, positions.end);
							
							//printEachVariables(sortedParentArray);
							//console.log("SPA###########################################SPA");
							//console.log("SPA###########################################SPA");

							//NOTICE: code for the matching item to be the top of the array
							//var matchedValuesArray = sortedParentArray.splice(positions.start, positions.end - positions.start);
							//var MVA = matchedValuesArray.concat(sortedParentArray);
							//console.log('SIZE', MVA.length);
							//data.setFriends(MVA);
							data.setFriends(sortedParentArray);

			}else{ //POP or AGE Mode

				data.setFriends(sortedParentArray);
			}

		 //console.log("Results: " + results[0].age.toString());
		// return data.friends();
		}
	};
	
}]);
