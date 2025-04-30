
runAfterAppReady(function () {

  function updateDropValueAndCorrection($drop, value) {
    console.log("✅ updateDropValueAndCorrection 실행됨");
<<<<<<< HEAD
    console.log("📌 $drop:", $drop);
    console.log("📌 value:", value);
=======
>>>>>>> b1dd6843 (초기 커밋)
  
    if (!$drop || !$drop.length || value === undefined) {
      console.warn("❌ drop 또는 값이 잘못됨");
      return;
    }
  
<<<<<<< HEAD
    $drop.attr("data-value", value);
=======
    // ✅ drop_item 안의 from-drop drag_item의 data-value 읽기
    const $dragItem = $drop.find(".from-drop");
    let dropValue = value;
  
    if ($dragItem.length) {
      dropValue = parseFloat($dragItem.attr("data-value")) || 0;
      dropValue = (dropValue + 360) % 360;
      dropValue = dropValue.toFixed(1);
    }
  
    $drop.attr("data-value", dropValue);
>>>>>>> b1dd6843 (초기 커밋)
  
    const answer = $drop.attr("data-answer-single");
  
    let isCorrect = false;
    if (answer === "empty_answer") {
      isCorrect = true;
    } else {
      const numAnswer = parseFloat(answer);
<<<<<<< HEAD
      const numValue = parseFloat(value);
      isCorrect = Math.abs(numAnswer - numValue) <= 1;
=======
      const numValue = parseFloat(dropValue);
  
      const diff = Math.min(
        Math.abs(numAnswer - numValue),
        Math.abs(numAnswer - (numValue + 360)),
        Math.abs((numAnswer + 360) - numValue)
      );
  
      isCorrect = diff <= 1;
>>>>>>> b1dd6843 (초기 커밋)
    }
  
    $drop.attr("data-correction", isCorrect ? "true" : "false");
    console.log("🎯 최종 data-correction:", $drop.attr("data-correction"));
<<<<<<< HEAD

    setTimeout(() => {
      $drop.attr("data-correction", isCorrect ? "true" : "false");
      console.log("🛡 forced data-correction reapply:", $drop.attr("data-correction"));
    }, 0);
    
  }
  

=======
  
    setTimeout(() => {
      $drop.attr("data-correction", isCorrect ? "true" : "false");
    }, 0);
  }
  
>>>>>>> b1dd6843 (초기 커밋)
  
  // ✅ 회전값을 추출하는 유틸리티 함수 선언
  function getRotationDegrees($img) {
    const transform = $img.css("transform");
    if (!transform || transform === "none") return 0;
  
    const values = transform.match(/matrix\(([^)]+)\)/);
    if (!values || values.length < 2) return 0;
  
    const [a, b] = values[1].split(',').map(parseFloat);
    const radians = Math.atan2(b, a);
    return Math.round((radians * (180 / Math.PI)) * 10) / 10;
  }  

  const $droppables = $(".drop_group .figure_triangle");
  const $draggables = $(".drag_group .drag_item");

  $droppables.css("position", "relative");

  // 초기 정답 상태 설정
  $droppables.each(function () {
    const $drop = $(this);
  
    $drop.find(".from-drop").remove();
    $drop.removeClass("ui-state-hover hint selected disabled");
    $drop.parent().removeClass("on");
  
    $drop.attr("data-value", "");
    $drop.removeAttr("data-correction"); // ✅ 초기화 시 data-correction 제거
  });
  
  // 드래그 설정 (모바일 대응 포함)
  $draggables.draggable({
    helper: "clone",
    cursor: "grabbing",
    zIndex: 1000,
    containment: "document",
    start: function () {
      $(".btn_area button").addClass("active");
    }
  });

  // ✅ 드래그 아이템에 회전 버튼 이벤트 바인딩
  bindRotation($draggables);

  $droppables.droppable({
    tolerance: "pointer",
    drop: function (event, ui) {
      const $drop = $(this);
      const $original = $(ui.draggable);
      const $helper = $(ui.helper);
      const $img = $helper.find("img");
<<<<<<< HEAD
  
      const dropW = $drop.outerWidth();
      const dropH = $drop.outerHeight();
      const cloneW = $helper.outerWidth();
      const cloneH = $helper.outerHeight();
      const offsetLeft = (dropW - cloneW) / 2;
      const offsetTop = (dropH - cloneH) / 2;
  
      // 회전값은 복제 전에 먼저 저장 (회전된 상태 유지)
      let rotationValue = getRotationDegrees($original.find("img"));
      if (Math.abs(rotationValue - 180) <= 1) rotationValue = 180;
      rotationValue = rotationValue.toFixed(1);

      // ✅ 복제 완료 후 원본 초기화 (rotate 0, data-value 0)
      $original
        .addClass("used disabled")
        .attr({
          "data-rotation": "0",
          "data-value": "0"
        })
        .css({ opacity: 0.8 });

=======
    
      // 회전값은 복제 전에 원본 drag_item에서 가져옴
      let rotationValue = parseFloat($original.attr("data-rotation")) || 0;
      rotationValue = (rotationValue + 360) % 360;
      rotationValue = rotationValue.toFixed(1);
    
      $original.addClass("used disabled").attr({
        "data-rotation": "0",
        "data-value": "0"
      }).css({ opacity: 0.8 });
    
>>>>>>> b1dd6843 (초기 커밋)
      $original.find("img").css({
        transform: "rotate(0deg)",
        transformOrigin: "center center"
      });
<<<<<<< HEAD
  
      // ✅ drop 내 기존 도형 제거
      $drop.find(".from-drop").remove();
  
      // ✅ 복제 생성
=======
    
      $drop.find(".from-drop").remove();
    
>>>>>>> b1dd6843 (초기 커밋)
      const $clone = $helper.clone(true, true)
        .addClass("from-drop")
        .removeClass("used disabled")
        .css({
<<<<<<< HEAD
          width: `${cloneW}px`,
          height: `${cloneH}px`,
          position: "absolute",
          left: offsetLeft,
          top: offsetTop,
=======
          width: `${$helper.outerWidth()}px`,
          height: `${$helper.outerHeight()}px`,
          position: "absolute",
          left: ($drop.outerWidth() - $helper.outerWidth()) / 2,
          top: ($drop.outerHeight() - $helper.outerHeight()) / 2,
>>>>>>> b1dd6843 (초기 커밋)
          pointerEvents: "auto",
          userSelect: "none",
          opacity: 1
        })
        .attr({
          "data-rotation": rotationValue,
          "data-value": rotationValue
        });
<<<<<<< HEAD
  
=======
    
>>>>>>> b1dd6843 (초기 커밋)
      $clone.find("img").css({
        transform: `rotate(${rotationValue}deg)`,
        transformOrigin: "center center"
      });
<<<<<<< HEAD
  
      // ✅ drop_item에 회전값 반영 및 정답 판단
      updateDropValueAndCorrection($drop, rotationValue);
  
      // ✅ 삽입 및 후처리
      $drop.append($clone);
      makeDraggable($clone);
      bindRotation($clone); // 아래 함수에서 실시간 반영도 처리
      $drop.parent().addClass("on");
      audioManager.playSound("drop");
    }
  });
  
  

=======
    
      // ✅ 드롭할 때 드롭 아이템의 data-value도 복제 아이템의 값으로 세팅
      $drop.attr("data-value", rotationValue);
    
      // ✅ drop_item의 data-value 업데이트 이후 정답 체크
      updateDropValueAndCorrection($drop, rotationValue);
    
      $drop.append($clone);
      makeDraggable($clone);
      bindRotation($clone);
      $drop.parent().addClass("on");
    
      audioManager.playSound("drop");
    }    
  });
  
>>>>>>> b1dd6843 (초기 커밋)
  // ✅ 회전 바인딩 함수
  function bindRotation($elem) {
    $elem.find(".btn_rotation").off("mousedown touchstart").on("mousedown touchstart", function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
  
      const $item = $(this).closest(".drag_item");
      const $img = $item.find("img");
  
      if ($item.hasClass("rotating")) return;
      $item.addClass("rotating");
  
      const calcAngleDegrees = (x, y) => (Math.atan2(y, x) * 180) / Math.PI;
  
<<<<<<< HEAD
      let cX = 0, cY = 0, sA = 0, mA = 0, degree = 0;
      let angle = parseFloat($item.attr("data-rotation")) || 0;
  
      const itemRect = $img.get(0).getBoundingClientRect();
      cX = itemRect.left + itemRect.width / 2;
      cY = itemRect.top + itemRect.height / 2;
  
      const clientX = evt.type === "touchstart" ? evt.touches[0].clientX : evt.clientX;
      const clientY = evt.type === "touchstart" ? evt.touches[0].clientY : evt.clientY;
  
      const pX = clientX - cX;
      const pY = clientY - cY;
      sA = calcAngleDegrees(pX, pY);
  
      const moveHandler = function (e) {
        const moveX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        const moveY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
  
        const currentX = moveX - cX;
        const currentY = moveY - cY;
        mA = calcAngleDegrees(currentX, currentY);
        degree = mA - sA + angle;
  
        // 회전 반영
        $img.css({
          transform: `rotate(${degree}deg)`,
          transformOrigin: "center center"
        });
  
        $item.attr("data-rotation", degree.toFixed(1));
        $item.attr("data-value", degree.toFixed(1));
  
        // drop 위치의 정답 비교 갱신
=======
      let startAngle = parseFloat($item.attr("data-rotation")) || 0;
      let centerX, centerY, startVectorAngle;
  
      const rect = $img.get(0).getBoundingClientRect();
      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height / 2;
  
      const clientX = evt.type.startsWith("touch") ? evt.originalEvent.touches[0].clientX : evt.clientX;
      const clientY = evt.type.startsWith("touch") ? evt.originalEvent.touches[0].clientY : evt.clientY;
  
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      startVectorAngle = calcAngleDegrees(dx, dy);
  
      const moveHandler = (moveEvt) => {
        moveEvt.preventDefault();
        moveEvt.stopPropagation();
      
        const moveX = moveEvt.type.startsWith("touch") ? moveEvt.originalEvent.touches[0].clientX : moveEvt.clientX;
        const moveY = moveEvt.type.startsWith("touch") ? moveEvt.originalEvent.touches[0].clientY : moveEvt.clientY;
      
        const moveDx = moveX - centerX;
        const moveDy = moveY - centerY;
        const currentVectorAngle = calcAngleDegrees(moveDx, moveDy);
      
        let degree = startAngle + (currentVectorAngle - startVectorAngle);
        degree = (degree + 360) % 360;
      
        // ✅ 여기 추가: 스냅 기능
        const snapAngles = [0, 90, 180, 270, 360];
        const snapThreshold = 5; // 5도 이내로 근접하면 스냅
      
        for (let snapAngle of snapAngles) {
          if (Math.abs(degree - snapAngle) <= snapThreshold) {
            degree = snapAngle;
            break;
          }
        }
      
        // ✅ drag_item 전체를 회전시킴
        $item.css({
          transform: `rotate(${degree}deg)`,
          transformOrigin: "center center"
        });
      
        $item.attr("data-rotation", degree.toFixed(1));
        $item.attr("data-value", degree.toFixed(1));
      
>>>>>>> b1dd6843 (초기 커밋)
        const $drop = $item.closest(".drop_item.figure_triangle");
        if ($drop.length) {
          updateDropValueAndCorrection($drop, degree.toFixed(1));
        }
      };
<<<<<<< HEAD
  
      const endHandler = function (e) {
        e.preventDefault();
        e.stopPropagation();
      
        $item.removeClass("rotating");
        angle = degree;
      
        // ✅ 회전 완료 후 drop_item에 최종 반영
        const $drop = $item.closest(".drop_item.figure_triangle");
        if ($drop.length) {
          updateDropValueAndCorrection($drop, degree.toFixed(1));
        }
      
=======
      
      
  
      const endHandler = (endEvt) => {
        endEvt.preventDefault();
        endEvt.stopPropagation();
        $item.removeClass("rotating");
  
>>>>>>> b1dd6843 (초기 커밋)
        document.removeEventListener("mousemove", moveHandler);
        document.removeEventListener("touchmove", moveHandler);
        document.removeEventListener("mouseup", endHandler);
        document.removeEventListener("touchend", endHandler);
      };
<<<<<<< HEAD
      
=======
>>>>>>> b1dd6843 (초기 커밋)
  
      document.addEventListener("mousemove", moveHandler, { passive: false });
      document.addEventListener("touchmove", moveHandler, { passive: false });
      document.addEventListener("mouseup", endHandler);
      document.addEventListener("touchend", endHandler);
    });
  }
  
<<<<<<< HEAD
  

=======
>>>>>>> b1dd6843 (초기 커밋)
  // ✅ 복제 도형 드래그 가능하게
  function makeDraggable($elem) {
    $elem.draggable({
      helper: "original",
      cursor: "grabbing",
      zIndex: 1000,
      containment: "document",
      stop: function (event, ui) {
        const offset = $(this).offset();
        const $dragGroup = $(".drag_group");
        const groupOffset = $dragGroup.offset();
        const groupWidth = $dragGroup.outerWidth();
        const groupHeight = $dragGroup.outerHeight();

        if (
          offset.left > groupOffset.left &&
          offset.left < groupOffset.left + groupWidth &&
          offset.top > groupOffset.top &&
          offset.top < groupOffset.top + groupHeight
        ) {
          const originalIndex = $(this).index();
          $(this).remove();
          $draggables.eq(originalIndex).removeClass("used disabled").css("opacity", 1);
        }
      }
    });
  }

  // 리셋
  $(".btnReset").on("click", function () {
    checkCount = 0; // 오답 횟수 초기화
  
    // ✅ 버튼 상태 초기화
    $(".btn_area button").removeClass("active");
  
    const currentPageId = $("#app_wrap").attr("data-current-page");
    const $currentPage = $(`.page.${currentPageId}`);
    if (!$currentPage.length) return;
  
    // 현재 페이지 내 도형만 리셋
    const $droppables = $currentPage.find(".drop_group .figure_triangle");
    const $draggables = $currentPage.find(".drag_group .drag_item");
  
    $droppables.each(function () {
      const $drop = $(this);
  
      $drop.find(".from-drop").remove();
      $drop.removeClass("ui-state-hover hint selected disabled");
      $drop.parent().removeClass("on");
      $drop.attr("data-value", "");
      $drop.removeAttr("data-correction"); // ✅ data-correction 제거
    });
<<<<<<< HEAD
  
    $draggables.each(function () {
      const $item = $(this);
      $item.removeClass("used disabled").css({ opacity: 1 });
      $item.attr("data-rotation", "0");
  
=======

    $draggables.each(function () {
      const $item = $(this);
      $item.removeClass("used disabled").css({ opacity: 1 });
      
      // ✅ data-rotation, data-value 둘 다 초기화
      $item.attr({
        "data-rotation": "0",
        "data-value": "0"
      });
    
      // ✅ drag_item 자체 회전도 초기화
      $item.css({
        transform: "rotate(0deg)",
        transformOrigin: "center center"
      });
    
      // ✅ img 회전도 초기화 (기존 코드)
>>>>>>> b1dd6843 (초기 커밋)
      $item.find("img").css({
        transform: "rotate(0deg)",
        transformOrigin: "center center"
      });
    });
<<<<<<< HEAD
=======
    
>>>>>>> b1dd6843 (초기 커밋)
  
    window.forceWatchEvaluation(); // 버튼 활성화 상태 재평가
  });
  

  // 오답 횟수 커스텀 반응
 window.onCustomIncorrect = function (count) {
  $(".drop_group .figure_triangle").each(function () {
    const $drop = $(this);
    const answer = $drop.attr("data-answer-single");
    const value = $drop.attr("data-value");
    const isCorrect = $drop.attr("data-correction") === "true";

    if (answer === value && isCorrect) {
      $drop.addClass("selected");
    } else {
      $drop.removeClass("selected");
    }

    // ✅ 두 번째 확인 클릭 && hint 클래스가 있는 경우만 처리
    if (count === 2 && $drop.hasClass("hint")) {
      const $dragItem = $drop.find(".drag_item");

      if ($dragItem.length) {
        $dragItem.attr("data-rotation", "180");
        $dragItem.find("img").css({
          transform: "rotate(180deg)",
          transformOrigin: "center center"
        });

        // ✅ data-value도 180으로 업데이트
        $drop.attr("data-value", "180");

        // ✅ 정답 재확인
        const isNowCorrect = $drop.attr("data-answer-single") === "180";
        $drop.attr("data-correction", isNowCorrect ? "true" : "false");
      }
    }
  });

  console.log("check count:", count);
};
  
  defineButtonClassRules([
    {
      selector: ".drop_group .figure_triangle", //변경될 값을 감지할 태그 설정
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
  // 버튼 상태 변경 후 강제 평가 문 실행

});