appControllers.controller('RessourceCtrl', ['$scope','$location', '$window', 'ProjetService', '$routeParams', 'notify',
  function($scope,$location, $window, ProjetService, $routeParams, notify) {
    $scope.email = ""
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
          $scope.sprints.push(data.data);
          var l = $scope.sprints.length;
          $scope.select_sprint(l - 1);
          $("#myModal").modal('hide')
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

      $scope.assign_task = function (t) {
        SprintService.assign_task(t._id, t.assignee).error(function(data) {
          angular.forEach(data.data, function(error) {
            notify({
              message: error,
              classes: 'alert-danger',
              duration: 2000,
            });
          });
        });
      }

    }
  ]
);

appControllers.controller('MainCtrl', ['$scope','$location', '$window', '$routeParams',
  function($scope,$location, $window, $routeParams) {
    $scope.logout = function() {
      if ($window.sessionStorage.token)
        delete $window.sessionStorage.token;
      $window.location.href = options.site_url;
    };
    var loc_path = $location.path();
    console.log($routeParams.id);

    $scope.getClass = function (path) {
      if ($location.path().substr(0, path.length) === path) {
        return 'active';
      } else {
        return '';
      }
    };

  }
]);
