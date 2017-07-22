/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.attack');
 * mod.thing == 'a thing'; // true
 */



var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.attacking && creep.carry.energy == 0) {
            creep.memory.attacking = false;
            creep.say('�harvestt');
	    }
	    if(!creep.memory.attacking && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.attacking = true;
	        creep.say('🚧 attack!');
	    }

	    if(creep.memory.attacking) {
	       var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	       console.log(creep.name);
	       
            if(creep.rangedAttack(closestHostile) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestHostile);
            }

	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleAttacker;