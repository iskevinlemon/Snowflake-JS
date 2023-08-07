/*
Snowflake JS - State management library.

> IMPORTANT: snowflake.js have to be LOADED first in the <head> before your other <script> tag.

Version: 1.0.1
Created by: Kevin (https://github.com/kevin-lem0n)
*/

(function (Factory) { // function attached to a window object - START

    // Utils

    // Local storage - get
    Factory.$lsGet = function(a){
        return localStorage.getItem(a);
    }

    // Local storage - set
    Factory.$lsSet = function(lsKey, lsValue){
        localStorage.setItem(lsKey, lsValue);
    }

    // JSON.stringyfy(a)
    // @param {string} a - A string to convert to JSON
    // @return {string} - The value of a after converting it to JSON
    Factory.$tostring = function(a){
        return JSON.stringify(a);
    }

    /*
    Function is run everytime the page is loaded.
    It checks whether SF Global State Object has been created before.
    It checks the current value of the sfHasInit.
    If it hasn't been created --> create the SF Global State Object & updated sfHasInit to sf-init-completed
    If it has been created --> do nothing
    */
    function SnowflakeInit(){
        var sfHasInit = $lsGet("sfHasInit");
        if(sfHasInit != "sf-init-completed"){
            // Create a snowflake global state object (SGSO)
            var snowflakeGlobalState = {}; // Object initial state is empty
            // Convert the SGO to JSON
            var snowflakeGlobalStateJSON = $tostring(snowflakeGlobalState);
            // Store the SGO as JSON in localStorage
            $lsSet("snowflakeGlobalStateData", snowflakeGlobalStateJSON);   
            $lsSet("sfHasInit", "sf-init-completed");
        }
    }
    SnowflakeInit();

    Factory.Snowflake = {

        // Get all states
        getAll: function() {
            var sgoData = $lsGet("snowflakeGlobalStateData");
            return JSON.parse(sgoData) || {}; // Initialize as an empty object if data is null
        },

        // Get single value of a state
        // @param {string} stateName - The name of the state property to retrieve
        // @return {*} - The value of the specified state property, or undefined if not found
        get: function(stateName) {
            var sgoDataAsJSON = Factory.Snowflake.getAll(); // Get the existing state data
            return sgoDataAsJSON[stateName];
        },  
    
        // Set a new state
        // @param {string} stateName - The name of the state property
        // @param {*} stateValue - The value to set for the state property
        set: function(stateName, stateValue) {
            var sgoDataAsJSON = Factory.Snowflake.getAll(); // Get the existing state data
            sgoDataAsJSON[stateName] = stateValue;
            var updatedSgoDataAsJSON = $tostring(sgoDataAsJSON);
            $lsSet("snowflakeGlobalStateData", updatedSgoDataAsJSON);
        },

        // Update a current state
        // @param {string} stateName - The name of the state property to update
        // @param {*} newStateValue - The new value for the state property
        update: function(stateName, newStateValue){
            var sgoDataAsJSON = Factory.Snowflake.getAll(); // Get the existing state data
            if (sgoDataAsJSON.hasOwnProperty(stateName)) {
                sgoDataAsJSON[stateName] = newStateValue;
                var updatedSgoDataAsJSON = $tostring(sgoDataAsJSON);
                $lsSet("snowflakeGlobalStateData", updatedSgoDataAsJSON);
            }
        },

        // Delete a state
        // @param {string} stateName - The name of the state property to delete
        delete: function(stateName) {
            var sgoDataAsJSON = Factory.Snowflake.getAll(); // Get the existing state data
            if (sgoDataAsJSON.hasOwnProperty(stateName)) {
                delete sgoDataAsJSON[stateName]; // Delete the property from the object
                var updatedSgoDataAsJSON = $tostring(sgoDataAsJSON);
                $lsSet("snowflakeGlobalStateData", updatedSgoDataAsJSON);
            }
        },

        // Reset all state
        // This will clear all properties of SF Global State Object (SGSO)
        reset: function() {
            var snowflakeGlobalState = {};
            var snowflakeGlobalStateJSON = $tostring(snowflakeGlobalState);
            $lsSet("snowflakeGlobalStateData", snowflakeGlobalStateJSON);   
        },

        // Check if a state exists
        // @param {string} stateName - The name of the state property to check
        // If stateName exists --> return true, else return false
        ifexists: function(stateName) {
            var sgoDataAsJSON = Factory.Snowflake.getAll(); 
            if (sgoDataAsJSON.hasOwnProperty(stateName)) {
                return true;
            }
            else
                return false;
        },
    
    };

    // Rename Snowflake
    // @param {string} sfNewName - The name of the Snowflake object
    /* Usage example:
    $SnowflakeConfig("Library"); // set the config

    E.g instead of:                       It becomes:
    Snowflake.set("fruit", "apple"); -->  Library.set("fruit", "apple");
    */
    Factory.$SnowflakeConfig = function(sfNewName) {
        Factory[sfNewName] = Factory.Snowflake;
    }

})(window); // // function attached to a window object - END