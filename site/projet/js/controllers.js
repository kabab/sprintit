appControllers.controller('RessourceCtrl', ['$scope','$location', '$window', 'ProjetService', '$routeParams', 'notify',
  function($scope,$location, $window, ProjetService, $routeParams, notify) {
    $scope.email = "";
    $scope.projet = {};
    $scope.projet_id = $routeParams.id;

    $scope.add_ressource = function() {
      ProjetService.add_ressource($scope.projet_id, $scope.email)
      .success(function(data) {
        if (!data.error) {
          $scope.projet.contributeurs.push(data.data);
        } else {
          angular.forEach(data.data, function(error) {
            notify({
              message: error,
              classes: 'alert-danger',
              duration: 2000,
            });
          });
        }
      });
    }

    $scope.del_ressource = function(i) {
      var u_id = $scope.projet.contributeurs[i]._id;
      ProjetService.delete_ressource($scope.projet_id, u_id)
      .success(function(data) {
        if (!data.error) {
          $scope.projet.contributeurs.splice(i, 1);
        } else {
          angular.forEach(data.data, function(error) {
            notify({
              message: error,
              classes: 'alert-danger',
              duration: 2000,
            });
          });
        }
      });
    }

    ProjetService.findone($scope.projet_id).success(function(data) {
      $scope.projet = data.data;
    });
  }
]);

appControllers.controller('SprintCtrl', ['$scope','$location', '$window', 'SprintService', '$routeParams', '$route', 'ProjetService',
    function ($scope, $location, $window, SprintService, $routeParams, $route, ProjetService) {
      $scope.sprints = {};
      $scope.nsprint = {};
      $scope.sprint = {};
      $scope.ntache = {};
      $scope.projet = {};

      $scope.projet_id = $routeParams.id;
      $scope.selected_sprint = -1;

      ProjetService.findone($scope.projet_id).success(function(data) {
        $scope.projet = data.data;
      });

      SprintService.find($routeParams.id).success(function(data) {
        $scope.sprints = data.data;
        var l = $scope.sprints.length;
        $scope.select_sprint(l - 1);
      });

      $scope.select_sprint = function(i) {
        $scope.sprint = $scope.sprints[i];
        if($scope.selected_sprint >= 0)
          $scope.sprints[$scope.selected_sprint].active = false;
        $scope.sprints[i].active = true;
        $scope.selected_sprint = i;
        if (i == $scope.sprints.length - 1)
          $scope.sprint.last = true;
        else
          $scope.sprint.last = false;
        var taches = $scope.sprint.taches;
        var tasks = [];
        console.log($scope.sprint);
        var tache0 = {
          name: "Sprint",
          values: [{from:$scope.sprint.date_debut, to: $scope.sprint.date_fin}],
        };

        tasks.push(tache0);
        for (var i = 0; i < taches.length; i++) {
          taches[i].name = taches[i].titre;
          taches[i].desc = taches[i].description;
          var date_fin = new Date(taches[i].date_debut);
          var date_debut = new Date(taches[i].date_debut);
          var dure = parseInt(taches[i].dure);
          date_fin.setDate(date_debut.getDate() + dure);
          taches[i].values = [{from:date_debut, to: date_fin}];
          tasks.push(taches[i]);
        }

        setTimeout(function() {
          $(".gantt").gantt({
            source: tasks,
            scale: "days",
            minScale: "days",
            maxScale: "months",
            onItemClick: function(data) {
              alert("Item clicked - show some details");
            },
            onAddClick: function(dt, rowId) {
              alert("Empty space clicked - add an item!");
            },
            onRender: function() {
              console.log("chart rendered");
            }
          });
        }, 0)

      };

      $scope.add_task = function() {
        console.log($scope.ntache);
        var sprint_id = $scope.sprints[$scope.selected_sprint]._id;
        SprintService.add_task(sprint_id, $scope.ntache).success(function(data) {
          $scope.sprints[$scope.selected_sprint].taches.push(data.data);
          $("#myModal2").modal('hide');
          window.location.reload();
        }).error(function(data) {
          angular.forEach(data.data, function(error) {
            notify({
              message: error,
              classes: 'alert-danger',
              duration: 2000,
            });
          });
        });
      }

      $scope.add_sprint = function() {
        SprintService.add($routeParams.id, $scope.nsprint).success(function(data) {
          if (!data.error) {
            $scope.sprints.push(data.data);
            var l = $scope.sprints.length;
            $scope.select_sprint(l - 1);
            $("#myModal").modal('hide')
          } else {
            angular.forEach(data.data, function(error) {
              notify({
                message: error,
                classes: 'alert-danger',
                duration: 2000,
              });
            });
          }
        }).error(function(data) {
          notify({
            message: 'Server error',
            classes: 'alert-danger',
            duration: 2000,
          });
        });

      }

      $scope.assign_task = function (t) {
        SprintService.assign_task(t._id, t.assignee).success(function(data) {
          if (data.error) {
            angular.forEach(data.data, function(error) {
              notify({
                message: error,
                classes: 'alert-danger',
                duration: 2000,
              });
            });
          }
        });
      }

    }
  ]
);

appControllers.controller('PostItCtrl', ['$scope','$location', '$window', 'PostItService', '$routeParams', '$route', 'ProjetService',
    function ($scope, $location, $window, PostItService, $routeParams, $route, ProjetService) {
      $scope.postits = {};
      $scope.postit = {};

      $scope.projet_id = $routeParams.id;
      $scope.selected_postit = -1;

      ProjetService.findone($scope.projet_id).success(function(data) {
        $scope.projet = data.data;
      });

      PostItService.find($routeParams.id).success(function(data) {
        $scope.postits = data.data;
        var l = $scope.postits.length;
        $scope.select_postit(l - 1);
      });

      $scope.add_postit = function() {
        PostItService.add($routeParams.id, $scope.postit).success(function(data) {
          if (!data.error) {
            $scope.postits.push(data.data);
            var l = $scope.postits.length;
            $scope.select_postit(l - 1);
            $("#myModalPost").modal('hide');
          } else {
            angular.forEach(data.data, function(error) {
              notify({
                message: error,
                classes: 'alert-danger',
                duration: 2000,
              });
            });
          }
        }).error(function(data) {
          notify({
            message: 'Server error',
            classes: 'alert-danger',
            duration: 2000,
          });
        });
      }

      $scope.del_postit = function(i) {
        var p_id = $scope.postits[i]._id;
        PostItService.delete(p_id)
        .success(function(data) {
          if (!data.error) {
            $scope.postits.splice(i, 1);
          } else {
            angular.forEach(data.data, function(error) {
              notify({
                message: error,
                classes: 'alert-danger',
                duration: 2000,
              });
            });
          }
        });
      }

    }
  ]
);

appControllers.controller('MainCtrl', ['$scope','$location', '$window', '$routeParams', 'MenuService', 'MenuService',
  function($scope,$location, $window, $routeParams, MenuService) {
    $scope.logout = function() {
      if ($window.sessionStorage.token)
        delete $window.sessionStorage.token;
      $window.location.href = options.site_url;
    };

    $scope.get_id = function() {
      var reg = /[a-z0-9]{10,}/;
      var a = $location.path();
      return a.match(reg).length > 0 ? a.match(reg)[0]:"..";
    }

    $scope.setElement = MenuService.setElement;
    $scope.getElement = MenuService.getElement;
    $scope.isSelected = MenuService.isSelected;

  }
]);

appControllers.controller('TodoCtrl', ['$scope','$location', '$window', '$routeParams', 'SprintService', 'notify',
  function($scope,$location, $window, $routeParams, SprintService, notify) {
    // $scope.list1 = $scope.rawScreens[0];
    // $scope.list2 = $scope.rawScreens[1];

    $scope.tasks = [];

    $scope.projet_id = $routeParams.id;
    SprintService.user_tasks($routeParams.id).success(function(data) {
      console.log(data);
      if (data.error) {
        angular.forEach(data.data, function(error) {
          notify({
            message: error,
            classes: 'alert-danger',
            duration: 2000,
          });
        });
      } else {
        $scope.tasks = data.data;
      }
    });


    $scope.sortableOptions = {
     placeholder: "app",
     connectWith: ".todo-list",
     update: function(event, ui) {
       var order = {todo: 0, doing: 1, done: 2};
       if (!ui.sender) {
         var target_id = ui.item[0].parentElement.id;
         var source_id = event.target.id;
         var task_id = ui.item[0].getAttribute('data-id');

         if (order[source_id] > order[target_id] ) {
           return false;
         } else {
           SprintService.task_state(task_id, target_id);
         }
       }
     }
    };
  }
]);
