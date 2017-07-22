/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repair');
 * mod.thing == 'a thing'; // true
 */

var roleRepair = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //creep.memory.building = false;
        //console.log(creep.carry.energy);
        if(creep.carry.energy == 0){
            creep.memory.building = false;
        }
	    if(creep.carry.energy < creep.carryCapacity && !creep.memory.building) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                if(creep.pos.inRangeTo(40,44,10)){
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    //console.log('derp1133');
                }else{
                    //console.log(creep.pos);
                    creep.moveTo(40,44, {visualizePathStyle: {stroke: '#ffaa00'}});
                    //console.log('derp');
                }
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
        })
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                
                    var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
            })
                if(closestDamagedStructure) {
                    if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                        creep.memory.building = true;
                        creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    creep.moveTo(30,30, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            
            
            
        }

	}
};

module.exports = roleRepair;