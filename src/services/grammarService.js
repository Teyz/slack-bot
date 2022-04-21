const LanguageToolApi = require('language-grammar-api');

const options = {
    endpoint: 'https://languagetool.org/api/v2'
};

const languageToolClient = new LanguageToolApi(options);

exports.checkText = async (textToCheck) => {
    const checkText = await languageToolClient.check({
        text: textToCheck,
        language: 'fr'
    });
    checkText.matches = undefined;
    if(checkText.matches === undefined){
        console.log('error');
    } else {
        if(checkText.matches.length > 0){
            return false;
        }
        return true;
    }
}
