export class Models {
    constructor() {
        this.tableNode = {
            CRO_Number: "",
            Salutaion: "",
            FirstName: "",
            LastName: "",
            SharesNumber: "",
            SharesType: "",
            Voting_right: "",
            Shareholder_regno: ""
        };
        this.options = {
            manipulation: {
                enabled: true,
                initiallyActive: false,
                addNode: false,
                addEdge: true,
                editEdge: true,
                deleteNode: true,
                deleteEdge: true,
                controlNodeStyle:{
                    // all node options are valid.
                }
            },
            physics: {
                enabled: false,
                hierarchicalRepulsion: {
                    centralGravity: 0.0,
                    springLength: 200,
                    springConstant: 0.005,
                    nodeDistance: 120,
                    damping: 0.09
                }
            },
            edges: {
                smooth: {
                    roundness: 0.3,
                    type: 'horizontal'
                }
            },
            layout: {
                hierarchical: {
                    direction: "UD",
                    sortMethod: "directed"
                }
            },
            groups:{
                person: {
                    title: "Person",
                    shape: 'image'
                },
                people: {
                    title: "People",
                    shape: 'image'
                },
                company: {
                    title: "Company",
                    shape: 'image'
                },
                individual: {
                    title: "Individual",
                    shape: 'image'
                }
            }
        };
    }
}