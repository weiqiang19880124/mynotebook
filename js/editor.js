angular.module('App')
.controller('EditController',function ($scope,$http) {
    $scope.editing = true;
    $http.get('/notes')
        .success(function (data) {  //$http.get()加载笔记
            console.log(data,'111')
            $scope.notes = data; //返回数据赋值给$scope.notes
        })
        .error(function (err) {
            $scope.error = '无法加载笔记';
        });
    $scope.view = function (index) {
        $scope.editing = false;
        $scope.content = $scope.notes[index];
    };
    $scope.create = function () {
        $scope.editing = true;
        $scope.content ={
            title: '',
            content : ''
        };
    };
    $scope.save = function () {
        $scope.content.date = new Date();
        if ($scope.content.id) {
          $http.put('/notes/' + $scope.content.id, $scope.content).success(function (data) {
              $scope.editing = false;
           }).error(function (err) {
                $scope.error = 'Could not upate note';
            });
        } else {
         $scope.content.id = Date.now();
         $http.post('/notes', $scope.content).success(function (data) {
              $scope.notes.push($scope.content);
              $scope.editing = false;
          }).error(function (err) {
               $scope.error = 'Could not create note';
           });
         }
    };
    $scope.remove = function () {
        var found = -1;
        $http.delete('/notes/'+$scope.content.id).success(function () {
            angular.forEach($scope.notes,function(note,index){
                if (note.id === $scope.content.id){
                    found = index;
                }
            });
            if (found >=0){
                $scope.notes.splice(found, 1);
            }
            $scope.content = {
                title:'',
                content:''
            }
        }).error(function () {
            $scope.error = '无法删除该条笔记';
        })
    };
});
// $scope.create = function () {
//     $scope.editing = true;
//     $scope.content = {
//         title: '',
//         content: ''
//     };
// };
//
// $scope.save = function () {
//     $scope.content.date = new Date();
//     if ($scope.content.id) {
//         $http.put('/notes/' + $scope.content.id, $scope.content).success(function (data) {
//             $scope.editing = false;
//         }).error(function (err) {
//             $scope.error = 'Could not upate note';
//         });
//     } else {
//         $scope.content.id = Date.now();
//         $http.post('/notes', $scope.content).success(function (data) {
//             $scope.notes.push($scope.content);
//             $scope.editing = false;
//         }).error(function (err) {
//             $scope.error = 'Could not create note';
//         });
//     }
// };
//
// $scope.remove = function () {
//     $http.delete('/notes/' + $scope.content.id).success(function (data) {
//         var found = -1;
//         angular.forEach($scope.notes, function (note, index) {
//             if (note.id === $scope.content.id) {
//                 found = index;
//             }
//         });
//         if (found >= 0) {
//             $scope.notes.splice(found, 1);
//         }
//         $scope.content = {
//             title: '',
//             content: ''
//         };
//     }).error(function (err) {
//         $scope.error = 'Could not delete note';
//     });
// };
//
// $http.get('/notes')
//     .success(function (data) {  //$http.get()加载笔记
//         $scope.notes = data; //返回数据赋值给$scope.notes
//     })
//     .error(function (err) {
//         $scope.error = '无法加载笔记';
//     });
//
// });