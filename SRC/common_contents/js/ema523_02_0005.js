document.addEventListener("DOMContentLoaded", function () {
  const selects = document.querySelectorAll(".custom_dropdown");
<<<<<<< HEAD
  const checkBtn = document.querySelector(".btnSample");
  const resetBtn = document.querySelector(".btnReset");
  let isResetting = false; // 리셋 중 플래그

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        console.warn("🔴 btnSample 클래스 변경됨:", checkBtn.classList.value);
      }
    }
  });
  
  observer.observe(checkBtn, { attributes: true });
  

  // ✅ img_box 클릭시 selected + data-color-select 설정
  document.querySelectorAll('.img_box').forEach(box => {
    box.addEventListener("click", function () {
      if (window.isResetting) return; // 리셋 중 클릭 방지
      this.classList.add("selected");
    
      let selectedColor = "";
      const select = this.querySelector("select");
      if (select) selectedColor = select.value || "";
      this.setAttribute("data-color-select", selectedColor);
    });
    
    

    // ✅ 초기 answer-single 값 저장
    const initialAnswer = box.getAttribute("data-answer-single") || "";
    box.setAttribute("data-initial-answer", initialAnswer);
  });

  // ✅ select 변경 시 data-color, data-correction, selected 값 설정
  selects.forEach(select => {
    select.addEventListener("change", function () {
      if (isResetting) return;

      checkBtn.classList.add("active");
      resetBtn.classList.add("active");

      const parentBox = this.closest(".img_box");
      const selectedColor = this.value;

      parentBox.setAttribute("data-color", selectedColor);
      this.setAttribute("data-color", selectedColor);
      parentBox.classList.add("selected");
      parentBox.setAttribute("data-color-select", selectedColor);

      const answer = parentBox.getAttribute("data-answer-single");
      const pairKey = parentBox.getAttribute("data-color-pair");
      const allBoxes = Array.from(document.querySelectorAll(".img_box"));

      let correction = "false";

      if (answer === "empty_answer") {
        correction = selectedColor === "" ? "true" : "false";
      } else if (selectedColor !== "") {
        const pairBox = allBoxes.find(box =>
          box !== parentBox &&
          box.getAttribute("data-answer-single") === answer &&
          box.getAttribute("data-color-pair") === pairKey
        );

        const pairColor = pairBox?.getAttribute("data-color");

        if (pairBox && pairColor === selectedColor) {
          correction = "true";
          pairBox.setAttribute("data-correction", "true");
        } else {
          correction = "false";
          if (pairBox) pairBox.setAttribute("data-correction", "false");
        }
      }

      parentBox.setAttribute("data-correction", correction);
      this.setAttribute("data-correction", correction);

      // ✅ 실시간으로 answer-single 자동 업데이트
      const colorSelect = parentBox.getAttribute("data-color-select");
      const color = parentBox.getAttribute("data-color");
      const pair = parentBox.getAttribute("data-color-pair");
      if (colorSelect && color && pair && colorSelect === color) {
        const matched = Array.from(document.querySelectorAll(`.img_box[data-color-pair="${pair}"]`))
          .every(box => box.getAttribute("data-color-select") === color && box.getAttribute("data-color") === color);

        if (matched) {
          const relatedBoxes = document.querySelectorAll(`.img_box[data-color-pair="${pair}"]`);
          relatedBoxes.forEach(box => {
            box.setAttribute("data-answer-single", color);
          });
        }
      }
    });
  });

  checkBtn.addEventListener("click", function () {
    const boxes = document.querySelectorAll(".img_box");
    const resetBtn = document.querySelector(".btnReset");

    const isShowingSample = [...boxes].some(box => box.classList.contains("sample"));
  
    setTimeout(() => {
      // 100ms 후에도 class 유지 강제 재설정
      const expectedClass = isShowingSample ? "btnSample active" : "btnSample close";
      checkBtn.className = expectedClass;
    }, 50);
  
    // 먼저 클래스 제거
    checkBtn.classList.remove("active", "close");
  
    if (isShowingSample) {
      // sample이 보이는 상태였다면 제거 → active 상태
      checkBtn.classList.add("active");
      boxes.forEach(box => box.classList.remove("sample"));
  
      // ✅ close가 제거되었으므로 resetBtn에 active 추가
      resetBtn.classList.add("active");
    } else {
      // sample이 없었으면 추가 → close 상태
      checkBtn.classList.add("close");
      boxes.forEach(box => box.classList.add("sample"));
  
      // ✅ close 상태일 때 resetBtn에 active 제거
      resetBtn.classList.remove("active");
    }
  
    //console.log("📌 현재 checkBtn classList:", checkBtn.classList.value);
  });
  
  

=======
  //const checkBtn = document.querySelector(".btnCheck");
  const resetBtn = document.querySelector(".btnReset");
  let isResetting = false; // 리셋 중 플래그

  document.querySelectorAll('.img_box').forEach(box => {
    const answer = (box.getAttribute("data-answer-single") || "").trim().toLowerCase();
    const pair = (box.getAttribute("data-color-pair") || "").trim().toLowerCase();
    
    box.setAttribute("data-initial-answer", answer); // 기존 코드
    box.setAttribute("data-initial-answer-pair", pair); // 🔥 추가: pair 초기값 저장
  });
  
  
  document.querySelectorAll('.custom_select.math_symbol .select_options li').forEach(li => {
    li.addEventListener('click', function () {
      const value = li.getAttribute('data-value');
      const wrapper = li.closest('.dropdown_wrap');
      const select = wrapper?.querySelector('select.custom_dropdown.math_symbol');
  
      if (!select) return;
  
      // ✅ 핵심: select 동기화
      select.value = value;
      select.setAttribute("data-color", value);
      select.setAttribute("data-color-select", value);
      select.setAttribute("data-answer-single", value);    // 🔥 핵심 포인트
      select.setAttribute("data-correction", "true");
  
      // ✅ 평가 로직 트리거
      const evt = new Event("change", { bubbles: true });
      select.dispatchEvent(evt);
    });
  });
    
  document.querySelectorAll('select.custom_dropdown.math_symbol').forEach((el, i) => {
    console.log(`🔍 [select ${i+1}]`, {
      value: el.value,
      color: el.getAttribute('data-color'),
      answer: el.getAttribute('data-answer-single'),
      correction: el.getAttribute('data-correction'),
    });
  });

  function evaluateAllCorrections() {
    const allTargets = Array.from(document.querySelectorAll('.img_box, .custom_dropdown.math_symbol'));
    
    const grouped = {}; // 그룹핑
  
    allTargets.forEach(el => {
      const pair = (el.getAttribute("data-color-pair") || "").trim();
      if (!pair) return;
  
      if (!grouped[pair]) grouped[pair] = [];
      grouped[pair].push(el);
    });
  
    Object.entries(grouped).forEach(([pair, group]) => {
      let correction = "false";
  
      if (pair === "empty_answer") {
        // ✅ empty_answer는 개별로 판단
        group.forEach(el => {
          const selected = (el.getAttribute("data-color-select") || "").trim();
          const thisCorrection = selected === "" ? "true" : "false";
  
          el.setAttribute("data-correction", thisCorrection);
  
          const tag = el.tagName.toLowerCase();
          if (tag !== "select") {
            const select = el.querySelector("select.custom_dropdown.math_symbol");
            if (select) {
              select.setAttribute("data-correction", thisCorrection);
            }
          }
  
          console.log(`[empty_answer개별] correction = ${thisCorrection}`, el);
        });
  
      } else {
        // ✅ 일반 그룹은 전체 색이 같으면 true
        const selectedColors = group.map(el => (el.getAttribute("data-color-select") || "").trim());
        const hasEmpty = selectedColors.some(color => color === "");
  
        const allSameColor = selectedColors.every(color => color && color === selectedColors[0]);
        correction = (!hasEmpty && allSameColor) ? "true" : "false";
  
        group.forEach(el => {
          el.setAttribute("data-correction", correction);
  
          const tag = el.tagName.toLowerCase();
          if (tag !== "select") {
            const select = el.querySelector("select.custom_dropdown.math_symbol");
            if (select) {
              select.setAttribute("data-correction", correction);
            }
          }
  
          console.log(`[group: ${pair}] correction = ${correction}`, el);
        });
      }
    });
  }
  
  
  
  function updateAnswerSingleIfValid() {
    const pairs = new Set();
  
    document.querySelectorAll(".img_box, .custom_dropdown.math_symbol").forEach(el => {
      const pair = el.getAttribute("data-color-pair");
      if (pair) pairs.add(pair);
    });
  
    pairs.forEach(pair => {
      const group = Array.from(document.querySelectorAll(
        `.img_box[data-color-pair="${pair}"], .custom_dropdown.math_symbol[data-color-pair="${pair}"]`
      ));
  
      const allSameColor = group.every(el =>
        el.getAttribute("data-color-select") &&
        el.getAttribute("data-color-select") === group[0].getAttribute("data-color-select")
      );
  
      const allCorrect = group.every(el =>
        el.getAttribute("data-correction") === "true"
      );
  
      if (group.length > 0 && allSameColor && allCorrect) {
        group.forEach(el => {
          const current = el.getAttribute("data-answer-single");
          const selected = el.getAttribute("data-color-select");
  
          if (selected) {
            if (current !== selected) {
              el.setAttribute("data-answer-single", selected);
            }
  
            el.setAttribute("data-correction", "true");
  
            if (el.tagName.toLowerCase() !== "select") {
              const select = el.querySelector("select.custom_dropdown.math_symbol");
              if (select) {
                select.setAttribute("data-answer-single", selected);
                select.setAttribute("data-correction", "true");
              }
            }
          }
        });
      }
    });
  }
  
  

  // ✅ img_box 클릭시 selected + data-color-select 설정
  document.querySelectorAll(".page.on .img_box").forEach(box => {
    box.classList.remove("selected", "sample", "correct", "wrong", "hint");
    box.removeAttribute("data-correction");
  
    const initial = box.getAttribute("data-initial-answer") || "empty_answer";
    box.setAttribute("data-answer-single", initial);
  });

  document.querySelectorAll('.custom_select.math_symbol .select_options li').forEach(li => {
    li.addEventListener('click', function () {
      const value = li.getAttribute('data-value');
      const wrapper = li.closest('.dropdown_wrap');
      const select = wrapper.querySelector('select.custom_dropdown.math_symbol');
  
      if (!select) return;
  
      // ✅ 선택한 값을 <select> 요소에도 반영
      select.value = value;
      select.setAttribute("data-color", value);
      select.setAttribute("data-color-select", value);
  
      // ✅ "change" 이벤트 강제 발생
      const changeEvent = new Event('change', { bubbles: true });
      select.dispatchEvent(changeEvent);
    });
  });
  

  // ✅ select 변경 시 data-color, data-correction, selected 값 설정
  selects.forEach(select => {
    select.addEventListener("change", function () {
      if (window.isResetting || this.dataset.silentReset === "true") {
        this.dataset.silentReset = "";
        return;
      }
    
      const box = this.closest(".img_box") || this;
      const selectedColor = this.value || "";
    
      box.setAttribute("data-color", selectedColor);
      box.setAttribute("data-color-select", selectedColor);
      box.classList.add("selected");
    
      // ✅ 항상 최신 상태 반영
      evaluateAllCorrections();
      updateAnswerSingleIfValid();
    });        
  });

  document.querySelector(".btnCheck").addEventListener("click", function () {
    const boxes = document.querySelectorAll(".img_box");
    
    const allCorrect = [...boxes].every(box => {
      const answer = (box.getAttribute("data-answer-single") || "").trim().toLowerCase();
      const selected = (box.getAttribute("data-color-select") || "").trim().toLowerCase();
      const correction = box.getAttribute("data-correction");
      const pair = (box.getAttribute("data-color-pair") || "").trim().toLowerCase();
      const initialPair = (box.getAttribute("data-initial-answer-pair") || pair).trim().toLowerCase();
    
      let isPairCorrect = true;
      if (pair !== "empty_answer" && initialPair !== "empty_answer") {
        isPairCorrect = pair === initialPair;
      }
    
      const isCorrect =
        correction === "true" &&
        selected === answer &&
        isPairCorrect;  // 🔥 추가 : pair 비교도 포함
    
      console.log(`[${box.className}]`, {
        answer,
        selected,
        correction,
        pair,
        initialPair,
        isPairCorrect,
        isCorrect
      });
    
      return isCorrect;
    });
  
    if (allCorrect) {
      console.log("✅ 전체 정답");
      document.querySelector(".btnCheck").classList.add("success");
    } else {
      console.log("❌ 오답 있음");
      document.querySelector(".btnCheck").classList.add("wrong");
    }
  });
  
  
>>>>>>> b1dd6843 (초기 커밋)
  // ✅ reset 버튼 이벤트 (전역에서 실행)
  resetBtn.addEventListener("click", function () {
    if (typeof window.resetCustom === "function") {
      window.resetCustom();
<<<<<<< HEAD
=======
      window.forceWatchEvaluation();
>>>>>>> b1dd6843 (초기 커밋)
    }
  });
});

<<<<<<< HEAD
=======

>>>>>>> b1dd6843 (초기 커밋)
 // ✅ runAfterAppReady 내에 resetCustom 정의
 runAfterAppReady(() => {
  window.resetCustom = function () {
    window.isResetting = true;
<<<<<<< HEAD

    // ✅ 버튼 비활성화
    document.querySelectorAll("button").forEach(btn => {
      btn.classList.remove("active", "close");
    });
  
    // ✅ 모든 img_box 상태 초기화
    document.querySelectorAll(".img_box").forEach(box => {
      box.classList.remove("selected", "sample", "correct", "wrong");
  
      // data-* 속성 정리
      const preserved = ["data-initial-answer", "data-color-pair"];
      [...box.attributes].forEach(attr => {
        if (attr.name.startsWith("data-") && !preserved.includes(attr.name)) {
          box.removeAttribute(attr.name);
        }
      });
  
      // answer 복원
      const initialAnswer = box.getAttribute("data-initial-answer") || "";
      box.setAttribute("data-answer-single", initialAnswer);
  
      // select 초기화
      const select = box.querySelector("select");
      if (select) {
        select.value = "";
  
        // 속성 정리
        [...select.attributes].forEach(attr => {
          if (attr.name.startsWith("data-")) {
            select.removeAttribute(attr.name);
          }
        });
      }
  
      // stroke 초기화
      const path = box.querySelector("svg path");
      if (path) path.setAttribute("stroke", "#1D1D1B");
    });

    document.querySelector(".btnSample")?.classList.remove("active", "close");
    document.querySelector(".btnReset")?.classList.remove("active");
    document.querySelector(".btnCheck")?.classList.remove("active");
  
  
    // ✅ 콘솔 디버깅
    document.querySelectorAll('.img_box').forEach((box, i) => {
      console.log(`Box ${i + 1}`, {
        classList: box.className,
        correction: box.getAttribute("data-correction")
      });
    });

    // ✅ 버튼 상태 다시 강제 제거
  setTimeout(() => {
    document.querySelectorAll("button").forEach(btn => {
      btn.classList.remove("active", "close");
    });
  }, 50);

  window.isResetting = false;
  };
  
=======
  
    const currentPageId = document.querySelector("#app_wrap")?.getAttribute("data-current-page");
    const currentPage = document.querySelector(`.page.${currentPageId}`);
    if (!currentPage) {
      console.warn("❌ 현재 페이지 없음");
      return;
    }
  
    currentPage.querySelectorAll(".img_box").forEach(box => {
      box.classList.remove("selected", "correct", "wrong", "sample");
      box.removeAttribute("data-correction");
      box.removeAttribute("data-color");
      box.removeAttribute("data-color-select");
  
      const init = box.getAttribute("data-initial-answer") || "empty_answer";
      box.setAttribute("data-answer-single", init);
  
      const select = box.querySelector("select");
      if (select) {
        select.dataset.silentReset = "true";
        select.value = "";
        select.removeAttribute("data-correction");
        select.removeAttribute("data-color");
        select.removeAttribute("data-color-select");
      }
    });
  
    // ✅ 현재 페이지 안에 있는 버튼만 초기화
    currentPage.querySelector(".btnCheck")?.classList.remove("success", "wrong");
  
    window.isResetting = false;
    window.forceWatchEvaluation();
  };
  
  
  
  
  
  defineButtonClassRules([
    {
      selector: ".check_shape_wrap .img_box", //변경될 값을 감지할 태그 설정
      //아래 중 하나 활용
      //key: "check_target", // 공통 버튼과 똑같이 결정되는 활성화 여부 결정 키
      //key: "custom_reset_btn_active", // 리셋버튼 활성화 여부 결정 키
      //key: "custom_sample_btn_active", // 예시버튼 활성화 여부 결정 키
      key: "custom_check_btn_active", // 확인버튼 활성화 여부 결정 키
      //key: "custom_submit_btn_active", // 제출버튼 활성화 여부 결정 키
      test: (el) => {
        //활성화 여부 결정 로직 true 반환하면 버튼 활성화, false 반환하면 비활성화
        //el은 타겟을 의미하는 요소
        //ex) 값이 비어있거나 null인 경우로 조건 설정한 경우 예시
        const isCorrection = $(el).attr("data-correction") !== undefined;
        return isCorrection;
      }
    },
  ]);
  
>>>>>>> b1dd6843 (초기 커밋)
});
