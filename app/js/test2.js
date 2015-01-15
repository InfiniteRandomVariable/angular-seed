function SettingsController($scope) {
    $scope.obj = {
    value1: 'somevalue',
    value2: false
    }
    
    $scope.checkValue1 = function() {
        return $scope.obj.value1 === 'someothervalue';
    }
    $scope.checkValue3 = function(value) {
        //return value === 5;
        return $scope.obj.value1 === 'somevalue';
    }
};



