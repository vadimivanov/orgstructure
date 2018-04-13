import {Models} from './models';
import {Helpers} from './helpers';
import {Customizer} from './customizer';
import {RelationBuildMethodsModule} from './relation-build-methods';
import {StructureBuildMethodsModule} from './structure-build-methods';
import {multi} from './extend-modules';

export class Creator extends multi.inherit(Models, Helpers, Customizer, RelationBuildMethodsModule, StructureBuildMethodsModule) {
    constructor(name) {
        super();
        this.idPaths = [];
        this.list = [];
        this.maxCroNumber = 0;

        // create an array with nodes
        this.nodes = new vis.DataSet();
        this.tableNode.CRO_Number = '1';
        this.tableNode.LastName = 'Default Entity';
        this.tableNode = Object.assign(this.tableNode, { id: '1', shape: 'image', title: 'Default Entity', image: '', brokenImage: '../css/images/person.png', group: 'company'});
        this.nodes.add(this.tableNode);
        this.list.push(this.tableNode);
        // create an array with edges
        this.edges = new vis.DataSet();

        // create a network
        this.container = document.getElementById('network');
        this.data = {
            nodes: this.nodes,
            edges: this.edges
        };
        this.options.manipulation = {
            addNode: false,
            addEdge: (data, callback) => {
                if (data.from === data.to) {
                    let r = confirm("Do you want to connect the node to itself?");
                    if (r !== true) {
                        callback(null);
                        return;
                    }
                }
                document.getElementById('edge-operation').innerHTML = "Add Edge";
                this.editEdgeWithoutDrag(data, callback);
            },
            editEdge: {
                editWithoutDrag: (data, callback) => {
                    document.getElementById('edge-operation').innerHTML = "Edit Edge";
                    this.editEdgeWithoutDrag(data, callback, 'edit');
                }
            }
        };
        this.network = new vis.Network(this.container, this.data, this.options);
    }

    init() {
        document.getElementById('network').addEventListener('dblclick', (event) => {
            if (this.selected !== null) {
                $("#myModal").modal();
                $("#info").hide();
            }
        });
        document.getElementById('switchEdges').addEventListener('click', (event) => {
            this.switchEdgeFields();
        });
        this.drawingNodes(this.network, this.nodes);
        this.initDraw();
        this.updateNetwork();
    }

    initDraw() {
        if (this.network !== null) {
            this.network.destroy();
            this.network = null;
        }
    }

    fillItemsList(list) {
        this.nodes = new vis.DataSet();
        this.edges = new vis.DataSet();
        this.list = list;

        this.createId(this.list);

        this.data = {
            nodes: this.nodes,
            edges: this.edges
        };

        this.drawingNodes(this.network, this.nodes);
        this.updateNetwork();
    };

    // create unique id for visjs
    createId() {
        let output = [];
        let output2 = [];
        for (let i = 0; i < this.list.length; i++) {
            let newNodeID = '_' + Math.random().toString(36).substr(2, 9);
            this.list[i].id = newNodeID;
        }
        this.list.forEach((value) => {
            this.checkRelations(value, output, output2);
        });
    }

    /**
     *
     * @param data
     * description - entity list
     * @param arrEdges
     * @param arrNodes
     */
    checkRelations(data, arrEdges, arrNodes) {
        this.list.forEach((value) => {
            let obj = {
                name: '',
                id: ''
            };
            // check entity siblings in lists
            let indexEdges = arrEdges.findIndex(x => x.name === value.LastName);
            let indexNameEdges = arrEdges.findIndex(x => x.name === data.LastName);
            let indexNameEdgesSiblings = arrEdges.findIndex(x => x.id === value.id);
            let indexNodes = arrNodes.findIndex(x => x.name === data.LastName);
            let indexNodesSiblings = arrNodes.findIndex(x => x.id === data.id);
            let indexNodesName = arrNodes.findIndex(x => x.name === value.LastName);

            // sorting entity list and check relationship
            if (indexNodes < 0) {
                obj.name = data.LastName;
                obj.id = indexNameEdges >= 0 ? arrEdges[indexNameEdges].id : data.id;
                arrNodes.push(obj);

                // create nodes with correct id for relation parent-child
                data.id = indexNameEdges >= 0 ? arrEdges[indexNameEdges].id : data.id;
                data.group = data.FirstName ? 'individual' : 'company';
                data.title = data.FirstName + ' ' + data.LastName;

                this.nodes.update(data);
            }
            else if (indexNodesSiblings < 0 && !data.Shareholder_regno) {
                obj.name = data.LastName;
                obj.id = data.id;
                arrNodes.push(obj);

                // create nodes without child
                data.group = data.FirstName ? 'individual' : 'company';
                data.title = data.FirstName + ' ' + data.LastName;

                this.nodes.update(data);
            }

            if (data.Shareholder_regno === value.CRO_Number) {
                if (indexEdges < 0) {
                    obj.name = value.LastName;
                    obj.id = value.id;
                    arrEdges.push(obj);

                }else if (indexNameEdgesSiblings < 0 && !value.Shareholder_regno) {
                    obj.name = value.LastName;
                    obj.id = value.id;
                    arrEdges.push(obj);
                }
                let newEdgeID = '_' + Math.random().toString(36).substr(2, 9);
                // create edges for relation
                if (indexNodesName >= 0 ? arrNodes[indexNodesName].id : obj.id) {
                    this.edges.add({
                        id: newEdgeID,
                        from: indexNameEdges >= 0 ? arrEdges[indexNameEdges].id : data.id,
                        to: indexNodesName >= 0 ? arrNodes[indexNodesName].id : obj.id,
                        label: data.Voting_right,
                        arrows: 'to'
                    });
                }
            }
        });
    }

    updateNetwork() {
        this.geMaxCRO();
        this.network = new vis.Network(this.container, this.data, this.options);
        this.network.redraw();
        this.network.on("select", (params) => {
            if (params.nodes.length > 0) {
                this.selected = params.nodes[0];
                this.updateNodeDropdownMenu();
            } else {
                this.selected = null;
            }
            if (this.selected !== null) {
                this.selectedLabel = this.nodes._data[this.selected].label;
                let indexOfSelectedInidPaths = this.arrayObjectIndexOf(this.idPaths, selected, "id");
                if (indexOfSelectedInidPaths !== -1) {
                    this.selectedLabel = this.idPaths[indexOfSelectedInidPaths].label;
                }
                document.getElementById("selected").textContent = this.selectedLabel;
            }
        });
    }

    geMaxCRO() {
        let arrCRO = [];

        for (let i in this.nodes._data) {
            arrCRO.push(this.nodes._data[i].CRO_Number);
        }
        this.maxCroNumber = Math.max.apply(null, arrCRO);
    }
}