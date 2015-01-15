'use strict';

// Declare app level module which depends on views, and components

//
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.controller('dataController',['$scope','data','tagSorterController', '$location','$anchorScroll','tagSortCriteria', function($scope,data,tagSorterController,$location,$anchorScroll, tagSortCriteria){
				
				$scope.friends = data.friends();
			     $scope.scrollTo = function(id) {
			     	var positions = tagSortCriteria.getPositions();
					console.log('move to positions', positions.start);
   					(positions.start > -1)?$location.hash(positions.start):$location.hash(0);
     				$anchorScroll();
   				}

//inject only the 
				this.cleanFriends = function(index){
					console.log('data controller cleanFriends');
					//tagSorterController.sorter();
						//$scope.friends = [{ name: 'John',    phone: '555-1212',    age: 10,		msg:'hello john',	pub:'NYT',		type:'Life',			pop:4}];
					//tagSorterController.sorter(index);
					$scope.friends = data.friends();
					//var positions = tagSortCriteria.getPositions();
					//console.log('positions', positions.start);

				};

}])
.directive('contactCard',['tagSorterController',function(tagSorterController){

		return{
			restrict: 'AE',
			//controller: 'messageController',
			//require:['^dataController'],
			controller: 'dataController',
			//controller: 'tagSorterController',
			templateUrl:"partials/contactCard.html",
			link: function(scope, element, attrs, dataController){

				scope.clickAge = function(index){

					console.log('click in the link function', index);
					//dataController.cleanFriends(index);
					tagSorterController.setAge(index);
					tagSorterController.sorter(index);
					dataController.cleanFriends(index);
				};

				scope.clickPop = function(index){

					console.log('click in the link function', index);
					//dataController.cleanFriends(index);
					tagSorterController.setPop(index);
					tagSorterController.sorter(index);
					dataController.cleanFriends(index);

				};


				scope.clickPub = function(index){

					console.log('click in the link function', index);
					//dataController.cleanFriends(index);
					tagSorterController.setPub(index);
					tagSorterController.sorter(index);
					dataController.cleanFriends(index);
				};


				scope.clickType = function(index){

					console.log('click in the link function', index);
					//dataController.cleanFriends(index);
					tagSorterController.setType(index);
					tagSorterController.sorter(index);
					dataController.cleanFriends(index);
				};



				//messageController.init();
				//dataaController.friends();
				// element.thefriends = {};
				// attrs.thefriends = {};
				// dataController.friends = {};


				//scope.i = 'HELLO';
			//	scope.friends = dataController.friends;

				//console.log('Data length;', scope.friends);

				//element.click(function(){

					//var msg =message.popMode('Hello there');
				//	alert('ooh yeah! ' + msg.mode);
					//console.log('hello');
					
				//});
			}

		};
	}])
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


    	 //var searchObj = tagSorterControllerfindObjectsByAttribute.get(sortedParentArray,query.selectedId);
     //           		var searchStr = searchObj[query.mode];

     //           		console.log('SearchStr: ' + searchStr);




    	//query.selectedId = (msg > -1)? msg:-1;

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

    };

  })
.factory('data', function() {

	var initData = false;
    var friends = [
      { name: 'John',    phone: '555-1212',    age: 10,		msg:'hello john',	pub:'NYT',		type:'Life',			pop:4},
      { name: 'Mary',    phone: '555-9876',    age: 59,		msg:'hello john',	pub:'GDN',		type:'Politics',		pop:95 },
      { name: 'Mike',    phone: '555-4321',    age: 1,		msg:'hello john',	pub:'WAPOST',	type:'Entertainment',	pop:105 },
      { name: 'Adam',    phone: '555-5678',    age: 35,		msg:'hello john',	pub:'GDN',		type:'Sports',			pop:65 },
      { name: 'Mary1',    phone: '555-9876',    age: 19,		msg:'hello john1',	pub:'GDN',		type:'Politics',		pop:95 },
      { name: 'Mike1',    phone: '555-4321',    age: 21,		msg:'hello john1',	pub:'WAPOST',	type:'Entertainment',	pop:5 },
      { name: 'Adam1',    phone: '555-5678',    age: 5,		msg:'hello john1',	pub:'GDN',		type:'Sports',			pop:25 },
       { name: 'Adam1',    phone: '555-5678',    age: 15,		msg:'hello john1',	pub:'GDN',		type:'Sports',			pop:85 },
      { name: 'Julie1',   phone: '555-8765',    age: 29,		msg:'hello john1',	pub:'HUNT',		type:'Business',		pop:15 }
    ];

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
	
}]).directive('scrollup', ['tagSortCriteria', function($document, tagSortCriteria) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
            	    
                elm.bind("click", function () {
                	console.log('scroll up 2');
                	var query = tagSortCriteria.query();
                	var el;
                	console.log('scroll to id:', query.positions.start);

                	if(query.mode === tagSortCriteria.POP() || query.mode === tagSortCriteria.AGE()){
                		//scroll to top
                		el  = document.getElementById('topsection');
                	}else {
                     	el = document.getElementById(query.positions.start);
                	}

                	//if an element is found, scroll to the element
                	if(el)el.scrollIntoView(); 
            			
                    // Maybe abstract this out in an animation service:
                    // Ofcourse you can replace all this with the jQ 
                    // syntax you have above if you are using jQ
                    function scrollToTop(element, to, duration) {
                        if (duration < 0) return;
                        var difference = to - element.scrollTop;
                        var perTick = difference / duration * 10;

                        setTimeout(function () {
                            element.scrollTop = element.scrollTop + perTick;
                            scrollToTop(element, to, duration - 10);
                        }, 10);
                    }



                    // then just add dependency and call it
                    //scrollToTop($document[0].body, 0, 400);

                });
            }
        };
}]);



