appControllers.controller('RessourceCtrl', ['$scope','$location', '$window', 'ProjetService', '$routeParams',
  function($scope,$location, $window, ProjetService, $routeParams) {
    $scope.email = ""
    $scope.projet = {};
    $scope.projet_id = $routeParams.id;

    $scope.add_ressource = function() {
      ProjetService.add_ressource($scope.projet_id, $scope.email)
      .success(function(data) {
        if (!data.error) {
          $scope.projet.contributeurs.push(data.data);
        } else {
          console.log(data.data);
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
          console.log(data.data);
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

      ProjetService.findone($scope.projet_id).success(function(data) {
        console.log(data.data);
        $scope.projet = data.data;
      });
      $scope.selected_sprint = -1;

      SprintService.find($routeParams.id).success(function(data) {
        $scope.sprints = data.data;
        var l = $scope.sprints.length;
        $scope.select_sprint(l - 1);

      });

      $scope.select_sprint = function(i) {
        $scope.sprint = $scope.sprints[i];
        console.log($scope.sprint.taches);
        if($scope.selected_sprint >= 0)
          $scope.sprints[$scope.selected_sprint].active = false;
        $scope.sprints[i].active = true;
        $scope.selected_sprint = i;
        var taches = $scope.sprint.taches;
        for (var i = 0; i < taches.length; i++) {
          taches[i].name = taches[i].titre;
          taches[i].desc = taches[i].description;
          var date_fin = new Date(taches[i].date_debut);
          var date_debut = new Date(taches[i].date_debut);
          var dure = parseInt(taches[i].dure);
          console.log(dure);
          date_fin.setDate(date_debut.getDate() + dure);
          console.log(date_debut, date_fin);
          taches[i].values = [{from:date_debut, to: date_fin}];
        }
        $("#gantt").gantt({
          source: taches,
          scale: "dayys",
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


      };

      $scope.add_task = function() {
        console.log($scope.ntache);
        var sprint_id = $scope.sprints[$scope.selected_sprint]._id;
        SprintService.add_task(sprint_id, $scope.ntache).success(function(data) {
          $scope.sprints[$scope.selected_sprint].taches.push(data.data);
          $("#myModal2").modal('hide');
        });
      }

      $scope.add_sprint = function() {
        SprintService.add($routeParams.id, $scope.nsprint).success(function(data) {
          $scope.sprints.push(data.data);
          var l = $scope.sprints.length;
          $scope.select_sprint(l - 1);
          $("#myModal").modal('hide')
        });

      }
    }
  ]
);

appControllers.controller('MainCtrl', ['$scope','$location', '$window',
  function($scope,$location, $window) {
    $scope.logout = function() {
      if ($window.sessionStorage.token)
        delete $window.sessionStorage.token;
      $window.location.href = options.site_url;
    }
  }
]);
