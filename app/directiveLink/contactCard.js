angular.module('app.directives.contactCard', [])
	.directive('contactCard',function(){

		return{
			restrict: 'AE',
			scope:{
				friend:'='
				
			},
			templateUrl:"contactCard.html",
			link: function(scope, element, attrs){
				element.click(function(){

					alert('ooh yeah!');
					//console.log('hello');
					
				});
			},
			controller: function($scope){

				alert('hello');
				//console.log($scope.friend);
				//console.log($scope.test);
			}



		};


	});