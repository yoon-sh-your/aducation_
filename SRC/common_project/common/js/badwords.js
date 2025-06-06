
/** 금칙어 설정 기능 */
// 모든 input 및 textarea 요소 가져오기
const inputElements = document.querySelectorAll("input:not([type='range']), textarea, math-field");
<<<<<<< HEAD

inputElements.forEach(element => {

    ["input", "change", "paste"].forEach(eventType => {
        element.addEventListener(eventType, (event) => {
            event.preventDefault();
            event.stopPropagation();

            let value = element.value;

            if (element.tagName === "MATH-FIELD") {
                value = element.getValue("plain-text");
            }

            let filteredContent = isBlockWord(value);
            if (filteredContent) {
                console.log(`event.type: ${event.type}, isComposing: ${event.isComposing}, 금칙어: ${value} -> ${filteredContent}`);
                if (element.tagName === "MATH-FIELD") {
                    element.setValue(''); // 금칙어가 포함된 경우 입력값 초기화
                } 
                element.value = ""; // 금칙어가 포함된 경우 입력값 초기화
                console.log(`남은 글자: ${element.value}`);

                toastCheckMsg("부적절한 단어가 사용되었습니다. 다시 작성하세요.");
=======
let isInputComposing = false; // 현재 한글 조합 중인지 여부를 관리하는 플래그

inputElements.forEach(element => {

    element.addEventListener('compositionstart', function() {
        isInputComposing = true;
    });
    element.addEventListener('compositionend', function() {
        isInputComposing = false;
    });

    ["input", "change", "paste"].forEach(eventType => {
        element.addEventListener(eventType, (event) => {
            if (!isInputComposing) {
                event.preventDefault();
                event.stopPropagation();

                let value = element.value;

                if (element.tagName === "MATH-FIELD") {
                    value = element.getValue("plain-text");
                }

                let filteredContent = isBlockWord(value);
                if (filteredContent) {
                    console.log(`event.type: ${event.type}, isComposing: ${event.isComposing}, 금칙어: ${value} -> ${filteredContent}`);
                    if (element.tagName === "MATH-FIELD") {
                        element.setValue('\\text{}'); // 금칙어가 포함된 경우 입력값 초기화
                    } 
                    element.value = ""; // 금칙어가 포함된 경우 입력값 초기화
                    console.log(`남은 글자: ${element.value}`);

                    toastCheckMsg("부적절한 단어가 사용되었습니다. 다시 작성하세요.");
                }
>>>>>>> b1dd6843 (초기 커밋)
            }
        });        
    });
});