class Api_response {
    constructor (ststuscode,data,message="success"){
        this.statuscode=statuscode
        this.data=data
        this.message=message
        this.success=statuscode<400
    }

}
export { Api_response};