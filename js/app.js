import {Loader} from './loader';
import {Creator} from './creator';
import config from '../config/org-config.json';

export class App extends Loader{
    constructor(name) {
        super();
        document.getElementById("tab-info").onclick = this.footerTab1.bind(this);
        document.getElementById("tab-entity").onclick = this.footerTab2.bind(this);
        document.getElementById("tab-person").onclick = this.footerTab3.bind(this);
        document.getElementById("tab-owner").onclick = this.footerTab4.bind(this);

        this.creator = new Creator();
        this.types = config || {};

        if (this.types) {
            for (let i in this.types) {
                this.parseOrgConfig(i);
            }
        }
    }

    parseOrgConfig(type) {
        let selectNode = {
            entityEditTypes: $('#type-edit-label'),
            entityTypes: $('#type-label'),
            relationshipCompany: $('#relationship-label'),
            shareTypes: $('#share-label')
        };
        for (let i = 0; i < this.types[type].length; i++) {
            let arr = this.types[type][i];
            if (selectNode[type]) {
                selectNode[type].append(`<option value="${arr}">${arr}</option>`);
                if (type === 'entityTypes') {
                    selectNode['entityEditTypes'].append(`<option value="${arr}">${arr}</option>`);
                }
            }
        }
    }

    init() {
        this.creator.init();

        document.getElementById('myModal').addEventListener('keyup', (event) => {
            if (event.keyCode === 13) {
                $(".modal-footer").children()[$(".modal-footer").children().length - 1].click();
            }
        });

        document.getElementById('upload-file').addEventListener('change', (event) => {
            this.openFile(event);
            document.getElementById('upload-file').value='';
        });

        document.getElementById('export-file').addEventListener('click', (event) => {
            let tempArr = [];
            let nodesArr = this.creator.list;
            let edgesArr = this.creator.toArray(this.creator.edges._data);
            for (let i = 0; i < nodesArr.length; i++) {
                let obj = nodesArr[i];
                    obj.Voting_right = edgesArr[i] ? edgesArr[i].label : '';
                    delete obj.from;
                    delete obj.to;
                    delete obj.id;
                    delete obj.image;
                    delete obj.brokenImage;
                    delete obj.shape;
                    delete obj.group;
                    delete obj.title;
                tempArr.push(obj);
            }
            this.jsonToCsv(tempArr);
        });
    }

    openFile(event) {
        let input = event.target;
        let f = input.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            let data = e.target.result;
            let cavResult = this.XLSXReader(data);

            this.creator.fillItemsList(cavResult);
        };
        reader.readAsBinaryString(f);
    };

    footerTab1() {
        $(".modal-footer").empty();
        $(".modal-footer").append('<button type="button" class="btn btn-danger" data-dismiss="modal" id="node-delete">Delete</button>');
        $(".modal-footer").append('<button type = "button" class="btn btn-primary" data-dismiss="modal" id="node-edit">Save</button>');
        document.getElementById("node-edit").onclick = this.creator.editNode.bind(this.creator);
        document.getElementById("node-delete").onclick = this.creator.deleteNode.bind(this.creator);
    }

    footerTab2() {
        $(".modal-footer").empty();
        $(".modal-footer").append('<button type = "button" class="btn btn-primary" id="node-add">Add</button>');
        document.getElementById("node-add").onclick = this.creator.addNode.bind(this.creator);
    }

    footerTab3() {
        $(".modal-footer").empty();
        $(".modal-footer").append('<button type = "button" class="btn btn-primary" id="person-add">Add</button>');
        document.getElementById("person-add").onclick = this.creator.addPerson.bind(this.creator);
    }

    footerTab4() {
        $(".modal-footer").empty();
        $(".modal-footer").append('<button type = "button" class="btn btn-primary" id="add-edge">Save</button>');
        document.getElementById("add-edge").onclick = this.creator.addEdge.bind(this.creator);
    }
}