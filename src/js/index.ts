import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface IMeasurement {
    id: number
    pressure: number
    humidity: number
    temperature: number
}

let url: string ="https://anbo-measurements.azurewebsites.net/api/measurements"

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        name: "",
        greeting: "",
        measurements: [],
        id: null,
        measurement: null,
        addData: {pressure: 0, humidity: 0, temperature: 0},
        addMessage: null
    },
    created() {
      this.getAll()
    },
    methods: {
        getAll() {
            axios.get<IMeasurement[]>(url)
            .then((response: AxiosResponse<IMeasurement[]>) => {
                this.measurements = response.data
            })
            .catch((error: AxiosError) => {
                //this.message = error.message
                alert(error.message) // https://www.w3schools.com/js/js_popup.asp
            })
        },

        getById(id: number) {
            axios.get<IMeasurement>(url + "/" + id)
            .then((response: AxiosResponse<IMeasurement>) => {
                this.measurement = response.data
            })
            .catch((error: AxiosError) => {
                //this.message = error.message
                alert(error.message) // https://www.w3schools.com/js/js_popup.asp
            })
        },

        add() {
            axios.post<IMeasurement>(url, this.addData)
                .then((response: AxiosResponse) => {
                    let message: string = "response " + response.status + " " + response.statusText
                    this.addMessage = message
                    this.getAll()
                })
                .catch((error: AxiosError) => {
                    // this.addMessage = error.message
                    alert(error.message)
                })
        }
    }
})