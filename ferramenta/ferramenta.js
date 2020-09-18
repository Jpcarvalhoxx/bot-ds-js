

const limparEspacamentos = (args) => {

    args = args.substring(5, args.length);

    if (args.charAt(0) == " ") {
        while (true) {
            if (args.charAt(0) == ' ') {
                args = args.substring(1, args.length);
            } else {
                break;
            }
        }
    }

    return args;

};

const limparLicensedContent = (songInfo) => {
var videos =[];

   for (let i = 0; i < songInfo.length; i++) {
        if (songInfo[i].data.items[0].contentDetails.regionRestriction != undefined) {
            if (songInfo[i].data.items[0].contentDetails.regionRestriction.blocked != undefined){
                if (!songInfo[i].data.items[0].contentDetails.regionRestriction.blocked.includes('BR')) {
                    songInfo.splice(i, 1);
                    i = 0;
                    break;
                }
            }

            if (songInfo[i].data.items[0].contentDetails.regionRestriction.allowed != undefined){
                if (!songInfo[i].data.items[0].contentDetails.regionRestriction.allowed.includes('BR')) {
                    songInfo.splice(i, 1);
                    i = 0;
                    break;
                }
            }
        }
    }
    return songInfo;

};

exports.limparEspacamentos = limparEspacamentos;
exports.limparLicensedContent = limparLicensedContent;



/*if (!songInfo[i].data.items[0].contentDetails.licensedContent) {
    songInfo.splice(i, 1);
    i = 0;
}
*/

