export class Helpers {
    constructor() {
        this.getCurrentNode = function(id, list) {
            let node = list.filter(node => node.id === id);
            return node;
        };
        this.toArray = function(list) {
            let arr = [];
            for (let i in list) {
                arr.push(list[i]);
            }
            return arr;
        }
    }
}