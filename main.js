var roleHarvester = require('role.harvester');
var roleFarharvester = require('role.farharvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repair');
var roleAttacker = require('role.attack');


module.exports.loop = function () {
    
        for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var farharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'farharvester');
    var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var attacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    //console.log('Harvesters: ' + repairer.length);
    
    if(harvesters.length < 2) {
        var newName = Game.spawns['zergHive1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    
    if(builders.length < 3) {
        var newName = Game.spawns['zergHive1'].createCreep([CARRY,CARRY,CARRY,WORK,WORK,MOVE,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    
    if(upgraders.length < 1) {
        var newName = Game.spawns['zergHive1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
    
    if(farharvesters.length < 5) {
        var newName = Game.spawns['zergHive1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,WORK,MOVE], undefined, {role: 'farharvester'});
        console.log('Spawning new farharvester: ' + newName);
    }
    
    if(repairer.length < 1) {
        var newName = Game.spawns['zergHive1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer'});
        console.log('Spawning new farharvester: ' + newName);
    }
    
    var tower = false; ///Game.getObjectById('011f7f501c9136b6b4519ebd');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'farharvester') {
            roleFarharvester.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
    }
}