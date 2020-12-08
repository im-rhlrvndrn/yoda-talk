let translationInput = document.querySelector('#translation_input');
let translationButton = document.querySelector('#translationButton');
let errorText = document.querySelector('#errorText');

console.log(translationInput);
console.log(translationButton);
console.log(errorText);

const endpointURL = 'https://api.funtranslations.com/translate/yoda.json';

const getTranslationURL = (text) => {
    return `${endpointURL}?text=${text}`;
};

const clickEventHandler = () => {
    console.log('click event triggered');
    const inputText = translationInput.value;
    translationInput.value = '';
    translationInput.placeholder =
        "Hold on. We've requested the Yoda to translate for you...";

    fetch(getTranslationURL(inputText))
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            let translatedText = json.contents.translated;
            translationInput.placeholder = 'Type something';
            translationInput.value = translatedText;
        })
        .catch((error) => {
            errorText.style.display = 'block';
            errorText.innerHTML = 'You crossed the request limit (5 per hour)';
            translationInput.placeholder = 'Type something';
            setTimeout(() => {
                errorText.style.display = 'none';
            }, 2000);
        });
};
translationButton.addEventListener('click', clickEventHandler);
