import {Helpers} from './helpers';
import {multi} from './extend-modules';

export class StructureBuildMethodsModule extends multi.inherit(Helpers) {
    constructor() {
        super();
        this.addNode = function() {
            if (this.selected !== null) {
                let tempObj = {};
                let percent_label = document.getElementById('percent-label');
                let relationship_label = document.getElementById('relationship-label');
                let type_label = document.getElementById('type-label');
                let name_label = document.getElementById('name-label');
                let newNodeID = '_' + Math.random().toString(36).substr(2, 9);
                let newEdgeID = '_' + Math.random().toString(36).substr(2, 9);
                let nodeParentID = this.network.getSelectedNodes();
                let parentNode = this.getCurrentNode(nodeParentID[0], this.list);
                this.tableNodeNew = Object.assign({}, this.tableNode);

                try {
                    if ((!this.isPercentageValid(this.selected, parseFloat(percent_label.value)) && relationship_label.value === 'Parent') || parseFloat(percent_label.value) > 100) {
                        alert("Company ownership cannot exceed 100%")
                    }
                    //adds node depending on relationship
                    else {
                        tempObj = {
                            id: newNodeID,
                            group: type_label.value.toLowerCase(),
                            title: name_label.value,
                            image: '',
                            shape: 'image'
                        };

                        if (relationship_label.value === 'Parent') {
                            this.tableNodeNew.CRO_Number = (this.maxCroNumber+1).toString();
                            this.tableNodeNew.Shareholder_regno = parentNode[0].CRO_Number.toString();
                            this.edges.add({
                                id: newEdgeID,
                                from: newNodeID,
                                to: this.selected,
                                label: percent_label.value,
                                arrows: 'to'
                            });
                        } else {
                            this.tableNodeNew.CRO_Number = parentNode[0].Shareholder_regno || (this.maxCroNumber+1).toString();
                            this.tableNodeNew.Shareholder_regno = '';
                            if (parentNode[0].Shareholder_regno || !parentNode[0].Shareholder_regno.length) {
                                parentNode[0].Shareholder_regno = parentNode[0].Shareholder_regno || (this.maxCroNumber+1).toString();
                            }
                            this.nodes.update(parentNode[0], nodeParentID);
                            this.edges.add({
                                id: newEdgeID,
                                from: this.selected,
                                to: newNodeID,
                                label: percent_label.value,
                                arrows: 'to'
                            });
                        }

                        this.tableNodeNew.LastName = name_label.value;
                        this.tableNodeNew.SharesType = relationship_label.value;
                        this.tableNodeNew = Object.assign(this.tableNodeNew, tempObj);
                        this.nodes.add(this.tableNodeNew);
                        this.list.push(this.tableNodeNew);

                        this.updateNodeDropdownMenu();
                        $('#myModal').modal("toggle");
                        this.drawingNodes(this.network, this.nodes);
                        this.updateNetwork();
                    }
                }
                catch (err) {
                    alert(err);
                }
            }
        };

        this.addPerson = function() {
            if (this.selected !== null) {
                let percent_label = document.getElementById('percent-person');
                let relationship_label = document.getElementById('relationship-person');
                let type_label = document.getElementById('type-person');
                let name_label = document.getElementById('name-person');
                let newNodeID = '_' + Math.random().toString(36).substr(2, 9);
                let newEdgeID = '_' + Math.random().toString(36).substr(2, 9);

                try {
                    if ((!this.isPercentageValid(this.selected, parseFloat(percent_label.value)) && relationship_label.value === 'Owner') || parseFloat(percent_label.value) > 100) {
                        alert("Company ownership cannot exceed 100%")
                    }

                    //adds node depending on relationship
                    else {
                        this.nodes.add({
                            id: newNodeID,
                            group: type_label.value,
                            label: name_label.value,
                            image: ''
                        });
                        if (relationship_label.value === 'Owner') {
                            this.edges.add({
                                id: newEdgeID,
                                from: newNodeID,
                                to: this.selected,
                                label: percent_label.value,
                                arrows: 'to'
                            });
                        } else {
                            this.edges.add({
                                id: newEdgeID,
                                from: this.selected,
                                to: newNodeID,
                                label: percent_label.value,
                                arrows: 'to'
                            });
                        }
                        this.updateNodeDropdownMenu();
                        $('#myModal').modal("toggle");
                        this.drawingNodes(this.network, this.nodes);
                        this.updateNetwork();
                    }
                }
                catch (err) {
                    alert(err);
                }
            }
        };

        this.editNode = function() {
            if (this.selected !== null) {
                try {
                    this.nodes.update({
                        id: this.selected,
                        group: document.getElementById('type-edit-label').value.toLowerCase(),
                        title: document.getElementById('name-edit-label').value
                    });
                    this.updateNodeDropdownMenu();
                    this.drawingNodes(this.network, this.nodes);
                    this.updateNetwork();
                }
                catch (err) {
                    alert(err);
                }
            }
        };

        this.deleteNode = function() {
            if (this.selected !== null) {
                let r = confirm("Confirm delete");
                if (r) {
                    try {
                        this.nodes.remove({
                            id: this.selected
                        });
                        for (let edge in this.edges._data) {
                            if (this.edges._data[edge].to === this.selected || this.edges._data[edge].from === this.selected) {
                                this.edges.remove({id:edge});
                            }
                        }
                        this.selected = null;
                        this.updateNodeDropdownMenu();
                        this.drawingNodes(this.network, this.nodes);
                        this.updateNetwork();
                    }
                    catch (err) {
                        alert(err);
                    }
                }

            }
        };

        this.addEdge = function() {
            let newEdgeID = '_' + Math.random().toString(36).substr(2, 9);
            let ownedID = document.getElementById('owner-edit-menu').value;
            let ownedPercent = document.getElementById('percent-edit-label').value;

            if (this.selected !== null) {
                try {
                    if (this.doesEdgeExist(ownedID, selected)) {
                        if (this.isPercentageValid(ownedID, parseFloat(ownedPercent))) {
                            this.edges.remove({
                                id: this.getEdge(ownedID, selected)
                            });
                            this.edges.add({
                                id: newEdgeID,
                                from: selected,
                                to: ownedID,
                                label: ownedPercent,
                                arrows: 'to'
                            });
                            $('#myModal').modal("toggle");
                        } else {
                            alert("Percentage owned cannot exceed 100%");
                        }
                    }
                    else if (this.doesEdgeExist(selected, ownedID)) {
                        if (this.isPercentageValid(ownedID, parseFloat(ownedPercent) - parseFloat(this.edges._data[this.getEdge(selected, ownedID)].label))) {
                            let edgeID = this.getEdge(selected, ownedID);
                            this.edges.update({
                                id: edgeID,
                                label: ownedPercent
                            });
                            $('#myModal').modal("toggle");
                        } else {
                            alert("Percentage owned cannot exceed 100%");
                        }
                    } else {
                        if (this.isPercentageValid(ownedID, parseFloat(ownedPercent))) {
                            this.edges.add({
                                id: newEdgeID,
                                from: selected,
                                to: ownedID,
                                label: ownedPercent,
                                arrows: 'to'
                            });
                            this.updateNodeDropdownMenu();
                            $('#myModal').modal("toggle");
                        } else {
                            alert("Percentage owned cannot exceed 100%");
                        }
                    }
                } catch(err) {
                    alert(err)
                }
            }
        };

        this.arrayObjectIndexOf = function(myArray, searchTerm, property) {
            for(let i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm) return i;
            }
            return -1;
        };

        //create dropdown menu for selectable nodes when editing ownership relations
        this.updateNodeDropdownMenu = function() {
            $("#owner-edit-menu").empty();
            for (let node in this.nodes._data) {
                if (node !== this.selected){
                    var label = this.nodes._data[node].label;
                    var indexOfNodeInidPaths = this.arrayObjectIndexOf(this.idPaths, node, "id");
                    if (indexOfNodeInidPaths !== -1) {
                        label = this.idPaths[indexOfNodeInidPaths].label
                    }
                    $('<option value="'+ node +'">' + label + '</option>').appendTo('#owner-edit-menu');
                }
            }
        };

        this.isPercentageValid = function(id, percent_to_add) {
            let totalPercent = 0;
            //check if user can add it
            for (let edge in this.edges._data){
                if (this.edges._data[edge].to === id) {
                    totalPercent += parseFloat(this.edges._data[edge].label)
                }
            }
            return (totalPercent + percent_to_add) <= 100
        };

        this.doesEdgeExist = function(from, to) {
            for (let edge in this.edges._data) {
                if (this.edges._data[edge].to === to && this.edges._data[edge].from === from) {
                    return true;
                }
            }
            return false;
        };

        this.getEdge = function(from, to) {
            for (let edge in this.edges._data) {
                if (this.edges._data[edge].to === to && this.edges._data[edge].from === from) {
                    return edge;
                }
            }
            return null;
        };

        this.getChildren = function(nodeId) {
            let result = [];
            for (let edge in this.edges._data){
                if (this.edges._data[edge].from === nodeId) {
                    result.push(this.edges._data[edge].to)
                }
            }
            return result;
        };

        this.getParents = function(nodeId) {
            let result = [];
            for (let edge in this.edges._data){
                if (this.edges._data[edge].to === nodeId) {
                    result.push(this.edges._data[edge].from)
                }
            }
            return result;
        }
    }
}