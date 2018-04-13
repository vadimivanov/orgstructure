export class Customizer {

    constructor(scope) {
        this.images = {
            company: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB3aWR0aD0iMTc5MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTQ3MiAwcTI2IDAgNDUgMTl0MTkgNDV2MTY2NHEwIDI2LTE5IDQ1dC00NSAxOWgtMTI4MHEtMjYgMC00NS0xOXQtMTktNDV2LTE2NjRxMC0yNiAxOS00NXQ0NS0xOWgxMjgwem0tODMyIDI4OHY2NHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3YtNjRxMC0xNC05LTIzdC0yMy05aC02NHEtMTQgMC0yMyA5dC05IDIzem0wIDI1NnY2NHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3YtNjRxMC0xNC05LTIzdC0yMy05aC02NHEtMTQgMC0yMyA5dC05IDIzem0wIDI1NnY2NHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3YtNjRxMC0xNC05LTIzdC0yMy05aC02NHEtMTQgMC0yMyA5dC05IDIzem0wIDI1NnY2NHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3YtNjRxMC0xNC05LTIzdC0yMy05aC02NHEtMTQgMC0yMyA5dC05IDIzem0tMTI4IDMyMHYtNjRxMC0xNC05LTIzdC0yMy05aC02NHEtMTQgMC0yMyA5dC05IDIzdjY0cTAgMTQgOSAyM3QyMyA5aDY0cTE0IDAgMjMtOXQ5LTIzem0wLTI1NnYtNjRxMC0xNC05LTIzdC0yMy05aC02NHEtMTQgMC0yMyA5dC05IDIzdjY0cTAgMTQgOSAyM3QyMyA5aDY0cTE0IDAgMjMtOXQ5LTIzem0wLTI1NnYtNjRxMC0xNC05LTIzdC0yMy05aC02NHEtMTQgMC0yMyA5dC05IDIzdjY0cTAgMTQgOSAyM3QyMyA5aDY0cTE0IDAgMjMtOXQ5LTIzem0wLTI1NnYtNjRxMC0xNC05LTIzdC0yMy05aC02NHEtMTQgMC0yMyA5dC05IDIzdjY0cTAgMTQgOSAyM3QyMyA5aDY0cTE0IDAgMjMtOXQ5LTIzem0wLTI1NnYtNjRxMC0xNC05LTIzdC0yMy05aC02NHEtMTQgMC0yMyA5dC05IDIzdjY0cTAgMTQgOSAyM3QyMyA5aDY0cTE0IDAgMjMtOXQ5LTIzem01MTIgMTI4MHYtMTkycTAtMTQtOS0yM3QtMjMtOWgtMzIwcS0xNCAwLTIzIDl0LTkgMjN2MTkycTAgMTQgOSAyM3QyMyA5aDMyMHExNCAwIDIzLTl0OS0yM3ptMC01MTJ2LTY0cTAtMTQtOS0yM3QtMjMtOWgtNjRxLTE0IDAtMjMgOXQtOSAyM3Y2NHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3ptMC0yNTZ2LTY0cTAtMTQtOS0yM3QtMjMtOWgtNjRxLTE0IDAtMjMgOXQtOSAyM3Y2NHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3ptMC0yNTZ2LTY0cTAtMTQtOS0yM3QtMjMtOWgtNjRxLTE0IDAtMjMgOXQtOSAyM3Y2NHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3ptMC0yNTZ2LTY0cTAtMTQtOS0yM3QtMjMtOWgtNjRxLTE0IDAtMjMgOXQtOSAyM3Y2NHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3ptMjU2IDEwMjR2LTY0cTAtMTQtOS0yM3QtMjMtOWgtNjRxLTE0IDAtMjMgOXQtOSAyM3Y2NHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3ptMC0yNTZ2LTY0cTAtMTQtOS0yM3QtMjMtOWgtNjRxLTE0IDAtMjMgOXQtOSAyM3Y2NHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3ptMC0yNTZ2LTY0cTAtMTQtOS0yM3QtMjMtOWgtNjRxLTE0IDAtMjMgOXQtOSAyM3Y2NHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3ptMC0yNTZ2LTY0cTAtMTQtOS0yM3QtMjMtOWgtNjRxLTE0IDAtMjMgOXQtOSAyM3Y2NHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3ptMC0yNTZ2LTY0cTAtMTQtOS0yM3QtMjMtOWgtNjRxLTE0IDAtMjMgOXQtOSAyM3Y2NHEwIDE0IDkgMjN0MjMgOWg2NHExNCAwIDIzLTl0OS0yM3oiLz48L3N2Zz4=',
            individual: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4IiB3aWR0aD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTM4IDZoLTJ2LTRoLTR2NGgtMTZ2LTRoLTR2NGgtMmMtMi4yMSAwLTQgMS43OS00IDR2MjhjMCAyLjIxIDEuNzkgNCA0IDRoMjhjMi4yMSAwIDQtMS43OSA0LTR2LTI4YzAtMi4yMS0xLjc5LTQtNC00em0tMTQgNmMzLjMxIDAgNiAyLjY5IDYgNiAwIDMuMzItMi42OSA2LTYgNnMtNi0yLjY4LTYtNmMwLTMuMzEgMi42OS02IDYtNnptMTIgMjRoLTI0di0yYzAtNCA4LTYuMiAxMi02LjJzMTIgMi4yIDEyIDYuMnYyeiIvPjxwYXRoIGQ9Ik0wIDBoNDh2NDhoLTQ4eiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg=='
        };
    }

    drawingNodes(network, nodes) {
        this.network = network;
        this.nodes = nodes;
        let elements = this.nodes._data;

        for (let i in elements) {
            let svg = `<svg xmlns = "http://www.w3.org/2000/svg" width="150" height="80">
                          <rect x="0" y="0" width="150" height="80" fill="#eeeeee"/>
                          <foreignObject x="0" y="0" width="150" height="80">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                              <div class="title" style="color: #f7f7f7;text-align: center;background: #0055aa; width: 100%;font-family: Roboto, sans-serif; ">${elements[i].title}</div>
                              <div class="description" style=" color: #000000; float: right; font-family: Roboto, sans-serif; font-size: 15px">description</div>
                              <div class="label-icon" style="float: left; margin: 5px 0 0 0">
                              <img x="0" y="0" width="60" height="40" src="${this.images[elements[i].group]}" alt="${elements[i].group}" />
                              </div>                                               
                            </body>                     
                          </foreignObject>
                        </svg>`;

            let url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
            elements[i].image = url;
        }
        this.network.redraw();
    }
}