runAfterAppReady(() => { // 앱 준비 후 실행, jQuery 사용가능 
    console.log("custom_answer_check.js 실행");

    // 리셋 버튼 클릭 시 실행할 커스텀 함수
<<<<<<< HEAD
    window.resetCustom = function() {
    $(".option_group input").prop("checked", false);
    };

    // 제출 버튼 클릭 시 커스텀 검증 로직
    window.customValidateBeforeSubmit = function({ hasEmpty, isSelfCheckMissing, rules }) {
        const inputs = pagenation.activePage.querySelectorAll("[data-answer-single]");

        inputs.forEach(input => {
            if(input.dataset.correction == "false"){
=======
    window.resetCustom = function () {
        $(".option_group input").prop("checked", false);
    };

    // 제출 버튼 클릭 시 커스텀 검증 로직
    window.customValidateBeforeSubmit = function ({
        hasEmpty,
        isSelfCheckMissing,
        rules
    }) {
        const inputs = pagenation.activePage.querySelectorAll("[data-answer-single]");
        inputs.forEach(input => {
            if (frutInput && snackInput && input.dataset.correction == "false") {
>>>>>>> b1dd6843 (초기 커밋)
                input.classList.add("hint");
            }
        });

        return true; // 기본 로직 계속 실행
    };
<<<<<<< HEAD
});

=======

    const btnSubmit = document.querySelector('.btnSubmit');

    btnSubmit.addEventListener('click', () => {
        const fruitValue = $("input[name='fruit']:checked").val();
        const snackValue = $("input[name='snack']:checked").val();
        if (!fruitValue && !snackValue) {
            toastCheckMsg("문제를 풀어보세요!", 1, false);
        }
      });

    // 라디오 버튼 변경 시 정답 조합 업데이트
    $("input[name='fruit'], input[name='snack']").on("change", function () {
        $('.btnSubmit').addClass("active");
        $('.btnReset').addClass("active");
        updateAnswerBasedOnSelection();
    });

    // 선택된 조합에 따라 정답 업데이트하는 함수
    function updateAnswerBasedOnSelection() {
        const fruitValue = $("input[name='fruit']:checked").val();
        const snackValue = $("input[name='snack']:checked").val();

        if (fruitValue && snackValue) {
            const comboKey = `${fruitValue}-${snackValue}`;
            const comboData = $(`.combo_map [data-combo="${comboKey}"]`);

            if (comboData.length) {
                const textAnswer = comboData.data("text");
                const formulaAnswer = comboData.data("formula");

                // 정답 필드 업데이트
                $(".quiz1 .text_input").attr("data-answer-single", textAnswer);
                $(".quiz2 .formula_input").attr("data-answer-single", formulaAnswer);
            }
        }
    }
});
>>>>>>> b1dd6843 (초기 커밋)
