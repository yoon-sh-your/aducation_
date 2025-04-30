runAfterAppReady(() => {
<<<<<<< HEAD
    const mathFields = document.querySelectorAll(`${pageSelector} math-field`);
    const submitBtn = document.querySelector(".btnSubmit");
    const resetBtn = document.querySelector(".btnReset");

    function isFilled(field) {
        const value = typeof field.getValue === "function"
            ? field.getValue().trim()
            : field.textContent.trim();
        return value !== "";
    }

    if (mathFields.length > 0 && submitBtn && resetBtn) {
        defineButtonClassRules([
            {
                selector: `math-field`,
                key: "all_math_fields_filled",
                test: () => Array.from(mathFields).every(isFilled),
                setClass: [
                    { target: ".btnSubmit", class: "active" },
                    { target: ".btnSubmit", class: "is-disabled", remove: true },
                ],
            },
        ]);


        window.forceWatchEvaluation();
    }
=======
    window.customCheckCondition = function () {
        // 첫 번째 필드
        const mathField = document.querySelector(".input_wrap math-field.textarea");
        const value = mathField && (typeof mathField.getValue === "function" ? mathField.getValue() : mathField?.value || "");
        const isFilled = !!(value && value.trim() !== "");

        // 두 번째 필드
        const mathField2 = document.querySelector(".input_wrap math-field.answer-field");
        const value2 = mathField2 && (typeof mathField2.getValue === "function" ? mathField2.getValue() : mathField2?.value || "");
        const isFilled2 = !!(value2 && value2.trim() !== "");

        if (!isFilled || !isFilled2) {
            return "empty";
        }

        // \text{...} 제거 함수
        function parseMathfieldValue(val) {
            return val.replace(/\\text\{([^}]*)\}/g, "$1").trim();
        }

        const parsedValue2 = parseMathfieldValue(value2);
        const answer = mathField2?.dataset?.answerSingle ?? mathField2?.getAttribute("data-answer-single") ?? "";
        const isCorrect = parsedValue2 === answer.trim();

        // 정답이 맞으면 example_box에 on 클래스 추가
        if (isCorrect) {
            const exampleBox = document.querySelector('.example_box');
            if (exampleBox) {
                exampleBox.classList.add('on');
            }
        }

        return isCorrect;
    };
>>>>>>> b1dd6843 (초기 커밋)
});
