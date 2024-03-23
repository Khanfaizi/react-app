import moment from "moment";

const convertDate  = (date) =>{
    if(!date){
        return null
    }

    return moment(date).format("MMMM D ,[at] YYYY h:mm a")
};

 export const helpservice = {
    convertDate,
}