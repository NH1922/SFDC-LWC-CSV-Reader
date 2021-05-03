import { parseCSV, parseCSVSync} from 'c/jsUtil';
import { LightningElement } from 'lwc';

export default class CreateRecordsFromCSV extends LightningElement {
    tableData
    tableColumns
    // parseData
    showSpinner = false

    handleFilesChange(event) {
        this.showSpinner = true
        this.parseData = []
        this.tableColumns = []
        this.tableData = []
        let files = event.detail.files;
        [...files].forEach(file => {
            this.readFileAsCSV(file)
        })
    }

    readFileAsCSV(file) {
        //console.log('Reading data as CSV')
        let fileData
        let fileReader = new FileReader()
        fileReader.onload = () => {
            console.log('File Read')
            let csvArray = [...parseCSV(fileReader.result)]
            console.log('Rows read : ', csvArray)
            // let csvArray = parseCSVSync(fileReader.result)

            /* if csvArray is blank, show error in processing csv*/

            // this.parseData = csvArray
            // this.tableColumns = csvArray[0].map(item => {
            //     return {
            //         label: item,
            //         fieldName: item.replace(' ', '_')
            //     }
            // })
            //console.log(this.tableColumns)
            // this.tableData = csvArray.slice(1).map((data) => {
            //     let dataAsObject = {}
            //     for(let i in data){
            //         dataAsObject[this.tableColumns[i].fieldName] = data[i]
            //     }
            //     return dataAsObject
            // })
            this.showSpinner = false
            //console.log(this.tableData)
        }
        fileReader.readAsText(file)
    }
}