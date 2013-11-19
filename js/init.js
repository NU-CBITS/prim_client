var enrollmentApp = angular.module('enrollmentApp', []);

enrollmentApp.service('currentInterventionService', function ($rootScope) {

        var interventions = [{
            id: "mobilyze",
            name: "Mobilyze",
            theme: "lightBlue",
            // consentForm: "Mobilyze consent form",
            // consentForm: "Mobilyze eligibility information",
            phiFields: []
            interventionManagers: [1],

            homePage: "Mobilyze Home Page",
            contactInformation: "Mobilyze contactUs",
            additionalResources: "more resources",
            
            about: "",
            eligibilityInformation: "",
            investigatorDescriptions: "",
            fundingInfo : "",

            manualEnrollmentSuccess : "",
            automaticEnrollmentSuccess: "",
            automaticEnrollmentFailure: ""        
            consentMethod: "manual",
            randomization: false,

        }];


        // var currentIntervention = _.where(interventions, {
        //     id: "Mobilyze"
        // })[0];

       	var currentIntervention = {};

       	currentIntervention.id= {};

       	currentIntervention.contents= {};

		currentIntervention.set= function (interventionId) {

                if (currentIntervention.id != interventionId) {
                	currentIntervention.id = interventionId;
                    currentIntervention.contents = currentIntervention.get(interventionId);
                    $rootScope.$broadcast('currentInterventionChanged', currentIntervention);
                }
            };

        currentIntervention.get = function(interventionId){

        	return _.where(interventions, { id: interventionId })[0];

        }
        

        return currentIntervention

    });

enrollmentApp.directive("buttonLabelInput",function(){
    return {
      restrict: 'E',
      templateUrl: '../templates/buttonLabelInput.html'
    };

});


var navbarCtrl = function ($scope, currentInterventionService) {

    $scope.siteLabel = "PRIM";

    $scope.siteOptions = [

        {
            name: "editRecruitment",
            label: "Recruitment",
            icon: "glyphicon glyphicon-message"
        },{
            name: "consentData",
            label: "Consents",
            icon: "glyphicon glyphicon-stats"
        },  {
            name: "randomization",
            label: "Groups",
            icon: "glyphicon glyphicon-group"
        },  {
            name: "dashboard",
            label: "Dashboard",
            icon: "glyphicon glyphicon-stats"
        },  {
            name: "dataExport",
            label: "Export",
            icon: "glyphicon glyphicon-floppy-save"
        },  {
            name: "projectManagement",
            label: "Documentation",
            icon: "glyphicon glyphicon-eye-open"
        }

    ];

    $scope.interventionSelectLabel = "select an intervention:";

    $scope.interventions = [{
        name: "Mobilyze",
        id: "mobilyze"
    }, {
        name: "Intellicare",
        id: "intellicare"
    }, {
        name: "Stepped Care",
        id: "steppedCare"
    }]

    $scope.user = "Mark";

    $scope.getCurrentIntervention = function () {
        return $scope.selectIntervention;
    }

    $scope.selectIntervention = {};

    $scope.$watch('selectIntervention', function () {
        currentInterventionService.set($scope.selectIntervention.id);
    }, true);


}




var enrollmentSiteCtrl = function ($scope, currentInterventionService) {

    $scope.$on('currentInterventionChanged', function () {
        $scope.currentIntervention = currentInterventionService.contents;
    });

    $scope.currentIntervention = {};

    $scope.currentInterventionExists = function(){
    	if ($scope.currentIntervention == undefined){return false}
    	else {return true}
    }

    $scope.themesFolder = "themes";

	$scope.themes = [{
        label: "LightBlue",
        name: "lightBlue",
        description: "CBITs Default",
        previewUrl: "index.html"
    }];
    
    $scope.themeLabel = "Theme:";

    $scope.selectTheme;

    $scope.themePreview = function () {
    if ($scope.currentIntervention != undefined){
            var themeSelect = _.where($scope.themes, {
                name: $scope.currentIntervention.theme || "lightBlue"
            })[0];
            return $scope.themesFolder + "/" + themeSelect.name + "/" + themeSelect.previewUrl;}
    };




    


    $scope.consentMethodLabel = "Consent style:";

    $scope.consentMethods = [{
        type: "manual",
        label: "Manual",
        description: "Once a participant is screened in, the assigned coordinators are notified and are responsible for adding the user to the trial.",
        bootstrapClass: "btn-danger"
    }, {
        type: "automatic",
        label: "Automatic",
        description: "The consent form has the business logic to determine if a study participant should be added to the study and notified of their availability.",
        bootstrapClass: "btn-success"

    }]


    $scope.interventionManagerSelectLabel = "Consent Coordinators";

    $scope.interventionManagers = [{
        firstName: "Jenna",
        lastName: "Duffecy",
        email: "j-duffecy@northwestern.edu",
        id: 1
    }, {
        firstName: "Marya",
        lastName: "Corden",
        email: "mecorden@gmail.com",
        id: 2
    }];


    $scope.interventionContentLabel = "Site editor:";

    $scope.interventionContent = [

        {
            label: "Home Page",
            name: "homePage",
            description: "The home page for your intervention--make it interesting!",
            required: true,
            value: $scope.currentIntervention.homePage || ""
        }, {
            label: "Contact Information",
            name: "contactInformation",
            description: "Should contain contact information for the primary study contacts for the intervention--it's up to you how you want to format it!",
            required: true
        }, {
            label: "Patient Eligibility Information",
            name: "eligibilityInformation",
            description: "What does a participant need to know in order to understand whether this study is for them?",
            required: true
        }, {
            label: "Consent Form",
            name: "consentForm",
            description: "Your IRB approved consent form--it's your responsibility to upload the IRB seal for this!",
            required: true
        }, {
            label: "Additional Resources",
            name: "additionalResources",
            description: "Anything supplmental you want the patient to know? Some links to other studies?",
        }


    ]


    $scope.phiFieldsLabel = "Required PHI:";

    $scope.phiFields = [

        {
            label: "First Name",
            name: "firstName",
            type: "text"
        }, {
            label: "Middle Name",
            name: "middleName",
            type: "text"
        }, {
            label: "Last Name",
            name: "lastName",
            type: "text"
        }, {
            label: "Date of Birth",
            name: "DOB",
            type: "date"
        }, {
            label: "Address 1",
            name: "address1",
            type: "text"
        }, {
            label: "Address 2",
            name: "address2",
            type: "text"
        }, {
            label: "City",
            name: "city",
            type: "text"
        }, {
            label: "State/Province",
            name: "stateOrProvince",
            type: "select",
            options: [{
                    country: "USA",
                    statesOrProvinces: [{
                        name: "Illinois",
                        label: "IL"
                    }]

                }

            ]
        }, {
            label: "Email",
            name: "email",
            type: "email"
        }



    ];

}

