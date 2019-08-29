function  tonow(data){
    var curdate=new Date();
    var msnum=curdate.getTime()-Number(data);
    var day=Math.floor(msnum/1000/60/60/24);
    var hour=(Math.floor(msnum/1000/60/60))%24;
    var min=(Math.floor(msnum/1000/60))%60;
    var second=(Math.floor(msnum/1000))%60;
    var mssecond=(Math.floor(msnum))%1000;
    if(day==0){
        if(hour==0){
            if(min==0){
                if(second==0){
                    if(mssecond==0){
                        return "刚刚发表"
                    }
                    else{
                        return "刚刚发表"
                    }
                }
                else{
                    return "刚刚发表"
                }
            }
            else{
                return min+"分钟前"
            }
        }
        else{
            return hour+"小时"+min+"分钟前"
        }
    }
    else{
        return day+"天"+hour+"小时"+min+"分钟前"
    }
}

export default tonow