export let Loader = (function() {
    this.XLSXReader = function(data) {
        let result = [];
        let workbook = XLSX.read(data, {type: 'binary'});
        workbook.SheetNames.forEach((sheetName) => {
            let csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
            let lines = csv.split("\n");
            let headers = lines[0].split(",");

            for (let i = 1; i < lines.length; i++) {
                if (lines[i].length) {
                    let obj = {};
                    let currentline = lines[i].split(",");

                    for (let j = 0; j < headers.length; j++) {
                        obj[headers[j]] = currentline[j];
                    }

                    result.push(obj);
                }
            }
        });
        return result;
    };

    this.exportFileToExcel = function (arr) {
        function sheet_to_workbook(sheet/*:Worksheet*/, opts)/*:Workbook*/ {
            let n = opts && opts.sheet ? opts.sheet : "Sheet1";
            let sheets = {}; sheets[n] = sheet;
            return { SheetNames: [n], Sheets: sheets };
        }

        function aoa_to_workbook(data/*:Array<Array<any> >*/, opts)/*:Workbook*/ {
            return sheet_to_workbook(XLSX.utils.aoa_to_sheet(data, opts), opts);
        }

        let wb = aoa_to_workbook(arr); // wb will be a workbook with one sheet aligning with the data
        // XLSX.writeFile(wb, "test.xlsx"); // save to test.xlsx
        /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
        let wopts = { bookType:'xlsx', bookSST:false, type:'binary' };

        let wbout = XLSX.write(wb,wopts);

        function s2ab(s) {
            let buf = new ArrayBuffer(s.length);
            let view = new Uint8Array(buf);
            for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        /* the saveAs call downloads a file on the local machine */
        saveAs(new Blob([s2ab(wbout)],{type:""}), "test.xlsx")
    };

    this.jsonToCsv = function(JSONData) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        let arrExport = [];
        let arrHeader = ['CRO_Number', 'Salutaion',	'FirstName', 'LastName', 'SharesType', 'SharesNumber', 'Voting_right', 'Shareholder_regno'];

        for (let i = 0; i < arrData.length; i++) {
            let arrBody = [];
            for (let index in arrData[i]) {
                arrBody.push(arrData[i][index]);
            }
            arrExport.push(arrBody);
        }
        arrExport.unshift(arrHeader);
        this.exportFileToExcel(arrExport);
    }
});