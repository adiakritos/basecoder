'use strict';

/**
 * @ngdoc function
 * @name basecoderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the basecoderApp
 */

angular.module('basecoderApp')
.controller('MainCtrl', ['$scope', 'clipboard',
   function ($scope, clipboard) {

     $scope.human   = "";
     $scope.encoded = "";

     $scope.$watch('human', function(newVal, oldVal) {
       $scope.encoded = btoa(newVal);
     })

     document.getElementById("encoded").addEventListener("focus", function() {
       var el = $(this).siblings()[1];
       copyToClipboard(document.getElementById("encoded"));
       $(el).css('opacity', '1');
     });

     document.getElementById("encoded").addEventListener("focusout", function() {
       var el = $(this).siblings()[1];
       $(el).css('opacity', '0');
     });

     document.getElementById("human").addEventListener("focus", function() {
       var el = $(this).siblings()[1];
       copyToClipboard(document.getElementById("human"));
       $(el).css('opacity', '1');
     });

     document.getElementById("human").addEventListener("focusout", function() {
       var el = $(this).siblings()[1];
       $(el).css('opacity', '0');
     });


     function copyToClipboard(elem) {
       // create hidden text element, if it doesn't already exist
       var targetId = "_hiddenCopyText_";
       var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
       var origSelectionStart, origSelectionEnd;
       if (isInput) {
         // can just use the original source element for the selection and copy
         target = elem;
         origSelectionStart = elem.selectionStart;
         origSelectionEnd = elem.selectionEnd;
       } else {
         // must use a temporary form element for the selection and copy
         target = document.getElementById(targetId);
         if (!target) {
           var target = document.createElement("textarea");
           target.style.position = "absolute";
           target.style.left = "-9999px";
           target.style.top = "0";
           target.id = targetId;
           document.body.appendChild(target);
         }
         target.textContent = elem.textContent;
       }
       // select the content
       var currentFocus = document.activeElement;
       target.focus();
       target.setSelectionRange(0, target.value.length);

       // copy the selection
       var succeed;
       try {
         succeed = document.execCommand("copy");
       } catch(e) {
         succeed = false;
       }
       // restore original focus
       if (currentFocus && typeof currentFocus.focus === "function") {
         currentFocus.focus();
       }

       if (isInput) {
         // restore prior selection
         elem.setSelectionRange(origSelectionStart, origSelectionEnd);
       } else {
         // clear temporary content
         target.textContent = "";
       }
       return succeed;
     }

   }]
  );
