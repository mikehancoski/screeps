var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // creep.memory.upgrading = false;
        // creep.memory.building = false;
        if(creep.carry.energy == 0){
            creep.memory.building = false;
        }
	    if(creep.carry.energy < creep.carryCapacity && (!creep.memory.building)) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
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
                
                var toggle = 2;
                
                //Upgrade toggle
            //     if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
        	   //     creep.memory.upgrading = true;
        	   //     creep.say('⚡ upgrade');
        	   // }
        	    
        	   // if(creep.memory.upgrading && creep.carry.energy == 0){
        	   //     creep.memory.upgrading = false;
        	   //     creep.say('back to harvest from upgrade');
        	        
        	   // }
        
            // 	if(creep.memory.upgrading) {
            //         if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            //             creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            //         }
            //     }
                
                //BUILD TOGGLE
                if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	                creep.memory.building = true;
	                creep.say('🚧 build');
	           }
	           if(creep.memory.building && creep.carry.energy == 0){
        	        creep.memory.building = false;
        	        creep.say('back to harvest from upgrade');
        	        
        	    }
                
	            if(creep.memory.building) {
	                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
            }
            
            
        }

	}
};

module.exports = roleHarvester;