import {Helpers} from './helpers';
import {multi} from './extend-modules';

export class RelationBuildMethodsModule extends multi.inherit(Helpers){
    constructor(){
        super();
        // Callback passed as parameter is ignored
        this.editEdgeWithoutDrag = function(data, callback, flag) {
            let nodeFrom = this.getCurrentNode(data.from.id || data.from, this.list);
            let nodeTo = this.getCurrentNode(data.to.id || data.to, this.list);
            // filling in the popup DOM elements
            document.getElementById('edge-label').value = data.label || '';
            document.getElementById('edge-from').setAttribute("data-id", data.from.id || data.from);
            document.getElementById('edge-from').value = nodeFrom[0].title;
            document.getElementById('edge-to').setAttribute("data-id", data.to.id || data.to);
            document.getElementById('edge-to').value = nodeTo[0].title;
            document.getElementById('edge-saveButton').onclick = this.saveEdgeData.bind(this, data, callback, this.list, flag);
            document.getElementById('edge-cancelButton').onclick = this.cancelEdgeEdit.bind(this,callback);
            document.getElementById('edge-popUp').style.display = 'block';
        };

        this.clearEdgePopUp = function() {
            document.getElementById('edge-saveButton').onclick = null;
            document.getElementById('edge-cancelButton').onclick = null;
            document.getElementById('edge-popUp').style.display = 'none';
        };

        this.cancelEdgeEdit = function(callback) {
            this.clearEdgePopUp();
            callback(null);
        };

        this.switchEdgeFields = function() {
            let from = document.getElementById('edge-from');
            let to = document.getElementById('edge-to');
            let dataIdFrom = from.getAttribute('data-id');
            let dataIdTo = to.getAttribute('data-id');
            let tempObj = {
                from: {
                    id: dataIdFrom,
                    value: from.value
                },
                to: {
                    id: dataIdTo,
                    value: to.value
                }
            };
            from.setAttribute("data-id", tempObj.to.id);
            from.value = tempObj.to.value;
            to.setAttribute("data-id", tempObj.from.id);
            to.value = tempObj.from.value;
        };

        this.saveEdgeData = function(data, callback, list, flag) {
            let newEdgeID = '_' + Math.random().toString(36).substr(2, 9);
            if (typeof data.to === 'object')
                data.to = data.to.id;
            if (typeof data.from === 'object')
                data.from = data.from.id;

            data.label = document.getElementById('edge-label').value;
            data.from = document.getElementById('edge-from').getAttribute('data-id');
            data.to = document.getElementById('edge-to').getAttribute('data-id');
            data.arrow = 'to';

            let nodeFromList = this.getCurrentNode(data.from, list);
            let nodeFrom = this.toArray(this.nodes._data).filter(node => node.id === data.from);
            let nodeTo = this.toArray(this.nodes._data).filter(node => node.id === data.to);
            let edgeData = {
                id: data.id || newEdgeID,
                from: data.from,
                to: data.to,
                label: data.label,
                arrows: 'to'
            };

            this.clearEdgePopUp();

            if (flag === 'edit') {
                this.edges.update(edgeData);
            } else {
                this.edges.add(edgeData);
            }

            nodeFrom[0].Shareholder_regno = nodeTo[0].CRO_Number;
            nodeFromList[0].Shareholder_regno = nodeTo[0].CRO_Number;
            this.nodes.update(nodeFrom[0]);
            callback(null);
        }
    }
}