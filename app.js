const axios=require('axios')
var fs = require('fs');
axios.get(' https://www.growpital.com').then(async(data)=>{
    let arrImageUrls=data.data.match(/(?<=img\s+).*?(?=\s+)/gs);
    if (!fs.existsSync('./download_images')){
        fs.mkdirSync('./download_images', { recursive: true });
    }
    try {
    for (let index = 0; index < arrImageUrls.length; index++) {
        const element = arrImageUrls[index];
        if (element.includes('https')) {
            var strDownloadUrl=element.replace('src="','');
            var strDownloadUrl=strDownloadUrl.replace('"','');
            let strExtention= strDownloadUrl.substring(strDownloadUrl.lastIndexOf('.') + 1);
            if (strExtention!='png'&&strExtention!='jpeg') {
                continue
            }
                    var imageData=await axios({
                        method: 'get',
                        url: strDownloadUrl,
                        responseType: 'stream'
                      })
                      imageData.data.pipe(fs.createWriteStream('./download_images/img'+index+"."+strExtention));   
                }
            }
        } catch (error) {
            console.log(error.message);
        }   
}).catch((err)=>{
    console.log(err);
})