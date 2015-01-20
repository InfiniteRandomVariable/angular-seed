'use strict';

/* Directives */

var phonecatDirectives = angular.module('phonecatDirectives', []);

phonecatDirectives.directive('contactCard',['tagSorterController',function(tagSorterController){

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
				scope.clickScore = function(index){

					console.log('click in the link function', index);
					//dataController.cleanFriends(index);
					tagSorterController.setScore(index);
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
.directive('scrollup', ['tagSortCriteria', function($document, tagSortCriteria) {
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

