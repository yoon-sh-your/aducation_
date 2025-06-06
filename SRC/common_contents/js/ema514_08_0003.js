runAfterAppReady(() => {
  // drag_checkout 드래그앤드롭 초기화
  const $draggable = $(".drag_checkout .draggable");
  const $droppable = $(".drag_checkout .droppable");
  let selectedDraggable = null; // 선택된 드래그 아이템 추적 (추가)

  // --- 하이라이트 업데이트 함수 (클릭 시 사용) (추가) ---
  function updateCheckoutHighlights(apply) {
      $droppable.removeClass('ui-state-hover ui-droppable-active'); // 하이라이트 클래스 제거
      if (apply && selectedDraggable) {
          const isTriangle = selectedDraggable.hasClass("triangle");
          const isCircle = selectedDraggable.hasClass("circle");
          const typeClass = isTriangle ? "triangle" : isCircle ? "circle" : null;

          if (typeClass) {
              $droppable.each(function() {
                  const $drop = $(this);
                  // 기존 중복 방지 규칙: 해당 타입 요소가 없는 곳만 하이라이트
                  if ($drop.find(`.${typeClass}`).length === 0) {
                      $drop.addClass('ui-state-hover ui-droppable-active');
                  }
              });
          }
      }
  }

  // 드래그 가능한 요소 초기화
  $draggable.draggable({
    helper: "clone",
    revert: "invalid",
    revertDuration: 0,
    cursor: "move",
    start: function (event, ui) {
      // 드래그 시작 시 클릭 선택 상태 해제 (추가)
      if (selectedDraggable) {
          selectedDraggable.removeClass('selected');
          selectedDraggable = null;
          updateCheckoutHighlights(false);
      }
      ui.position.left /= globalScale;
      ui.position.top /= globalScale;
      audioManager.playSound("drag");
    },
    drag: function (event, ui) {
      ui.position.left /= globalScale;
      ui.position.top /= globalScale;
    },
    stop: function (event, ui) {
      // 드래그 종료 시 하이라이트 해제 (추가)
      updateCheckoutHighlights(false);
      // 기존 stop 로직 유지
      setTimeout(function () {
        checkAnswer(); // Check answer first

        // Now, check if any items remain and remove correction if empty
        const $group = $(".drag_group.g1");
        const hasDroppedItems =
          $group.find(".droppable .triangle, .droppable .circle").length > 0;
        if (!hasDroppedItems) {
          $group.removeAttr("data-correction");
          window.forceWatchEvaluation(); // 상태 변경 후 강제 평가
        }
      }, 50);
    },
  });

  // 드롭 가능한 영역 초기화
  $droppable.droppable({
    accept: ".drag_checkout .draggable", // 정확한 셀렉터로 수정
    tolerance: "pointer",
    drop: function (event, ui) {
      // 기존 드롭 로직 유지
      const $this = $(this); // The droppable element
      const $dragItem = $(ui.draggable); // The original dragged item
      const isTriangle = $dragItem.hasClass("triangle");
      const isCircle = $dragItem.hasClass("circle");
      const typeClass = isTriangle ? "triangle" : isCircle ? "circle" : null;

      if (!typeClass) return; // Should not happen with current HTML

<<<<<<< HEAD
      // 중복 체크 (기존 규칙 유지)
      if ($this.find(`.${typeClass}`).length > 0) {
        // 드래그 드롭 실패 시 소리 재생
        audioManager.playSound("wrong");
        return;
      }

      // data-value 업데이트 (기존 로직)
=======
      // 모든 기존 요소 제거
      $this.find('.triangle, .circle').remove();

      // data-value 초기화
      $this.attr("data-value", "false false");

      // data-value 업데이트
>>>>>>> b1dd6843 (초기 커밋)
      let valueParts = ($this.attr("data-value") || "false false").split(" ");
      let currentValues = [valueParts[0] === "true", valueParts[1] === "true"];
      if (isTriangle) {
        currentValues[0] = true;
      } else if (isCircle) {
        currentValues[1] = true;
      }
      $this.attr("data-value", currentValues.join(" "));

<<<<<<< HEAD
      // 새 요소 생성 및 추가 (기존 로직)
=======
      // 새 요소 생성 및 추가
>>>>>>> b1dd6843 (초기 커밋)
      const $droppedEl = $(`<div class="${typeClass}"></div>`);
      $this.append($droppedEl);

      // 드롭된 요소 draggable 설정 (기존 로직)
      $droppedEl.draggable({
        revert: "invalid",
        revertDuration: 0,
        containment: "document", // Allow dragging anywhere initially
        helper: "original",
        start: function (event, ui) {
          ui.position.left /= globalScale;
          ui.position.top /= globalScale;
          audioManager.playSound("drag");
        },
        drag: function (event, ui) {
          ui.position.left /= globalScale;
          ui.position.top /= globalScale;
        },
        stop: function (event, ui) {
          // 기존 제거 로직 유지 (ui.offset 사용)
          const scale = globalScale || 1;
          const droppedElSize = this.getBoundingClientRect(); // Use for size only
          const droppableRect = $this[0].getBoundingClientRect(); // $this is the original droppable
          const droppedCenterX = (ui.offset.left + droppedElSize.width / 2) / scale;
          const droppedCenterY = (ui.offset.top + droppedElSize.height / 2) / scale;
          const droppableLeft = droppableRect.left / scale;
          const droppableRight = droppableRect.right / scale;
          const droppableTop = droppableRect.top / scale;
          const droppableBottom = droppableRect.bottom / scale;
          const isOutside =
            droppedCenterX < droppableLeft ||
            droppedCenterX > droppableRight ||
            droppedCenterY < droppableTop ||
            droppedCenterY > droppableBottom;

          if (isOutside) {
            let valuePartsStop = (
              $this.attr("data-value") || "false false"
            ).split(" ");
            let currentValuesStop = [
              valuePartsStop[0] === "true",
              valuePartsStop[1] === "true",
            ];
            if ($(this).hasClass("triangle")) {
              currentValuesStop[0] = false;
            } else if ($(this).hasClass("circle")) {
              currentValuesStop[1] = false;
            }
            $this.attr("data-value", currentValuesStop.join(" "));
            $(this).remove();
            audioManager.playSound("drop");
          } else {
            $(this).css({ top: 0, left: 0 });
          }
          checkAnswer();
          const $group = $(".drag_group.g1");
          const hasDroppedItems =
            $group.find(".droppable .triangle, .droppable .circle").length > 0;
          if (!hasDroppedItems) {
            $group.removeAttr("data-correction");
            window.forceWatchEvaluation();
          }
        },
      });

<<<<<<< HEAD
=======
      // 더블클릭 이벤트 추가
      $droppedEl.on('dblclick', function() {
        const $this = $(this);
        const $parent = $this.parent();
        let valueParts = ($parent.attr("data-value") || "false false").split(" ");
        let currentValues = [valueParts[0] === "true", valueParts[1] === "true"];
        
        if ($this.hasClass("triangle")) {
          currentValues[0] = false;
        } else if ($this.hasClass("circle")) {
          currentValues[1] = false;
        }
        
        $parent.attr("data-value", currentValues.join(" "));
        $this.remove();
        audioManager.playSound("drop");
        checkAnswer();
        
        const $group = $(".drag_group.g1");
        const hasDroppedItems = $group.find(".droppable .triangle, .droppable .circle").length > 0;
        if (!hasDroppedItems) {
          $group.removeAttr("data-correction");
          window.forceWatchEvaluation();
        }
      });

>>>>>>> b1dd6843 (초기 커밋)
      // 드롭 성공 시 처리 (기존 로직)
      audioManager.playSound("drop");
      checkAnswer();
    },
  });

  // --- 클릭-투-클릭 로직 추가 ---
  // 원본 드래그 요소 클릭
  $draggable.off('click').on('click', function(e) {
      e.stopPropagation();
      const $this = $(this);

      if (selectedDraggable && selectedDraggable[0] === this) {
          selectedDraggable.removeClass('selected');
          selectedDraggable = null;
      } else {
          if (selectedDraggable) {
              selectedDraggable.removeClass('selected');
          }
          selectedDraggable = $this;
          selectedDraggable.addClass('selected');
          audioManager.playSound('click');
      }
      updateCheckoutHighlights(true);
  });

  // 드롭 영역 클릭
  $droppable.off('click').on('click', function(e) {
      e.stopPropagation();
      const $drop = $(this); // 클릭된 드롭 영역 ($this 대신 $drop 사용)

      if (selectedDraggable) {
          const $dragItem = selectedDraggable;
          const isTriangle = $dragItem.hasClass("triangle");
          const isCircle = $dragItem.hasClass("circle");
          const typeClass = isTriangle ? "triangle" : isCircle ? "circle" : null;

          if (!typeClass) return;

          // 유효성 검사: 클릭된 드롭 영역에 해당 타입 아이템이 없는지 (기존 규칙)
          if ($drop.find(`.${typeClass}`).length === 0) {
              // --- 유효한 클릭 드롭: 기존 drop 핸들러 로직 수행 ---
              // 1. data-value 업데이트
              let valueParts = ($drop.attr("data-value") || "false false").split(" ");
              let currentValues = [valueParts[0] === "true", valueParts[1] === "true"];
              if (isTriangle) currentValues[0] = true;
              else if (isCircle) currentValues[1] = true;
              $drop.attr("data-value", currentValues.join(" "));

              // 2. 새 요소 생성 및 추가
              const $droppedEl = $(`<div class="${typeClass}"></div>`);
              $drop.append($droppedEl);

              // 3. 추가된 요소에 draggable 설정 (제거 기능)
              $droppedEl.draggable({
                  revert: "invalid",
                  revertDuration: 0,
                  containment: "document",
                  helper: "original",
                  start: function (event, ui) {
                      ui.position.left /= globalScale;
                      ui.position.top /= globalScale;
                      audioManager.playSound("drag");
                  },
                  drag: function (event, ui) {
                      ui.position.left /= globalScale;
                      ui.position.top /= globalScale;
                  },
                  stop: function (event, ui) {
                      const scale = globalScale || 1;
                      const droppedElSize = this.getBoundingClientRect();
                      const droppableRect = $drop[0].getBoundingClientRect(); // $this 대신 $drop 사용
                      const droppedCenterX = (ui.offset.left + droppedElSize.width / 2) / scale;
                      const droppedCenterY = (ui.offset.top + droppedElSize.height / 2) / scale;
                      const droppableLeft = droppableRect.left / scale;
                      const droppableRight = droppableRect.right / scale;
                      const droppableTop = droppableRect.top / scale;
                      const droppableBottom = droppableRect.bottom / scale;
                      const isOutside =
                          droppedCenterX < droppableLeft ||
                          droppedCenterX > droppableRight ||
                          droppedCenterY < droppableTop ||
                          droppedCenterY > droppableBottom;

                      if (isOutside) {
                          let valuePartsStop = (
                              $drop.attr("data-value") || "false false"
                          ).split(" ");
                          let currentValuesStop = [
                              valuePartsStop[0] === "true",
                              valuePartsStop[1] === "true",
                          ];
                          if ($(this).hasClass("triangle")) {
                              currentValuesStop[0] = false;
                          } else if ($(this).hasClass("circle")) {
                              currentValuesStop[1] = false;
                          }
                          $drop.attr("data-value", currentValuesStop.join(" "));
                          $(this).remove();
                          audioManager.playSound("drop");
                      } else {
                          $(this).css({ top: 0, left: 0 });
                      }
                      checkAnswer();
                      const $group = $(".drag_group.g1");
                      const hasDroppedItems =
                          $group.find(".droppable .triangle, .droppable .circle").length > 0;
                      if (!hasDroppedItems) {
                          $group.removeAttr("data-correction");
                          window.forceWatchEvaluation();
                      }
                  },
              });
              // --- 기존 drop 핸들러 로직 수행 끝 ---

              audioManager.playSound("drop"); // 드롭 소리
              checkAnswer(); // 답 확인

              // 드롭 성공 후 선택 해제
              selectedDraggable.removeClass('selected');
              selectedDraggable = null;
              updateCheckoutHighlights(false); // 하이라이트 끄기

          } else {
              // 클릭 드롭 실패 (이미 아이템 존재)
              audioManager.playSound("wrong");
              // 실패 시에도 선택 해제
              selectedDraggable.removeClass('selected');
              selectedDraggable = null;
              updateCheckoutHighlights(false);
          }
      } else {
          // 선택된 draggable 아이템 없을 때 droppable 클릭은 무시
      }
  });

  // 외부 클릭 시 선택 해제 (추가)
  $(document).off("click.checkoutDragDrop080003").on("click.checkoutDragDrop080003", function(e) { // 고유 네임스페이스 사용
      if (selectedDraggable && !$(e.target).closest('.drag_checkout .draggable').length && !$(e.target).closest('.drag_checkout .droppable').length) {
          selectedDraggable.removeClass('selected');
          selectedDraggable = null;
          updateCheckoutHighlights(false);
      }
  });

  // Function to check the answer
  function checkAnswer() {
    const $group = $(".drag_group.g1"); // Target the specific group
    const $droppables = $group.find(".droppable");
    const answerString = $group.attr("data-answer-single");

    if (!answerString) {
      console.error(
        "Answer data (data-answer-single) not found on .drag_group.g1"
      );
      return;
    }

    let answerArray;
    try {
      // Replace single quotes with double quotes for valid JSON
      const validJsonString = answerString.replace(/'/g, '"');
      answerArray = JSON.parse(validJsonString); // Parse the JSON string e.g., [[true, true], ...]
    } catch (e) {
      console.error(
        "Failed to parse answer data from data-answer-single:",
        e,
        "Input string:",
        answerString
      );
      return;
    }

    let isCorrect = true;
    if ($droppables.length !== answerArray.length) {
      console.warn(
        "Mismatch between the number of droppable elements and the answer array length."
      );
      isCorrect = false;
    } else {
      $droppables.each(function (index) {
        const $drop = $(this);
        const valueStr = $drop.attr("data-value") || "false false"; // Get "true false" string
        const valueParts = valueStr.split(" ");
        const currentValue = [
          valueParts[0] === "true",
          valueParts[1] === "true",
        ]; // Convert to [true, false]
        const expectedValue = answerArray[index]; // Get expected [true, false] from answer

        // Compare current value with expected value
        if (
          currentValue[0] !== expectedValue[0] ||
          currentValue[1] !== expectedValue[1]
        ) {
          isCorrect = false;
          return false; // Exit the .each loop early if a mismatch is found
        }
      });
    }

    // Update data-correction attribute on the group
    $group.attr("data-correction", isCorrect.toString());
    window.forceWatchEvaluation(); // 상태 변경 후 강제 평가
    // console.log("Answer check complete. Correct:", isCorrect); // For debugging

    // Remove the feedback block, rely on btn_act.js using data-correction
    // /*
    // if (window.checkAnswerFeedback) {
    //      window.checkAnswerFeedback();
    // } else {
    //     console.log("Feedback function window.checkAnswerFeedback not found.")
    //     // Basic visual feedback as fallback
    //      $group.removeClass('correct incorrect');
    //      if (isCorrect) {
    //          $group.addClass('correct');
    //      } else {
    //          $group.addClass('incorrect');
    //      }
    // }
    // */
  }

  // 두 번째 오답 시: 정답과 다른 부분에 클래스 추가하고 모든 드래그 비활성화
  window.onIncorrectTwiceCustom = function () {
    const $sourceDraggables = $(".drag_checkout .draggable"); // 원본 드래그 요소 선택
    const $droppedDraggables = $(
      ".drag_group.g1 .droppable .triangle, .drag_group.g1 .droppable .circle"
    ); // 드롭된 요소 선택
    const $group = $(".drag_group.g1");
    const $droppables = $group.find(".droppable");
    const answerString = $group.attr("data-answer-single");

    // 원본 드래그 요소 비활성화
    $sourceDraggables.draggable("disable");
    // 드롭된 요소 드래그 비활성화
    $droppedDraggables.draggable("disable");

    // 기존 피드백 클래스 초기화
    $droppables.removeClass("triangle circle");

    if (!answerString) {
      console.error(
        "onIncorrectTwiceCustom: Answer data (data-answer-single) not found."
      );
      return;
    }

    let answerArray;
    try {
      const validJsonString = answerString.replace(/'/g, '"');
      answerArray = JSON.parse(validJsonString);
    } catch (e) {
      console.error("onIncorrectTwiceCustom: Failed to parse answer data:", e);
      return;
    }

    if ($droppables.length !== answerArray.length) {
      console.warn(
        "onIncorrectTwiceCustom: Mismatch between droppables and answer length."
      );
      // 길이가 다르면 비교가 무의미하므로 여기서 종료하거나 다른 처리를 할 수 있습니다.
      return;
    }

    $droppables.each(function (index) {
      const $drop = $(this);
      const valueStr = $drop.attr("data-value") || "false false";
      const valueParts = valueStr.split(" ");
      const currentValue = [valueParts[0] === "true", valueParts[1] === "true"];
      const expectedValue = answerArray[index]; // 예: [true, false]

      // 첫 번째 값(triangle) 비교
      if (currentValue[0] !== expectedValue[0]) {
        $drop.addClass("triangle");
      }

      // 두 번째 값(circle) 비교
      if (currentValue[1] !== expectedValue[1]) {
        $drop.addClass("circle");
      }
    });

    // (선택사항) 사용자에게 정답이 표시되었음을 알리는 메시지
    // alert("틀린 부분에 정답 표시가 추가되었습니다.");
  };

  // 리셋 시 드래그 활성화 추가 (필요한 경우)
  window.resetCustom = function () {
    const $group = $(".drag_group.g1");
    const hadCorrection = $group.attr("data-correction") !== undefined;
    $group.removeAttr("data-correction");
    // window.forceWatchEvaluation(); // 상태 변경 후 강제 평가 (이전 코드, 주석 처리)
    $group.removeClass("correct incorrect");
    $group.find(".droppable").each(function () {
      $(this).attr("data-value", "false false");
      $(this).find(".triangle, .circle").remove();
      $(this).removeClass("triangle circle"); // 리셋 시 피드백 클래스도 제거
    });

    // 드래그 요소 다시 활성화
    const $draggables = $(".drag_checkout .draggable");
    $draggables.draggable("enable");

    // Call update function directly if attribute was removed
    // if (hadCorrection) { // updateButtonStates 제거됨
    //     updateButtonStates();
    // }
  };

  try {
    // 버튼 활성화 조건 추가
    defineButtonClassRules([
      {
        selector: ".drag_group.g1",
        key:"custom_check_btn_active",
        test: function (el) {
          // data-correction 속성이 요소에 존재하는지 확인합니다.
          const correction = $(el).attr("data-correction");
          console.log("correction 속성 값:", correction); // 로그 추가: 속성 값 확인
          // 속성이 존재하면(null 또는 undefined가 아니면) true를 반환하고,
          // 그렇지 않으면 false를 반환합니다. data-correction이 설정되면 버튼이 활성화됩니다.
          return correction !== undefined && correction !== null;
        },
      },
    ]);
    console.log("defineButtonClassRules 호출 성공");
  } catch (e) {
    console.error("defineButtonClassRules 호출 중 오류 발생:", e);
  }
});
